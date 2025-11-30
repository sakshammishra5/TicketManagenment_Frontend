import React, { useState } from "react";
import "./ChatWidget.css";
import { createTicket } from "../../../services/api";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ticketId, setTicketId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        setShowWelcome(false);
    };

    const handleCloseWelcome = () => setShowWelcome(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.email || !form.message) {
            alert("Please fill all fields");
            return;
        }

        try {
            setIsSubmitting(true);

            const res = await createTicket(form)
            // adjust to your backend path: "/createTicket" if same origin
            //   console.log(res.status==201)
            if (res.status!==201) throw new Error("Failed to create ticket");
            const data = res.data;
            console.log(data)
            setTicketId(data.ticketId);
            alert("Ticket created! Our team will contact you.");

            // optional: clear message, keep contact info
            setForm((prev) => ({ ...prev, message: "" }));
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Welcome popup */}
            {showWelcome && !isOpen && (
                <div className="chat-widget-welcome">
                    <div className="chat-widget-avatar-circle">
                        {/* You can replace this text with an <img /> */}
                        <span className="chat-widget-avatar-emoji">🤖</span>
                    </div>
                    <button
                        className="chat-widget-welcome-close"
                        onClick={handleCloseWelcome}
                    >
                        ×
                    </button>
                    <p className="chat-widget-welcome-text">
                        👋 Want to chat about Hubly? I'm a chatbot here to help you find
                        your way.
                    </p>
                </div>
            )}

            {/* Floating launcher button */}
            <button className="chat-widget-launcher" onClick={handleToggle}>
                {isOpen ? "✕" : "💬"}
            </button>

            {/* Chat window */}
            {isOpen && (
                <div className="chat-widget-window">
                    {/* Header */}
                    <div className="chat-widget-header">
                        <div className="chat-widget-header-left">
                            <div className="chat-widget-avatar-circle header-avatar">
                                <span className="chat-widget-avatar-emoji">🤖</span>
                            </div>
                            <span className="chat-widget-header-title">Hubly</span>
                        </div>
                        <button
                            className="chat-widget-header-close"
                            onClick={handleToggle}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Chat body */}
                    <div className="chat-widget-body">
                        {/* Example initial bot message */}
                        <div className="chat-widget-bubble bot">
                            <span>Hey!</span>
                        </div>

                        {/* Intro form card */}
                        <div className="chat-widget-intro-card">
                            <div className="chat-widget-intro-title">
                                Introduction Yourself
                            </div>

                            <form onSubmit={handleSubmit}>
                                <label className="chat-widget-label">
                                    Your name
                                    <input
                                        type="text"
                                        name="name"
                                        className="chat-widget-input"
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label className="chat-widget-label">
                                    Your Phone
                                    <input
                                        type="text"
                                        name="phone"
                                        className="chat-widget-input"
                                        placeholder="+1 (000) 000-0000"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label className="chat-widget-label">
                                    Your Email
                                    <input
                                        type="email"
                                        name="email"
                                        className="chat-widget-input"
                                        placeholder="example@gmail.com"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label className="chat-widget-label">
                                    Your Message
                                    <textarea
                                        name="message"
                                        className="chat-widget-textarea"
                                        placeholder="Type your question here..."
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="chat-widget-submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : ticketId
                                            ? "Ticket Created"
                                            : "Thank You!"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Footer – simple 'write a message' bar (disabled in this basic version) */}
                    <div className="chat-widget-footer">
                        <input
                            className="chat-widget-footer-input"
                            placeholder="Write a message"
                            disabled
                        />
                        <button className="chat-widget-footer-send" disabled>
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
