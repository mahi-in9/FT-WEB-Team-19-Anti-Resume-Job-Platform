import React from "react";
import ProfileCard from "../components/candidate/ProfileCard";
import Challenges from "../components/candidate/Challenges";
import Matches from "../components/candidate/Matches";
import TasksPanel from "../components/candidate/TasksPanel";

export default function CandidateDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ===== Main Content ===== */}
      <main className="max-w-7xl mx-auto w-full flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 space-y-8 lg:space-y-0">
          {/* ===== Left column (Profile) ===== */}
          <aside className="lg:col-span-3 space-y-6 order-1 lg:order-none">
            <ProfileCard />
          </aside>

          {/* ===== Center column (Challenges) ===== */}
          <section className="lg:col-span-6 space-y-6 order-2 lg:order-none">
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                Active Challenges
              </h2>
              <Challenges />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                Past Submissions
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                No submissions yet — submit a challenge to show off your skills.
              </p>
            </div>
          </section>

          {/* ===== Right column (Matches + Tasks) ===== */}
          <aside className="lg:col-span-3 space-y-6 order-3 lg:order-none">
            <div className="lg:sticky lg:top-24 space-y-6">
              <Matches />
              <TasksPanel />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
