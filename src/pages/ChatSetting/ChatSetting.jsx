import React, { useState } from "react";
import "./ChatSetting.css";

const HEADER_COLORS = ["#ffffff", "#000000", "#33475B"];
const BG_COLORS = ["#ffffff", "#000000", "#EEEEEE"];

const ChatSetting = () => {
  const [headerColor, setHeaderColor] = useState("#33475B");
  const [bgColor, setBgColor] = useState("#EEEEEE");
  const [message1, setMessage1] = useState("How can i help you?");
  const [message2, setMessage2] = useState("Ask me anything!");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way."
  );

  return (
    <div className="chatbot-page">
      {/* LEFT PREVIEW PANEL */}
      <div className="chatbot-preview-wrapper">
        <div className="chatbot-preview">
          <div
            className="chatbot-header"
            style={{ backgroundColor: headerColor }}
          >
            <div className="chatbot-logo">
              <span className="bot-eye" />
            </div>
            <span className="chatbot-title">Hubly</span>
          </div>

          <div className="chatbot-body" style={{ backgroundColor: bgColor }}>
            <div className="chatbot-messages">
              <div className="bot-avatar" />
              <div className="bot-bubbles">
                <div className="bot-bubble">{message1}</div>
                <div className="bot-bubble">{message2}</div>
              </div>
            </div>

            <div className="intro-card">
              <div className="intro-title">Introduction Yourself</div>
              <label className="intro-label">
                Your name
                <input
                  className="intro-input"
                  placeholder="Your name"
                  readOnly
                />
              </label>
              <label className="intro-label">
                Your Phone
                <input
                  className="intro-input"
                  placeholder="+1 (000) 000-0000"
                  readOnly
                />
              </label>
              <label className="intro-label">
                Your Email
                <input
                  className="intro-input"
                  placeholder="example@gmail.com"
                  readOnly
                />
              </label>
              <button className="intro-btn">Thank You!</button>
            </div>
          </div>

          <div className="chatbot-footer">
            <span className="write-message">Write a message</span>
            <span className="send-icon">➤</span>
          </div>
        </div>

        {/* floating welcome popup */}
        <div className="welcome-popup">
          <div className="popup-avatar" />
          <div className="popup-content">
            {welcomeMessage}
          </div>
          <button className="popup-close">×</button>
        </div>
      </div>

      {/* RIGHT SETTINGS PANEL */}
      <div className="settings-panel">
        {/* Header color */}
        <div className="settings-card">
          <div className="settings-title">Header Color</div>
          <div className="color-row">
            {HEADER_COLORS.map((c) => (
              <button
                key={c}
                className={`color-swatch ${
                  headerColor === c ? "color-swatch--active" : ""
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setHeaderColor(c)}
              />
            ))}
            <div className="color-input-wrapper">
              <span className="color-preview" style={{ backgroundColor: headerColor }} />
              <input
                className="color-input"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Background color */}
        <div className="settings-card">
          <div className="settings-title">Custom Background Color</div>
          <div className="color-row">
            {BG_COLORS.map((c) => (
              <button
                key={c}
                className={`color-swatch ${
                  bgColor === c ? "color-swatch--active" : ""
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setBgColor(c)}
              />
            ))}
            <div className="color-input-wrapper">
              <span className="color-preview" style={{ backgroundColor: bgColor }} />
              <input
                className="color-input"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Customize message */}
        <div className="settings-card">
          <div className="settings-title">Customize Message</div>
          <div className="editable-row">
            <input
              className="editable-input"
              value={message1}
              onChange={(e) => setMessage1(e.target.value)}
            />
            <span className="edit-icon">✎</span>
          </div>
          <div className="editable-row">
            <input
              className="editable-input"
              value={message2}
              onChange={(e) => setMessage2(e.target.value)}
            />
            <span className="edit-icon">✎</span>
          </div>
        </div>

        {/* Introduction form text (only visual) */}
        <div className="settings-card">
          <div className="settings-title">Introduction Form</div>
          <div className="intro-form-preview">
            <label className="intro-label">
              Your name
              <input
                className="intro-input"
                placeholder="Your name"
                readOnly
              />
            </label>
            <label className="intro-label">
              Your Phone
              <input
                className="intro-input"
                placeholder="+1 (000) 000-0000"
                readOnly
              />
            </label>
            <label className="intro-label">
              Your Email
              <input
                className="intro-input"
                placeholder="example@gmail.com"
                readOnly
              />
            </label>
            <button className="intro-btn full-width">Thank You!</button>
          </div>
        </div>

        {/* Welcome message */}
        <div className="settings-card">
          <div className="settings-title">Welcome Message</div>
          <div className="welcome-row">
            <textarea
              maxLength={50}
              className="welcome-textarea"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
            />
            <span className="edit-icon">✎</span>
          </div>
          <div className="char-count">
            {welcomeMessage.length}/50
          </div>
        </div>

        {/* Missed chat timer */}
        <div className="settings-card">
          <div className="settings-title">Missed chat timer</div>
          <div className="timer-row">
            <div className="timer-column">
              <span className="timer-label">HH</span>
              <select className="timer-select">
                <option>00</option>
                <option>01</option>
                <option>12</option>
              </select>
            </div>
            <span className="timer-separator">:</span>
            <div className="timer-column">
              <span className="timer-label">MM</span>
              <select className="timer-select">
                <option>10</option>
                <option>11</option>
                <option>59</option>
              </select>
            </div>
            <span className="timer-separator">:</span>
            <div className="timer-column">
              <span className="timer-label">SS</span>
              <select className="timer-select">
                <option>00</option>
                <option>01</option>
                <option>59</option>
              </select>
            </div>
            <button className="timer-save">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSetting;
