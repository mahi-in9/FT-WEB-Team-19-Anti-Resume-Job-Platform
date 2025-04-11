import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import Dashboard from './components/Dashboard'
// import ChallengePage from './components/ChallengePage'
// import PostChallenge from './components/PostChallenge'
import CandidateDashboard from "./components/CandidateDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/candidateDashboard" element={<CandidateDashboard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/challenge/:id" element={<ChallengePage />} /> */}
        {/* <Route path="/post-challenge" element={<PostChallenge />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
