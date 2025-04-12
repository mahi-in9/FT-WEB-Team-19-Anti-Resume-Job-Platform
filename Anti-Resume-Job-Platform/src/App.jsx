import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CandidateDashboard from "./components/CandidateDashboard";
import ChallengePage from './components/ChallengePage';
import PostChallenge from './components/PostChallenge';
import ChallengeDetail from './components/ChallengeDetail';

import NotFound from "./NotFound";
import ChallengeFeed from "./components/ChallengeFeed";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate Routes */}
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />

        {/* Challenge Management Routes */}
        <Route path="/challenges" element={<ChallengePage />}>
          <Route index element={<ChallengeFeed
          />} />
          <Route path="post" element={<PostChallenge />} />
        </Route>

        {/* Challenge Detail Route */}
        <Route path="/challenges/:id" element={<ChallengeDetail />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;