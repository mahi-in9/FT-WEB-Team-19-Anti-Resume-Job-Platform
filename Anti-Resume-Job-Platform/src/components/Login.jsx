import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "candidate", // 'candidate' or 'employer'
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        rememberMe: formData.rememberMe,
      });

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));

        // Redirect based on user type
        navigate(
          formData.userType === "candidate"
            ? "/dashboard"
            : "/employer-dashboard"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        ...errors,
        submit:
          error.response?.data?.message ||
          "Login failed. Please check your credentials and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (userType) => {
    try {
      const response = await axios.post("/api/auth/demo", { userType });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        navigate(
          userType === "candidate" ? "/dashboard" : "/employer-dashboard"
        );
      }
    } catch (error) {
      console.error("Demo login error:", error);
      setErrors({
        ...errors,
        submit: "Demo login failed. Please try again.",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back to the Anti-Resume Revolution</h2>
        <p>
          Log in to your{" "}
          {formData.userType === "candidate" ? "candidate" : "employer"} account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="toggle-container">
            <button
              type="button"
              className={`toggle-btn ${
                formData.userType === "candidate" ? "active" : ""
              }`}
              onClick={() =>
                setFormData({ ...formData, userType: "candidate" })
              }
            >
              Candidate Login
            </button>

            <button
              type="button"
              className={`toggle-btn ${
                formData.userType === "employer" ? "active" : ""
              }`}
              onClick={() => setFormData({ ...formData, userType: "employer" })}
            >
              Employer Login
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁" : "👁‍🗨"}
              </button>
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-group remember-forgot">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="demo-buttons">
            <button
              type="button"
              className="demo-btn candidate-demo"
              onClick={() => handleDemoLogin("candidate")}
            >
              Try Candidate Demo
            </button>
            <button
              type="button"
              className="demo-btn employer-demo"
              onClick={() => handleDemoLogin("employer")}
            >
              Try Employer Demo
            </button>
          </div>
        </form>

        <div className="register-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>

      <div className="platform-benefits">
        <h3>Why log in to our platform?</h3>
        <ul>
          <li>🚀 Continue your skill-based job search</li>
          <li>📊 View your challenge performance analytics</li>
          <li>
            💼{" "}
            {formData.userType === "candidate"
              ? "See your best-matched positions"
              : "Review top candidates for your roles"}
          </li>
          <li>🔔 Get notified about new opportunities</li>
          <li>📈 Track your progress over time</li>
        </ul>

        <div className="testimonials">
          <h4>What our users say:</h4>
          <div className="testimonial">
            <p>
              "Finally got hired based on what I can do, not just what's on
              paper!"
            </p>
            <span>- Sarah, Software Developer</span>
          </div>
          <div className="testimonial">
            <p>
              "Found the perfect candidate in half the time of traditional
              hiring."
            </p>
            <span>- Mark, Hiring Manager</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
