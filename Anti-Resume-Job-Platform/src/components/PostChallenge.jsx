import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

export default function PostChallenge() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    difficulty: 'Beginner',
    company: '',
    deadline: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!currentUser?.uid) {
      alert('You must be logged in to post challenges');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'challenges'), {
        title: formData.title.trim(),
        description: formData.description.trim(),
        skills: formData.skills.split(',').map(skill => skill.trim()),
        difficulty: formData.difficulty,
        company: formData.company.trim(),
        userId: currentUser.uid,
        status: 'active',
        createdAt: serverTimestamp(),
        deadline: formData.deadline ? new Date(formData.deadline) : null
      });
      alert('Challenge posted successfully!');
      navigate('/challenges');
    } catch (error) {
      console.error('Error posting challenge:', error);
      alert(`Error posting challenge: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-challenge-container">
      <h2>Create New Challenge</h2>
      <form onSubmit={handleSubmit} className="challenge-form">
        <div className="form-group">
          <label htmlFor="title">Challenge Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="skills">Required Skills (comma separated)*</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, JavaScript, CSS"
            className={errors.skills ? 'error' : ''}
          />
          {errors.skills && <span className="error-message">{errors.skills}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty Level</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="company">Company Name*</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'error' : ''}
          />
          {errors.company && <span className="error-message">{errors.company}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline (optional)</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Challenge'}
        </button>
      </form>
    </div>
  );
}