import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import "./EmployeeDashboard.css";
import { getDoc, doc } from "firebase/firestore";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const [companyData, setCompanyData] = useState(null);
  const [candidatesData, setCandidatesData] = useState([]);
  const [positionsData, setPositionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company data
        const companyDoc = await getDoc(doc(db, "companies", "currentCompany"));
        setCompanyData(companyDoc.exists() ? companyDoc.data() : {
          name: "TechInnovators Inc.",
          openPositions: 0,
          candidatesReviewed: 0,
          avgHiringTime: "0 days",
          challengeCompletionRate: "0%"
        });

        // Set up real-time listeners
        const candidatesUnsub = onSnapshot(
          collection(db, "candidates"),
          (snapshot) => {
            setCandidatesData(snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })));
          }
        );

        const positionsUnsub = onSnapshot(
          collection(db, "positions"),
          (snapshot) => {
            setPositionsData(snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })));
          }
        );

        setIsLoading(false);

        return () => {
          candidatesUnsub();
          positionsUnsub();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const analyticsData = {
    challengeCompletion: companyData?.challengeCompletionRate?.replace("%", "") || 0,
    timeToHire: parseInt(companyData?.avgHiringTime?.split(" ")[0]) || 0,
    candidateSources: {
      "Platform Matches": 45,
      "Employee Referrals": 22,
      "Outbound Sourcing": 33,
    },
    diversityMetrics: {
      Gender: {
        Male: 58,
        Female: 39,
        Other: 3,
      },
      Ethnicity: {
        White: 52,
        Asian: 28,
        Black: 12,
        Hispanic: 8,
      },
    },
  };

  const getScoreClass = (score) => {
    if (!score) return "fair";
    if (score >= 90) return "excellent";
    if (score >= 80) return "good";
    if (score >= 70) return "fair";
    return "poor";
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
            {candidatesData.length > 0 ? (
              candidatesData.map((candidate) => (
                <div key={candidate.id} className="table-row">
                  <div className="candidate-code">{candidate.code || `CAN-${candidate.id.slice(0, 4)}`}</div>
                  <div className="skills-list">
                    {(candidate.skills || []).map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className={`score ${getScoreClass(candidate.challengeScore)}`}>
                    {candidate.challengeScore || "N/A"}
                  </div>
                  <div className={`score ${getScoreClass(candidate.cultureFit)}`}>
                    {candidate.cultureFit || "N/A"}
                  </div>
                  <div className={`status ${(candidate.status || "Pending").toLowerCase().replace(" ", "-")}`}>
                    {candidate.status || "Pending"}
                  </div>
                  <div className="actions">
                    <button className="view-btn">View</button>
                    <button className="action-btn">···</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No candidates found</div>
            )}
          </div>
        );

      case "positions":
        return (
          <div className="positions-grid">
            {positionsData.length > 0 ? (
              positionsData.map((position) => (
                <div key={position.id} className="position-card">
                  <div className="position-header">
                    <h3>{position.title || "New Position"}</h3>
                    <span className={`status-badge ${(position.status || "Draft").toLowerCase()}`}>
                      {position.status || "Draft"}
                    </span>
                  </div>
                  <p className="department">{position.department || "General"}</p>
                  <div className="position-stats">
                    <div className="stat">
                      <span className="stat-label">Candidates</span>
                      <span className="stat-value">{position.candidates || 0}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Posted</span>
                      <span className="stat-value">
                        {position.datePosted || "Not posted"}
                      </span>
                    </div>
                  </div>
                  <div className="challenge-info">
                    <span className="label">Challenge:</span>
                    <p>{position.challenge || "No challenge set"}</p>
                  </div>
                  <div className="position-actions">
                    <button className="primary-btn">View Candidates</button>
                    <button className="secondary-btn">Edit Position</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No positions created yet</div>
            )}
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
                  {analyticsData.timeToHire}
                  <span>days</span>
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
              <div className="company-logo">
                {companyData?.name?.substring(0, 2) || "CO"}
              </div>
              <h2>{companyData?.name || "Your Company"}</h2>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Open Positions</h3>
                <p className="large-number">{companyData?.openPositions || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Candidates Reviewed</h3>
                <p className="large-number">
                  {companyData?.candidatesReviewed || 0}
                </p>
              </div>
              <div className="stat-card">
                <h3>Avg. Hiring Time</h3>
                <p className="large-number">
                  {companyData?.avgHiringTime || "0 days"}
                </p>
              </div>
              <div className="stat-card">
                <h3>Challenge Completion</h3>
                <p className="large-number">
                  {companyData?.challengeCompletionRate || "0%"}
                </p>
              </div>
            </div>
            <div className="profile-sections">
              <div className="profile-section">
                <h3>Company Description</h3>
                <p className="editable-text">
                  {companyData?.description ||
                    "Add your company description here..."}
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
          <h1>Welcome, {companyData?.name || "Company"} Team!</h1>
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
        <p>© {new Date().getFullYear()} SkillProof. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;