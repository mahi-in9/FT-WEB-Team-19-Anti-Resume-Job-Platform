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
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [showTaskDetails, setShowTaskDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fetch user data and recommended challenges
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock user data - replace with actual user fetch in production
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

        // Fetch challenges from Firestore
        const challengesQuery = query(
          collection(db, "challenges"),
          where("skills", "array-contains-any", mockUserData.skills),
          where("status", "==", "active")
        );

        const unsubscribe = onSnapshot(challengesQuery, (snapshot) => {
          const challenges = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            deadline: doc.data().deadline?.toDate()
          }));

          setRecommendedChallenges(challenges);
          setIsLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStartChallenge = (challengeId) => {
    // In a real app, this would update the user's active challenges
    setActiveChallenges(prev => [...prev, challengeId]);
    navigate(`/challenge/${challengeId}`);
  };

  const renderTaskCard = (challenge) => {
    const isActive = activeChallenges.includes(challenge.id);
    const status = isActive ? "in-progress" : "available";

    return (
      <div key={challenge.id} className={`task-card ${status}`}>
        <div className="task-header">
          <div className="company-info">
            <div className="company-logo-placeholder">
              {challenge.company?.charAt(0) || 'C'}
            </div>
            <div>
              <h3>{challenge.title}</h3>
              <p className="company-name">{challenge.company}</p>
            </div>
          </div>
          <span className={`status-badge ${status}`}>
            {status.replace("-", " ")}
          </span>
        </div>
        <div className="task-meta">
          <span>Due: {challenge.deadline?.toLocaleDateString() || 'No deadline'}</span>
        </div>
        <div className="skills-required">
          <h4>Skills Required:</h4>
          <div className="skills-tags">
            {challenge.skills?.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="task-footer">
          <button
            className="details-btn"
            onClick={() => setShowTaskDetails(challenge.id)}
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

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
        <div className="welcome-banner">
          <h1>Welcome back, {userData?.name || 'Candidate'}!</h1>
          <div className="stats-container">
            <div className="stat-pill active-challenges">
              <span className="stat-number">{activeChallenges.length}</span>
              <span className="stat-label">
                Active Challenge{activeChallenges.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="stat-pill recommended-challenges">
              <span className="stat-number">{recommendedChallenges.length}</span>
              <span className="stat-label">Recommended</span>
            </div>
          </div>
        </div>

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

          <div className="tasks-grid">
            {recommendedChallenges.length > 0 ? (
              recommendedChallenges.map(renderTaskCard)
            ) : (
              <p className="no-tasks">No challenges available at the moment</p>
            )}
          </div>
        </section>

        {showTaskDetails && (
          <div className="task-details-modal">
            <div className="modal-content">
              <button
                className="close-modal"
                onClick={() => setShowTaskDetails(null)}
              >
                &times;
              </button>

              {(() => {
                const challenge = recommendedChallenges.find(
                  (c) => c.id === showTaskDetails
                );
                const isActive = activeChallenges.includes(challenge.id);
                const status = isActive ? "in-progress" : "available";

                return (
                  <>
                    <div className="task-header">
                      <div className="company-info">
                        <div className="company-logo-placeholder large">
                          {challenge.company?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <h2>{challenge.title}</h2>
                          <p className="company-name">{challenge.company}</p>
                        </div>
                      </div>
                      <span className={`status-badge large ${status}`}>
                        {status.replace("-", " ")}
                      </span>
                    </div>

                    <div className="task-meta">
                      <div>
                        <span>
                          Due: {challenge.deadline?.toLocaleDateString() || 'No deadline'}
                        </span>
                      </div>
                    </div>

                    <div className="task-description">
                      <h3>Challenge Description</h3>
                      <p>{challenge.description}</p>
                    </div>

                    {challenge.skills && (
                      <div className="skills-required">
                        <h3>Skills Required</h3>
                        <div className="skills-tags">
                          {challenge.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="task-actions">
                      {!isActive ? (
                        <button
                          className="primary-button"
                          onClick={() => handleStartChallenge(challenge.id)}
                        >
                          Start This Challenge
                        </button>
                      ) : (
                        <div className="submission-status">
                          <p>✓ You've started this challenge</p>
                          <button className="secondary-button">
                            Continue Challenge
                          </button>
                        </div>
                      )}
                      <button
                        className="secondary-button"
                        onClick={() => setShowTaskDetails(null)}
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} SkillProof. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CandidateDashboard;