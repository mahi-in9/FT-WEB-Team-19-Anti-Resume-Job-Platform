import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageChallenges from "../components/admin/ManageChalleneges";

import {
  collection,
  onSnapshot,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/api/firebase";
import { useAuth } from "../context/AuthContext";
import {
  FaUserTie,
  FaBriefcase,
  FaChartPie,
  FaBuilding,
  FaSignOutAlt,
  FaBell,
  FaPlus,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [companyData, setCompanyData] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPosition, setNewPosition] = useState({
    title: "",
    department: "",
    status: "Open",
    challenge: "",
  });

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const unsubscribers = [];

    const load = async () => {
      try {
        const companyDoc = await getDoc(
          doc(db, "companies", user?.uid || "defaultCompany")
        );
        setCompanyData(
          companyDoc.exists()
            ? companyDoc.data()
            : {
                name: "TechNova Inc.",
                openPositions: 3,
                candidatesReviewed: 10,
                avgHiringTime: "9 days",
                challengeCompletionRate: "75%",
              }
        );

        const unsubCand = onSnapshot(collection(db, "candidates"), (snap) => {
          setCandidates(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });

        const unsubPos = onSnapshot(collection(db, "positions"), (snap) => {
          setPositions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });

        unsubscribers.push(unsubCand, unsubPos);
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setLoading(false);
      }
    };

    load();
    return () => unsubscribers.forEach((u) => u && u());
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAddPosition = async (e) => {
    e.preventDefault();
    if (!newPosition.title || !newPosition.department)
      return alert("Please fill required fields");
    try {
      await addDoc(collection(db, "positions"), {
        ...newPosition,
        datePosted: new Date().toLocaleDateString(),
        candidates: 0,
      });
      setShowModal(false);
      setNewPosition({
        title: "",
        department: "",
        status: "Open",
        challenge: "",
      });
    } catch (error) {
      console.error("Error adding position:", error);
    }
  };

  // Chart Data
  const completionRate = parseInt(companyData?.challengeCompletionRate || "0");
  const analyticsData = [
    { name: "Challenges", value: completionRate },
    { name: "Remaining", value: 100 - completionRate },
  ];
  const COLORS = ["#6366f1", "#e5e7eb"];
  const hiringData = [
    { name: "Jan", hires: 2 },
    { name: "Feb", hires: 4 },
    { name: "Mar", hires: 3 },
    { name: "Apr", hires: 5 },
    { name: "May", hires: 2 },
  ];

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ===== Header ===== */}
      <header className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 text-white flex items-center justify-between px-6 py-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">Anti-Resume Admin</div>
        </div>

        <nav className="hidden md:flex gap-6 font-medium">
          // In the header tab navigation
          {[
            "candidates",
            "positions",
            "analytics",
            "company",
            "challenges",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize ${
                activeTab === tab
                  ? "text-white border-b-2 border-pink-300"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative text-xl">
            <FaBell />
            <span className="absolute top-0 right-0 bg-pink-500 text-xs text-white rounded-full px-1.5">
              2
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* ===== Content ===== */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {companyData?.name || "Company"} 👋
            </h1>
            <p className="text-gray-500">
              {positions.length} positions • {candidates.length} candidates
            </p>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        {activeTab === "positions" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Open Positions</h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition"
              >
                <FaPlus /> Add Position
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {positions.length > 0 ? (
                positions.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{p.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          p.status === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {p.status || "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {p.department || "General"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Challenge:{" "}
                      <span className="font-medium">
                        {p.challenge || "None"}
                      </span>
                    </p>
                    <button className="mt-4 w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition">
                      View Candidates
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No positions yet.
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "analytics" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Hiring Analytics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Challenge Completion
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={analyticsData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                    >
                      {analyticsData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Hires Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={hiringData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hires" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}

        {activeTab === "challenges" && <ManageChallenges />}
      </main>

      {/* ===== Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Add New Position
            </h3>
            <form onSubmit={handleAddPosition} className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                className="w-full border rounded-md px-3 py-2"
                value={newPosition.title}
                onChange={(e) =>
                  setNewPosition({ ...newPosition, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full border rounded-md px-3 py-2"
                value={newPosition.department}
                onChange={(e) =>
                  setNewPosition({ ...newPosition, department: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Challenge (optional)"
                className="w-full border rounded-md px-3 py-2"
                value={newPosition.challenge}
                onChange={(e) =>
                  setNewPosition({ ...newPosition, challenge: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800 transition"
              >
                Add Position
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== Footer ===== */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Anti-Resume Admin Panel.
      </footer>
    </div>
  );
}
