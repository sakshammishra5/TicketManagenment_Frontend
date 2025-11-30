import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Signup.css"
import { signupUser } from "../../../../services/api"; // <-- your API file

const Signup = () => {
  const navigate = useNavigate();

  // -------------------------
  // FORM STATE
  // -------------------------
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Generic input handler
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // -------------------------
  // SUBMIT HANDLER
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!form.terms) {
      return alert("You must accept the terms & privacy policy.");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      // call your backend API
      const res = await signupUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      alert("Account created successfully!");

      // optional: if backend returns token
      // localStorage.setItem("token", res.data.token);

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-left">
          <div className="signup-box">
            <h2 className="signup-title">Create an account</h2>

            <p className="signup-login-link">
              <Link to="/login">Sign in instead</Link>
            </p>

            <form onSubmit={handleSubmit}>

              <label className="signup-label" htmlFor="firstName">First name</label>
              <input
                className="signup-input"
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                required
              />

              <label className="signup-label" htmlFor="lastName">Last name</label>
              <input
                className="signup-input"
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                required
              />

              <label className="signup-label" htmlFor="email">Email</label>
              <input
                className="signup-input"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label className="signup-label" htmlFor="password">Password</label>
              <input
                className="signup-input"
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <label className="signup-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="signup-input"
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <div className="signup-check">
                <input
                  type="checkbox"
                  id="terms"
                  checked={form.terms}
                  onChange={handleChange}
                />
                <label htmlFor="terms">
                  By continuing, you accept our{" "}
                  <a href="#">privacy policy</a> &{" "}
                  <a href="#">terms</a>.
                </label>
              </div>

              <button type="submit" className="signup-btn">
                Create an account
              </button>
            </form>

            <p className="signup-footer">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>

        <div className="signup-right">
          <img className="signup-image" src="/login_img.png" alt="Signup Visual" />
        </div>
      </div>
    </>
  );
};

export default Signup;
