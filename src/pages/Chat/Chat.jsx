import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useNavigate, useParams } from "react-router";
import {
  getParticularTicket,
  getTicket,
  replyParticularTicket,
  assignTicket,
  changeStatus,
} from "../../../services/api";
import { getTeamMembers } from "../../../services/api"; // adjust path if needed

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [chat, setChat] = useState(null); // ticket object
  const [allTickets, setAllTickets] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]); // teammates list for dropdown
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // load ticket list
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getTicket();
        setAllTickets(res.data || []);
      } catch (err) {
        console.error("Failed to load tickets list", err);
      }
    };
    fetchAll();
  }, []);

  // load particular ticket when chatId changes
  useEffect(() => {
    const fetch = async () => {
      if (!chatId) {
        setChat(null);
        return;
      }
      setLoading(true);
      try {
        const res = await getParticularTicket(chatId);
        setChat(res.data || null);
      } catch (err) {
        console.error("Failed to load ticket", err);
        setChat(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [chatId]);

  // load teammates for dropdown (simple)
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getTeamMembers();
        // res.data expected to be array of { id, fullName, email, phone, role } as in Team component
        setTeamMembers(res.data || []);
      } catch (err) {
        console.warn("Failed to load team members", err);
      }
    };
    fetchMembers();
  }, []);

  // send reply
  const handleSend = async () => {
    if (!message.trim() || !chat?._id) return;
    try {
      const res = await replyParticularTicket(chat._id, { text: message });
      // assume API returns updated ticket
      setChat(res.data);
      // refresh list (optional)
      try {
        const allRes = await getTicket();
        setAllTickets(allRes.data || []);
      } catch (err) {
        console.warn("Failed to refresh ticket list", err);
      }
      setMessage("");
    } catch (err) {
      console.error("Failed to send reply", err);
      alert(err.response?.data?.message || "Failed to send reply");
    }
  };

  // assign ticket to selected teammate
  const handleAssign = async (userId) => {
    if (!chat?._id || !userId) return;
    const confirm = window.confirm("Chat would be assigned to a different team member. Confirm?");
    if (!confirm) return;

    try {
      const res = await assignTicket(chat._id, { userId });
      // server should return updated ticket; update local state
      setChat(res.data || res.data.ticket || res.data.updated || null);
      // also refresh tickets list
      try {
        const allRes = await getTicket();
        setAllTickets(allRes.data || []);
      } catch (err) {}
    } catch (err) {
      console.error("Failed to assign ticket", err);
      alert(err.response?.data?.message || "Failed to assign ticket");
    }
  };

  // change ticket status
  const handleChangeStatus = async (status) => {
    if (!chat?._id || !status) return;
    const confirm = window.confirm(
      status === "closed" ? "Chat will be closed. Confirm?" : `Change status to ${status}?`
    );
    if (!confirm) return;

    try {
      const res = await changeStatus(chat._id, { status });
      // update state
      setChat(res.data?.ticket || res.data || null);
      // refresh list as well
      try {
        const allRes = await getTicket();
        setAllTickets(allRes.data || []);
      } catch (err) {}
    } catch (err) {
      console.error("Failed to change status", err);
      alert(err.response?.data?.message || "Failed to change status");
    }
  };

  // UI helpers
  const getInitials = (name = "") => {
    const parts = (name || "").split(" ").filter(Boolean);
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };

  // tiny guard while loading
  if (loading) {
    return <div style={{ padding: 24 }}>Loading ticket...</div>;
  }

  return (
    <div className="chat-container">
      {/* Left Sidebar */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2>Contact Center</h2>
        </div>

        <div className="chats-section">
          <h3>Chats</h3>
          <div className="chat-list">
            {allTickets.map((t) => (
              <div
                key={t._id}
                className={`chat-item ${chat && chat._id === t._id ? "active" : ""}`}
                onClick={() => navigate(`/dashboard/chat/${t._id}`)}
              >
                <div className="chat-avatar">{getInitials(t.client?.name)}</div>
                <div className="chat-info">
                  <div className="chat-name">{t.client?.name || "Contact"}</div>
                  <div className="chat-preview">{t.messages?.[0]?.text || ""}</div>
                </div>
                {t.status !== "closed" && <div className="chat-status-dot" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center - Chat messages */}
      <div className="chat-main">
        <div className="chat-header">
          <h3>Ticket# {chat?._id || "—"}</h3>
          <button
            className="close-btn"
            onClick={() => {
              // optional: navigate away or close
              navigate("/dashboard");
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="chat-messages">
          {chat ? (
            <>
              <div className="message-date">
                {new Date(chat.createdAt).toLocaleDateString()}
              </div>

              {chat.messages?.map((msg) => (
                <div key={msg._id} className="message">
                  <div className="message-avatar">{getInitials(msg.sender || msg.firstName)}</div>
                  <div className="message-content">
                    <div className="message-sender">{msg.sender || (msg.fromName || "Chat")}</div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={{ padding: 24, color: "#777" }}>Select a chat from the left to view messages</div>
          )}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button className="send-btn" onClick={handleSend}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="chat-details">
        <div className="details-header">
          <div className="user-avatar-large">{getInitials(chat?.client?.name)}</div>
          <span className="user-name">Chat</span>
        </div>

        <div className="details-section">
          <h4>Details</h4>
          <div className="detail-item">
            <span className="detail-icon">👤</span>
            <span className="detail-text">{chat?.client?.name || "-"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <span className="detail-text">{chat?.client?.phone || "-"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">✉️</span>
            <span className="detail-text">{chat?.client?.email || "-"}</span>
          </div>
        </div>

        <div className="details-section">
          <h4>Teammates</h4>

          {/* Assigned dropdown */}
          <div className="teammate-select" style={{ marginBottom: 10 }}>
            <div className="teammate-item">
              <div className="teammate-avatar">{getInitials(chat?.assignedTo?.firstName || chat?.assignedTo?.fullName)}</div>
              <div style={{ marginLeft: 8 }}>
                <div style={{ fontSize: 13, color: "#333", fontWeight: 600 }}>
                  {chat?.assignedTo?.firstName ? `${chat.assignedTo.firstName} ${chat.assignedTo.lastName || ""}`.trim() : (chat?.assignedTo?.fullName || "Unassigned")}
                </div>
                <div style={{ fontSize: 12, color: "#777" }}>{chat?.assignedTo?.email || ""}</div>
              </div>
            </div>
            <span className="dropdown-icon">▼</span>
          </div>

          {/* choose teammate to assign */}
          <select
            onChange={(e) => handleAssign(e.target.value)}
            value={chat?.assignedTo?._id || ""}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: "#fff",
            }}
          >
            <option value="">{chat?.assignedTo ? "Reassign to..." : "Assign to..."} </option>
            {teamMembers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.fullName} — {m.email}
              </option>
            ))}
          </select>
        </div>

        <div className="details-section">
          <h4>Ticket status</h4>

          <select
            onChange={(e) => handleChangeStatus(e.target.value)}
            value={chat?.status || "open"}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #e0e0e0",
              background: "#fff",
            }}
          >
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed (Resolved)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Chat;
