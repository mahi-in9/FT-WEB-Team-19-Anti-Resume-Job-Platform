export default function ChallengeCard({ challenge }) {
  return (
    <div className="challenge-card">
      <div className="card-header">
        <h3>{challenge.title}</h3>
        <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
          {challenge.difficulty}
        </span>
      </div>

      <p className="description">{challenge.description}</p>

      <div className="skills-section">
        <h4>Skills Required:</h4>
        <div className="skills-list">
          {challenge.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <span>Posted by {challenge.company}</span>
        <span>{new Date(challenge.createdAt?.toDate()).toLocaleDateString()}</span>
      </div>

      <button className="view-challenge-btn">
        View Challenge
      </button>
    </div>
  );
}