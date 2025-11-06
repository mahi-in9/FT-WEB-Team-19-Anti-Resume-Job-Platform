import React, { useState, useEffect } from "react";
import { FaEdit, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import useLocalData from "../../hooks/useLocalData";

export default function ProfileCard() {
  const { data, save } = useLocalData("candidate_profile", {
    name: "Mahendra Kumar",
    title: "Frontend Developer",
    bio: "Building clean UI & delightful UX. Passionate about React, Tailwind and accessible web apps.",
    location: "India",
    email: "you@domain.com",
    avatarColor: "bg-pink-400",
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data), [data];
  }, [data]);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSave = (e) => {
    e.preventDefault();
    save(form);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 transition-all duration-300 hover:shadow-md">
      {/* ===== Profile Header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 text-center sm:text-left">
        {/* Avatar */}
        <div
          className={`w-20 h-20 sm:w-16 sm:h-16 mx-auto sm:mx-0 rounded-full flex items-center justify-center text-white text-2xl font-semibold ${form.avatarColor}`}
        >
          {form.name
            ?.split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>

        {/* Info */}
        <div className="flex-1 mt-3 sm:mt-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {form.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-500">{form.title}</p>
            </div>
            <button
              className="text-indigo-600 hover:text-indigo-800 text-lg transition"
              onClick={() => setEditing((v) => !v)}
              aria-label="Edit profile"
            >
              <FaEdit />
            </button>
          </div>

          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
            {form.bio}
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-sm sm:text-base text-gray-500">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <FaMapMarkerAlt className="text-indigo-500" />
              <span>{form.location}</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <FaEnvelope className="text-pink-500" />
              <span className="truncate max-w-[180px] sm:max-w-none">
                {form.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Edit Form ===== */}
      {editing && (
        <form
          onSubmit={onSave}
          className="mt-6 space-y-3 border-t pt-4 transition-all duration-200"
        >
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Full Name"
          />
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Your Title"
          />
          <textarea
            name="bio"
            value={form.bio}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none"
            rows="3"
            placeholder="Short bio"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-xs sm:text-sm text-gray-500 italic text-center sm:text-left">
              Tip: Keep your title short & clear.
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setForm(data);
                  setEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-sm sm:text-base transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base transition"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
