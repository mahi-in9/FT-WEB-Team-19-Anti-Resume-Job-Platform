import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={["candidate"]} />}>
          <Route path="/candidate" element={<CandidateDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["employer", "admin"]} />}>
          <Route path="/employer" element={<EmployerDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<EmployerDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
