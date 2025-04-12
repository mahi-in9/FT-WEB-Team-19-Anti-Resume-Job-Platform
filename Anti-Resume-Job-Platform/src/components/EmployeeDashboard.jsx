import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setCompanyData({
            name: "TechInnovators Inc.",
            openPositions: 5,
            candidatesReviewed: 42,
            avgHiringTime: "14 days",
            challengeCompletionRate: "78%",
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching company data:", error);
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    navigate("/login");
  };

  const candidatesData = [
    {
      id: 1,
      code: "CAN-4821",
      skills: ["React", "TypeScript", "UI/UX"],
      challengeScore: 92,
      cultureFit: 88,
      status: "Top Match",
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      code: "CAN-6712",
      skills: ["Python", "Data Analysis", "SQL"],
      challengeScore: 87,
      cultureFit: 76,
      status: "Review Needed",
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      code: "CAN-3490",
      skills: ["Node.js", "AWS", "Microservices"],
      challengeScore: 95,
      cultureFit: 82,
      status: "Interview Scheduled",
      lastActivity: "3 days ago",
    },
    {
      id: 4,
      code: "CAN-7823",
      skills: ["Java", "Spring Boot", "Kubernetes"],
      challengeScore: 79,
      cultureFit: 65,
      status: "On Hold",
      lastActivity: "1 week ago",
    },
  ];

  const positionsData = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Product",
      candidates: 12,
      status: "Active",
      datePosted: "2023-11-15",
      challenge: "React Performance Optimization",
    },
    {
      id: 2,
      title: "Data Scientist",
      department: "Analytics",
      candidates: 8,
      status: "Active",
      datePosted: "2023-11-20",
      challenge: "Predictive Modeling Challenge",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Infrastructure",
      candidates: 5,
      status: "Paused",
      datePosted: "2023-10-28",
      challenge: "CI/CD Pipeline Challenge",
    },
  ];

  const analyticsData = {
    challengeCompletion: 78,
    timeToHire: 14,
    candidateSources: {
      "Platform Matches": 45,
      "Employee Referrals": 22,
      "Outbound Sourcing": 33,
    },
    diversityMetrics: {
      Gender: { Male: 58, Female: 39, Other: 3 },
      Ethnicity: { White: 52, Asian: 28, Black: 12, Hispanic: 8 },
    },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "candidates":
        return (
          <div className="candidates-table">
            <div className="table-header">
              <span>Candidate</span>
              <span>Skills</span>
              <span>Challenge Score</span>
              <span>Culture Fit</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {candidatesData.map((candidate) => (
              <div key={candidate.id} className="table-row">
                <div className="candidate-code">{candidate.code}</div>
                <div className="skills-list">
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <div
                  className={`score ${getScoreClass(candidate.challengeScore)}`}
                >
                  {candidate.challengeScore}
                </div>
                <div className={`score ${getScoreClass(candidate.cultureFit)}`}>
                  {candidate.cultureFit}
                </div>
                <div
                  className={`status ${candidate.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {candidate.status}
                </div>
                <div className="actions">
                  <button className="view-btn">View</button>
                  <button className="action-btn">···</button>
                </div>
              </div>
            ))}
          </div>
        );

      case "positions":
        return (
          <div className="positions-grid">
            {positionsData.map((position) => (
              <div key={position.id} className="position-card">
                <div className="position-header">
                  <h3>{position.title}</h3>
                  <span
                    className={`status-badge ${position.status.toLowerCase()}`}
                  >
                    {position.status}
                  </span>
                </div>
                <p className="department">{position.department}</p>

                <div className="position-stats">
                  <div className="stat">
                    <span className="stat-label">Candidates</span>
                    <span className="stat-value">{position.candidates}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Posted</span>
                    <span className="stat-value">{position.datePosted}</span>
                  </div>
                </div>

                <div className="challenge-info">
                  <span className="label">Challenge:</span>
                  <p>{position.challenge}</p>
                </div>

                <div className="position-actions">
                  <button className="primary-btn">View Candidates</button>
                  <button className="secondary-btn">Edit Position</button>
                </div>
              </div>
            ))}

            <div className="add-position-card">
              <button className="add-position-btn">
                <span>+</span>
                <p>Create New Position</p>
              </button>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="analytics-section">
            <div className="analytics-header">
              <h2>Hiring Analytics</h2>
              <div className="time-filter">
                <select>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Challenge Completion Rate</h3>
                <div className="gauge-chart">
                  <div
                    className="gauge-fill"
                    style={{ width: `${analyticsData.challengeCompletion}%` }}
                  ></div>
                  <span>{analyticsData.challengeCompletion}%</span>
                </div>
                <p>of candidates complete challenges</p>
              </div>

              <div className="metric-card">
                <h3>Average Time to Hire</h3>
                <div className="big-number">
                  {analyticsData.timeToHire} <span>days</span>
                </div>
                <p>from first contact to offer</p>
              </div>

              <div className="metric-card">
                <h3>Candidate Sources</h3>
                <div className="pie-chart-placeholder">

                  <div className="pie-slice platform"></div>
                  <div className="pie-slice referrals"></div>
                  <div className="pie-slice outbound"></div>
                </div>
                <div className="source-legend">
                  {Object.entries(analyticsData.candidateSources).map(
                    ([source, value]) => (
                      <div key={source} className="legend-item">
                        <span className="legend-color"></span>
                        <span>
                          {source}: {value}%
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="diversity-section">
              <h3>Diversity Metrics</h3>
              <div className="diversity-charts">
                {Object.entries(analyticsData.diversityMetrics).map(
                  ([category, data]) => (
                    <div key={category} className="diversity-chart">
                      <h4>{category}</h4>
                      <div className="bar-chart">
                        {Object.entries(data).map(([group, percentage]) => (
                          <div key={group} className="bar-container">
                            <span className="bar-label">{group}</span>
                            <div className="bar">
                              <div
                                className="bar-fill"
                                style={{ width: `${percentage}%` }}
                              ></div>
                              <span className="bar-value">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "company":
        return (
          <div className="company-profile">
            <div className="profile-header">
              <div className="company-logo">TI</div>
              <h2>{companyData?.name}</h2>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <h3>Open Positions</h3>
                <p className="large-number">{companyData?.openPositions}</p>
              </div>
              <div className="stat-card">
                <h3>Candidates Reviewed</h3>
                <p className="large-number">
                  {companyData?.candidatesReviewed}
                </p>
              </div>
              <div className="stat-card">
                <h3>Avg. Hiring Time</h3>
                <p className="large-number">{companyData?.avgHiringTime}</p>
              </div>
              <div className="stat-card">
                <h3>Challenge Completion</h3>
                <p className="large-number">
                  {companyData?.challengeCompletionRate}
                </p>
              </div>
            </div>

            <div className="profile-sections">
              <div className="profile-section">
                <h3>Company Description</h3>
                <p className="editable-text">
                  TechInnovators is a leading software company specializing in
                  AI-driven solutions for enterprise clients. We value
                  innovation, collaboration, and continuous learning.
                </p>
              </div>

              <div className="profile-section">
                <h3>Hiring Team</h3>
                <div className="team-members">
                  <div className="member">
                    <div className="avatar">JD</div>
                    <span>John Doe</span>
                    <span className="role">Hiring Manager</span>
                  </div>
                  <div className="member">
                    <div className="avatar">AS</div>
                    <span>Alice Smith</span>
                    <span className="role">Technical Recruiter</span>
                  </div>
                  <div className="member">
                    <div className="avatar">RJ</div>
                    <span>Robert Johnson</span>
                    <span className="role">Team Lead</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  const getScoreClass = (score) => {
    if (score >= 90) return "excellent";
    if (score >= 80) return "good";
    if (score >= 70) return "fair";
    return "poor";
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
            className={activeTab === "candidates" ? "active" : ""}
            onClick={() => setActiveTab("candidates")}
          >
            Candidates
          </button>
          <button
            className={activeTab === "positions" ? "active" : ""}
            onClick={() => setActiveTab("positions")}
          >
            Positions
          </button>
          <button
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={activeTab === "company" ? "active" : ""}
            onClick={() => setActiveTab("company")}
          >
            Company
          </button>
        </nav>
        <div className="user-controls">
          <button className="notifications-btn">
            <span className="notification-badge">2</span>
            🔔
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-banner">
          <h1>Welcome, {companyData?.name} Team!</h1>
          <p>
            You have{" "}
            {candidatesData.filter((c) => c.status === "Review Needed").length}{" "}
            candidates needing review
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

export default EmployeeDashboard;
