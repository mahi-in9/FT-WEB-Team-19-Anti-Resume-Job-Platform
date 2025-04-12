import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';
// import './ChallengeFeed.css';

const ChallengeFeed = () => {
  // Get data from parent route
  const { challenges, userData } = useOutletContext();
  const navigate = useNavigate();

  // State for filtering
  const [skillFilter, setSkillFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  // Filter challenges whenever filters or challenges change
  useEffect(() => {
    const results = challenges.filter(challenge => {
      const matchesSkill = skillFilter
        ? challenge.skills.some(skill =>
          skill.toLowerCase().includes(skillFilter.toLowerCase()))
        : true;

      const matchesDifficulty = difficultyFilter !== 'all'
        ? challenge.difficulty === difficultyFilter
        : true;

      return matchesSkill && matchesDifficulty;
    });

    setFilteredChallenges(results);
  }, [challenges, skillFilter, difficultyFilter]);

  const handleStartChallenge = (id) => {
    navigate(`/challenges/${id}`);
  };

  return (
    <div className="challenge-feed">
      {/* Filter Controls */}
      <div className="feed-controls">
        <div className="filter-group">
          <label htmlFor="skill-filter">
            <i className="fas fa-filter"></i> Filter by Skill:
          </label>
          <input
            id="skill-filter"
            type="text"
            placeholder="e.g. React, Python..."
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            aria-label="Filter challenges by skill"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty-filter">
            <i className="fas fa-signal"></i> Difficulty:
          </label>
          <select
            id="difficulty-filter"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            aria-label="Filter challenges by difficulty"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        Showing {filteredChallenges.length} of {challenges.length} challenges
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="challenge-grid">
          {filteredChallenges.map(challenge => (
            <ChallengeCard
              key={`${challenge.id}-${userData?.activeChallenges?.includes(challenge.id)}`}
              challenge={challenge}
              isActive={userData?.activeChallenges?.includes(challenge.id)}
              onStart={() => handleStartChallenge(challenge.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <img
            src="/empty-state.svg"
            alt="No challenges found"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QxZDFkMSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNMTIgMTJ2LjAxTTEyIDE5LjI1YTcuMjUgNy4yNSAwIDExMC0xNC41IDcuMjUgNy4yNSAwIDAxMCAxNC41eiIvPjwvc3ZnPg==';
            }}
          />
          <h3>No matching challenges found</h3>
          <p>Try adjusting your filters or check back later</p>
          <button
            className="reset-filters"
            onClick={() => {
              setSkillFilter('');
              setDifficultyFilter('all');
            }}
            aria-label="Reset all filters"
          >
            <i className="fas fa-sync-alt"></i> Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeFeed;