import { useState } from "react";
import "./Login.css";
import { Link,useNavigate } from "react-router";
import { loginUser } from "../../../../services/api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  
  const handleSubmit = async (e) => {
    console.log(form)
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const token = res.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <>
      <div className="login-container">
        {/* LEFT SECTION */}
        <div className="login-left">
          <div className="login-box">
            <form onSubmit={handleSubmit}>
              <h2 className="login-title">Sign in to your Plexify</h2>

              <label className="login-label" htmlFor="username">Username</label>
              <input className="login-input" onChange={handleChange} name="username" id="username" type="text" />

              <label className="login-label" htmlFor="password">Password</label>
              <input className="login-input" onChange={handleChange} name="password" id="password" type="password" />

              <button className="login-btn" type="submit">Log in</button>
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
    </>
  );
};

export default Login;
