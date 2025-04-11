import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import Dashboard from './components/Dashboard'
import ChallengePage from './components/ChallengePage'
import PostChallenge from './components/PostChallenge'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/challenge/:id" element={<ChallengePage />} /> */}
        {/* <Route path="/post-challenge" element={<PostChallenge />} /> */}
        <Route path="/challenges" element={<ChallengePage />}>
          {/* <Route index element={<ChallengeFeed />} /> */}
          {/* Shows your feed */}
          <Route path="post" element={<PostChallenge />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
