import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Create corresponding CSS file

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("challenges");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setUserData({
            name: "Alex Johnson",
            profileCompletion: 85,
            skillScore: 720,
            matchedCompanies: 12,
            activeChallenges: 3,
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    navigate("/login");
  };

  const challengesData = [
    {
      id: 1,
      title: "Frontend React Challenge",
      company: "TechCorp",
      difficulty: "Intermediate",
      status: "In Progress",
      deadline: "2023-12-15",
      progress: 65,
    },
    {
      id: 2,
      title: "Data Analysis Task",
      company: "DataInsights",
      difficulty: "Advanced",
      status: "Not Started",
      deadline: "2023-12-20",
      progress: 0,
    },
    {
      id: 3,
      title: "UI/UX Design Challenge",
      company: "CreativeMinds",
      difficulty: "Beginner",
      status: "Completed",
      deadline: "2023-12-10",
      progress: 100,
    },
  ];

  const matchesData = [
    {
      id: 1,
      company: "TechCorp",
      role: "Frontend Developer",
      matchScore: 92,
      salaryRange: "$80,000 - $95,000",
      cultureMatch: "Excellent",
    },
    {
      id: 2,
      company: "DataInsights",
      role: "Data Analyst",
      matchScore: 87,
      salaryRange: "$75,000 - $90,000",
      cultureMatch: "Good",
    },
    {
      id: 3,
      company: "CreativeMinds",
      role: "UI Designer",
      matchScore: 78,
      salaryRange: "$70,000 - $85,000",
      cultureMatch: "Good",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "challenges":
        return (
          <div className="challenges-grid">
            {challengesData.map((challenge) => (
              <div key={challenge.id} className="challenge-card">
                <div className="challenge-header">
                  <h3>{challenge.title}</h3>
                  <span
                    className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <p className="company-name">{challenge.company}</p>

                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                  <span>{challenge.progress}%</span>
                </div>

                <div className="challenge-footer">
                  <span>Status: {challenge.status}</span>
                  <span>Due: {challenge.deadline}</span>
                </div>

                <button className="action-button">
                  {challenge.status === "Completed"
                    ? "View Results"
                    : "Continue Challenge"}
                </button>
              </div>
            ))}
          </div>
        );

      case "matches":
        return (
          <div className="matches-list">
            {matchesData.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <h3>{match.role}</h3>
                  <span className="company-name">{match.company}</span>
                </div>

                <div className="match-stats">
                  <div className="stat-item">
                    <span className="stat-label">Match Score</span>
                    <span className="stat-value highlight">
                      {match.matchScore}/100
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Salary Range</span>
                    <span className="stat-value">{match.salaryRange}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Culture Fit</span>
                    <span className="stat-value">{match.cultureMatch}</span>
                  </div>
                </div>

                <div className="match-actions">
                  <button className="primary-button">Express Interest</button>
                  <button className="secondary-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        );

      case "profile":
        return (
          <div className="profile-section">
            <div className="profile-header">
              <div className="avatar">AJ</div>
              <h2>{userData?.name}</h2>
              <p className="profile-completion">
                Profile {userData?.profileCompletion}% complete
                <span className="completion-bar">
                  <span
                    style={{ width: `${userData?.profileCompletion}%` }}
                  ></span>
                </span>
              </p>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <h3>Skill Score</h3>
                <p className="large-number">{userData?.skillScore}</p>
                <p>Top 15% of candidates</p>
              </div>
              <div className="stat-card">
                <h3>Matched Companies</h3>
                <p className="large-number">{userData?.matchedCompanies}</p>
                <p>Based on your skills</p>
              </div>
              <div className="stat-card">
                <h3>Active Challenges</h3>
                <p className="large-number">{userData?.activeChallenges}</p>
                <p>In progress</p>
              </div>
            </div>

            <div className="profile-details">
              <h3>Your Skill Profile</h3>
              <div className="skills-chart">
                {/* This would be replaced with an actual chart component */}
                <div className="chart-placeholder">
                  [Skills Radar Chart Placeholder]
                </div>
              </div>

              <button className="edit-profile-button">
                Edit Profile & Skills
              </button>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
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
        <div className="logo">AntiResume</div>
        <nav className="main-nav">
          <button
            className={activeTab === "challenges" ? "active" : ""}
            onClick={() => setActiveTab("challenges")}
          >
            My Challenges
          </button>
          <button
            className={activeTab === "matches" ? "active" : ""}
            onClick={() => setActiveTab("matches")}
          >
            Job Matches
          </button>
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
        </nav>
        <div className="user-controls">
          <button className="notifications-btn">
            <span className="notification-badge">3</span>
            🔔
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-banner">
          <h1>Welcome back, {userData?.name}!</h1>
          <p>
            You have{" "}
            {challengesData.filter((c) => c.status === "In Progress").length}{" "}
            challenges in progress
          </p>
        </div>

        {renderTabContent()}
      </main>

      <footer className="dashboard-footer">
        <p>Need help? Contact our support team</p>
        <p>© 2023 AntiResume Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CandidateDashboard;
