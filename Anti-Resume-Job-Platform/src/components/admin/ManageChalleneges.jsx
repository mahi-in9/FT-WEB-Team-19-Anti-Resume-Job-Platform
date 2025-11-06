import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../utils/api/firebase";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

export default function ManageChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editChallenge, setEditChallenge] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
    reward: "",
    deadline: "",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "challenges"), (snap) => {
      setChallenges(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description)
      return alert("Please fill all fields");
    try {
      if (editChallenge) {
        await updateDoc(doc(db, "challenges", editChallenge.id), form);
      } else {
        await addDoc(collection(db, "challenges"), form);
      }
      setShowModal(false);
      setEditChallenge(null);
      setForm({
        title: "",
        description: "",
        difficulty: "Beginner",
        reward: "",
        deadline: "",
      });
    } catch (error) {
      console.error("Error saving challenge:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this challenge?")) {
      await deleteDoc(doc(db, "challenges", id));
    }
  };

  const handleEdit = (challenge) => {
    setEditChallenge(challenge);
    setForm(challenge);
    setShowModal(true);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Challenges</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition"
        >
          <FaPlus /> Add Challenge
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4">Reward</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.length > 0 ? (
              challenges.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{c.title}</td>
                  <td className="py-3 px-4">{c.difficulty}</td>
                  <td className="py-3 px-4">{c.reward || "N/A"}</td>
                  <td className="py-3 px-4">{c.deadline || "N/A"}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-indigo-600 hover:underline"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-500 hover:underline"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No challenges found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-lg relative">
            <button
              onClick={() => {
                setShowModal(false);
                setEditChallenge(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              {editChallenge ? "Edit Challenge" : "Add New Challenge"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Challenge Title"
                className="w-full border rounded-md px-3 py-2"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                rows="3"
                className="w-full border rounded-md px-3 py-2"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <select
                className="w-full border rounded-md px-3 py-2"
                value={form.difficulty}
                onChange={(e) =>
                  setForm({ ...form, difficulty: e.target.value })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <input
                type="text"
                placeholder="Reward (optional)"
                className="w-full border rounded-md px-3 py-2"
                value={form.reward}
                onChange={(e) => setForm({ ...form, reward: e.target.value })}
              />
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition"
              >
                {editChallenge ? "Update Challenge" : "Add Challenge"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
