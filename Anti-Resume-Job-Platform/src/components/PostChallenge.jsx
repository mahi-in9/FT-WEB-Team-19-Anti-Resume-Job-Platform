import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function PostChallenge() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner',
    skills: [],
    company: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'challenges'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      alert('Challenge posted successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        difficulty: 'Beginner',
        skills: [],
        company: ''
      });
    } catch (error) {
      console.error('Error posting challenge: ', error);
      alert('Error posting challenge');
    }
  };

  return (
    <div className="post-challenge-container">
      <h2>Post New Challenge</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Challenge Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />

        <select
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={formData.skills.join(',')}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',') })}
        />

        <input
          type="text"
          placeholder="Your Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />

        <button type="submit">Post Challenge</button>
      </form>
    </div>
  );
}