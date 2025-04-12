import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import "./Dashboard.css";
import ChallengeFeed from "./ChallengeFeed";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("challenges");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedChallenges, setRecommendedChallenges] = useState([]);
  // const [userSkills, setUserSkills] = useState([]);
  const [activeChallengesCount, setActiveChallengesCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Add your actual logout logic here
    console.log("Logout initiated");
    navigate("/login");
  };

  // Fetch user data and recommended challenges
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate user data fetch (replace with actual Firebase call)
        const mockUserData = {
          id: "user123",
          name: "Alex Johnson",
          profileCompletion: 85,
          skillScore: 720,
          matchedCompanies: 12,
          skills: ["React", "JavaScript", "CSS", "HTML"],
          activeChallenges: []
        };

        setUserData(mockUserData);
        // setUserSkills(mockUserData.skills);

        // Set up real-time challenge listener
        const challengesQuery = query(
          collection(db, "challenges"),
          where("skills", "array-contains-any", mockUserData.skills),
          where("status", "==", "active")
        );

        const unsubscribe = onSnapshot(challengesQuery, (snapshot) => {
          const challenges = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(), deadline: doc.data().deadline?.toDate()
          }));
          setRecommendedChallenges(challenges);

          // Calculate active challenges (started but not completed)
          // const activeCount = 
          setActiveChallengesCount(challenges.filter(challenge =>
            mockUserData.activeChallenges.includes(challenge.id)
          ).length);
          setIsLoading(false);
        });

        // setIsLoading(false);
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleLogout = () => {
  //   // Firebase sign out if using auth
  //   signOut(auth).then(() => navigate('/login'));
  // };

  const handleStartChallenge = (challengeId) => {
    // In a real app, you would update user's active challenges in Firestore
    console.log("Starting challenge:", challengeId);
    navigate(`/challenge/${challengeId}`);
  };



  if (isLoading) return <div className="loading">Loading...</div>;


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">SkillProof</div>
        <nav className="main-nav">
          <button
            className={activeTab === "challenges" ? "active" : ""}
            onClick={() => setActiveTab("challenges")}
          >
            My Challenges
          </button>

          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h1>Welcome back, {userData?.name || 'Candidate'}!</h1>
          <div className="stats-container">
            <div className="stat-pill active-challenges">
              <span className="stat-number">{activeChallengesCount}</span>
              <span className="stat-label">Active Challenge{activeChallengesCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="stat-pill recommended-challenges">
              <span className="stat-number">{recommendedChallenges.length}</span>
              <span className="stat-label">Recommended</span>
            </div>
          </div>
        </div>

        {/* Challenges Section */}
        <section className="challenges-section">
          <div className="section-header">
            <h2>Recommended Challenges</h2>
            <div className="section-actions">
              <button
                className="refresh-btn"
                onClick={() => window.location.reload()}
              >
                ↻ Refresh Challenges
              </button>
            </div>
          </div>

          {/* Challenge Feed */}
          <ChallengeFeed
            challenges={recommendedChallenges}
            userData={userData}
            onStartChallenge={handleStartChallenge}
          />
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} SkillProof. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CandidateDashboard;

