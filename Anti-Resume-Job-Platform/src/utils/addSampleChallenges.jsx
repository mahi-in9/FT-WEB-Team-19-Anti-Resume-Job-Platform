// utils/addSampleChallenges.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function addSampleChallenges() {
  const challenges = [
    {
      title: "Fix React State Management",
      description: "Debug and fix the state management issue in this React component",
      skills: ["React", "JavaScript", "State Management"],
      difficulty: "Intermediate",
      company: "TechCorp",
      createdAt: serverTimestamp(),
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: "active"
    },
    {
      title: "Design Responsive Navbar",
      description: "Create a responsive navbar that works on mobile and desktop",
      skills: ["HTML", "CSS", "Responsive Design"],
      difficulty: "Beginner",
      company: "WebSolutions",
      createdAt: serverTimestamp(),
      status: "active"
    }
  ];

  try {
    const challengesRef = collection(db, 'challenges');
    for (const challenge of challenges) {
      await addDoc(challengesRef, challenge);
    }
    console.log("Sample challenges added successfully!");
  } catch (error) {
    console.error("Error adding challenges:", error);
  }
}