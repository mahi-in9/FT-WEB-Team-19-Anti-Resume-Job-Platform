import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import useLocalData from "../../hooks/useLocalData";

/**
 * Simple challenges list with ability to "apply/submit" and see status.
 * Replace useLocalData with real API calls in production.
 */

function ChallengeCard({ item, onUpdate }) {
  return (
    <article className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start gap-4">
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        <div className="mt-3 text-xs text-gray-400">
          Reward: {item.reward} • Level: {item.level}
        </div>
      </div>

      <div className="flex-shrink-0 self-end md:self-center">
        {item.status === "open" ? (
          <button
            onClick={() => onUpdate(item.id, "applied")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Apply
          </button>
        ) : item.status === "applied" ? (
          <button
            onClick={() => onUpdate(item.id, "submitted")}
            className="border px-4 py-2 rounded-lg"
          >
            Submit <FaChevronRight className="inline ml-2" />
          </button>
        ) : (
          <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
            {item.status}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Challenges() {
  const defaultChallenges = [
    {
      id: "c1",
      title: "Build a Todo App",
      description: "Create a todo app in React with filters & persistence.",
      reward: "Badge + $50",
      level: "Beginner",
      status: "open",
    },
    {
      id: "c2",
      title: "Design Landing",
      description: "Create a responsive landing page using Tailwind.",
      reward: "Badge + $100",
      level: "Intermediate",
      status: "open",
    },
    {
      id: "c3",
      title: "Accessibility Audit",
      description: "Audit a website & propose fixes (WCAG basics).",
      reward: "Badge + $75",
      level: "Intermediate",
      status: "open",
    },
  ];

  const { data: challenges, save } = useLocalData(
    "candidate_challenges",
    defaultChallenges
  );
  const [items, setItems] = useState(challenges);

  useEffect(() => setItems(challenges), [challenges]);

  function update(id, status) {
    const next = items.map((it) => (it.id === id ? { ...it, status } : it));
    save(next);
    setItems(next);
  }

  return (
    <div className="space-y-4">
      {items.map((c) => (
        <ChallengeCard key={c.id} item={c} onUpdate={update} />
      ))}

      <div className="text-center mt-4">
        <button
          onClick={() => {
            const id = `c${Date.now()}`;
            const newC = {
              id,
              title: "Create an open-source contribution",
              description:
                "Contribute to an OSS repo and write a short summary.",
              reward: "Badge",
              level: "Advanced",
              status: "open",
            };
            const next = [newC, ...items];
            save(next);
            setItems(next);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
        >
          Add Quick Challenge
        </button>
      </div>
    </div>
  );
}
