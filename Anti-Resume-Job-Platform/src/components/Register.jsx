import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "candidate", // 'candidate' or 'employer'
    name: "",
    skills: [], // For candidates
    companyName: "", // For employers
    industry: "", // For employers
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    if (value && !formData.skills.includes(value)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.name) {
      newErrors.name =
        formData.userType === "candidate"
          ? "Full name is required"
          : "Company name is required";
    }

    if (formData.userType === "candidate" && formData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: formData.userType,
      };

      if (formData.userType === "candidate") {
        payload.skills = formData.skills;
      } else {
        payload.companyName = formData.companyName;
        payload.industry = formData.industry;
      }

      const response = await axios.post("/api/auth/register", payload);

      if (response.data.success) {
        navigate(
          formData.userType === "candidate"
            ? "/dashboard"
            : "/employer-dashboard"
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        ...errors,
        submit:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Join the Anti-Resume Revolution</h2>
        <p>
          Create your{" "}
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
              I'm a Candidate
            </button>
            <button
              type="button"
              className={`toggle-btn ${
                formData.userType === "employer" ? "active" : ""
              }`}
              onClick={() => setFormData({ ...formData, userType: "employer" })}
            >
              I'm an Employer
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">
              {formData.userType === "candidate" ? "Full Name" : "Company Name"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={
                formData.userType === "candidate" ? "Jane Smith" : "Acme Inc."
              }
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {formData.userType === "candidate" ? (
            <div className="form-group">
              <label htmlFor="skills">Your Skills (Start typing to add)</label>
              <input
                type="text"
                id="skills"
                name="skills"
                onChange={handleSkillChange}
                placeholder="Type a skill and press enter"
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              />
              <div className="skills-container">
                {formData.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {errors.skills && <span className="error">{errors.skills}</span>}
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                >
                  <option value="">Select your industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </label>
            {errors.agreeToTerms && (
              <span className="error">{errors.agreeToTerms}</span>
            )}
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>

      <div className="platform-benefits">
        <h3>Why join our platform?</h3>
        <ul>
          <li>🚀 No resumes - showcase your actual skills</li>
          <li>👨‍💻 AI-powered matching based on demonstrated abilities</li>
          <li>👓 Blind evaluation process to eliminate bias</li>
          <li>💰 Transparent salary data</li>
          <li>
            {formData.userType === "candidate"
              ? "🎯 Get matched to roles where you'll truly excel"
              : "🔍 Find candidates who can actually do the work"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Register;
