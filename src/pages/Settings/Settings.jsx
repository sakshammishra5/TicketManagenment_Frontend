import  { useEffect, useState } from "react";
import "./Settings.css";
import { getProfile } from "../../../services/api";

const Settings = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "************",
    confirmPassword: "************",
  });

  
    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(); // GET /user/me
        const user = res.data;

        setForm((prev) => ({
          ...prev,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Required";
    if (!form.lastName.trim()) nextErrors.lastName = "Required";
    if (!form.email.trim()) nextErrors.email = "Required";
    if (form.password !== form.confirmPassword)
      nextErrors.confirmPassword = "Passwords do not match";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // TODO: call API to update profile
      console.log("Profile saved:", form);
      alert("Profile updated!");
    }
  };

  return (
    <div className="settings-page">
      <h2 className="settings-heading">Settings</h2>

      <div className="settings-card">
        {/* Tabs row - only Edit Profile for now */}
        <div className="settings-tabs">
          <button className="settings-tab settings-tab--active">
            Edit Profile
          </button>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">
              First name
              <input
                className={`form-input ${
                  errors.firstName ? "form-input--error" : ""
                }`}
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
            </label>
            {errors.firstName && (
              <span className="error-text">{errors.firstName}</span>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">
              Last name
              <input
                className={`form-input ${
                  errors.lastName ? "form-input--error" : ""
                }`}
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
            </label>
            {errors.lastName && (
              <span className="error-text">{errors.lastName}</span>
            )}
          </div>

          <div className="form-row">
            <label className="form-label with-icon">
              Email
              <input
                className={`form-input ${
                  errors.email ? "form-input--error" : ""
                }`}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <span className="info-icon" title="Used for login & alerts">
                i
              </span>
            </label>
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-row">
            <label className="form-label with-icon">
              Password
              <input
                className="form-input"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <span className="info-icon" title="Min 8 characters">
                i
              </span>
            </label>
          </div>

          <div className="form-row">
            <label className="form-label with-icon">
              Confirm Password
              <input
                className={`form-input ${
                  errors.confirmPassword ? "form-input--error" : ""
                }`}
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
              />
              <span className="info-icon" title="Must match password">
                i
              </span>
            </label>
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-footer">
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
