import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../../../services/api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double submit
    setLoading(true);

    try {
      const res = await loginUser(form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SECTION */}
      <div className="login-left">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h2 className="login-title">Sign in to your Plexify</h2>

            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              className="login-input"
              onChange={handleChange}
              name="username"
              id="username"
              type="text"
              value={form.username}
              disabled={loading}
            />

            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              value={form.password}
              disabled={loading}
            />

            <button
              className={`login-btn ${loading ? "login-btn--loading" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading && <span className="login-spinner" />}
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="login-right">
        <img
          className="login-image"
          src="/login_img.png"
          alt="Login Visual"
        />
      </div>
    </div>
  );
};

export default Login;
