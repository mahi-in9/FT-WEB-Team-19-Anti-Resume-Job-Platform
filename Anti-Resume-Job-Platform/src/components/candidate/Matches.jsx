import React from "react";
import { FaBriefcase, FaStar } from "react-icons/fa";

/**
 * Matches shows company matches & quick actions.
 * Replace static demo with real-match engine in production.
 */

const demoMatches = [
  {
    id: "m1",
    company: "Blue Labs",
    role: "Frontend Intern",
    score: 92,
    tags: ["React", "UI"],
  },
  {
    id: "m2",
    company: "PixelWorks",
    role: "Junior UI Engineer",
    score: 85,
    tags: ["HTML", "CSS", "Accessibility"],
  },
];

export default function Matches() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Matches</h3>
        <span className="text-sm text-gray-500">Based on your skills</span>
      </div>

      <ul className="space-y-4">
        {demoMatches.map((m) => (
          <li key={m.id} className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <FaBriefcase />
                </div>
                <div>
                  <div className="font-medium">{m.company}</div>
                  <div className="text-sm text-gray-500">{m.role}</div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600">{m.score}% match</div>
              <button className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-md border text-sm">
                View
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 text-center text-sm text-gray-500">
        <FaStar className="inline mr-2 text-yellow-400" /> Improve your profile
        to get better matches.
      </div>
    </div>
  );
}
