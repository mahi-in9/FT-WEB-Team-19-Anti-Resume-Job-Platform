import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

export default function PostChallenge() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    difficulty: 'Beginner',
    company: '',
    deadline: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        skills: formData.skills.split(',').map((skill) => skill.trim()),
        difficulty: formData.difficulty,
        company: formData.company.trim(),
        userId: currentUser.uid,
        status: 'active',
        createdAt: serverTimestamp(),
        deadline: formData.deadline ? new Date(formData.deadline) : null,
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Challenge</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { id: 'title', label: 'Challenge Title', type: 'text', required: true },
          { id: 'description', label: 'Description', type: 'textarea', required: true },
          { id: 'skills', label: 'Required Skills (comma-separated)', type: 'text', required: true },
          { id: 'company', label: 'Company Name', type: 'text', required: true },
          { id: 'deadline', label: 'Deadline (optional)', type: 'date', required: false },
        ].map((field) => (
          <div key={field.id} className="space-y-1">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && '*'}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                rows={4}
                className={`w-full p-2.5 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 ${errors[field.id] ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className={`w-full p-2.5 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 ${errors[field.id] ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
            )}
            {errors[field.id] && (
              <p className="flex items-center text-sm text-red-600">
                <ExclamationCircleIcon className="h-5 w-5 mr-1" /> {errors[field.id]}
              </p>
            )}
          </div>
        ))}

        <div className="space-y-1">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 text-white rounded-md transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
        >
          {isSubmitting ? 'Posting...' : 'Post Challenge'}
        </button>
      </form>
    </div>
  );
}
