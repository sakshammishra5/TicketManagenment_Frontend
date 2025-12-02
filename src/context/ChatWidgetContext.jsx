import React, { createContext, useState, useContext } from "react";

const ChatWidgetContext = createContext();

export const ChatWidgetProvider = ({ children }) => {
  const [headerColor, setHeaderColor] = useState("#33475B");
  const [bgColor, setBgColor] = useState("#EEEEEE");
  const [message1, setMessage1] = useState("How can i help you?");
  const [message2, setMessage2] = useState("Ask me anything!");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way."
  );

  const value = {
    headerColor,
    setHeaderColor,
    bgColor,
    setBgColor,
    message1,
    setMessage1,
    message2,
    setMessage2,
    welcomeMessage,
    setWelcomeMessage,
  };

  return (
    <ChatWidgetContext.Provider value={value}>
      {children}
    </ChatWidgetContext.Provider>
  );
};

export const useChatWidgetContext = () => {
  const context = useContext(ChatWidgetContext);
  if (!context) {
    throw new Error(
      "useChatWidgetContext must be used within ChatWidgetProvider"
    );
  }
  return context;
};
