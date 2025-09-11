import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import Home from "./components/Home";
import "./index.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  // ✅ Configurable welcome message
  const welcomeMessage =
    "👋 Hi there! I’m MassAI, your personal AI tutor.\nWhat topic would you like to explore today?";

  // Helper: safely remove last "Thinking..." before adding new bot text
  const replaceThinkingWithResponse = (text) => {
    setChatHistory((prev) => {
      const newHistory = [...prev];
      const lastThinkingIndex = newHistory.findIndex(
        (msg, i) => msg.text === "Thinking..." && i === newHistory.length - 1
      );
      if (lastThinkingIndex !== -1) newHistory.splice(lastThinkingIndex, 1);
      newHistory.push({ role: "model", text });
      return newHistory;
    });
  };

  // ✅ Generate Bot Response + Clean Text
  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error("API URL not configured");
      replaceThinkingWithResponse(
        "Sorry, the chat service is currently unavailable. Please try again later."
      );
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (!response.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error(data.error?.message || "No response from AI.");
      }

      // ✅ CLEAN RESPONSE TEXT
      let apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*/g, "") // Remove markdown asterisks
        .replace(/\n{3,}/g, "\n\n") // Normalize extra newlines
        .replace(/^\n+|\n+$/g, "") // Trim leading/trailing newlines
        .trim();

      replaceThinkingWithResponse(apiResponseText);
    } catch (error) {
      console.error("API Error:", error);
      replaceThinkingWithResponse(
        "Sorry, I encountered an error. Please try again."
      );
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <>
      <Home setShowChatbot={setShowChatbot} />
      <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
        {/* Chatbot Toggle Button */}
        <button
          onClick={() => setShowChatbot((prev) => !prev)}
          id="chatbot-toggler"
        >
          <span className="material-symbols-outlined">mode_comment</span>
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Chatbot Popup */}
        <div className="chatbot-popup">
          {/* Chatbot Header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h1 className="logo-text">MassAI</h1>
            </div>
            <button
              onClick={() => setShowChatbot((prev) => !prev)}
              className="material-symbols-outlined"
            >
              keyboard_arrow_down
            </button>
          </div>

          {/* Chatbot Body */}
          <div ref={chatBodyRef} className="chat-body">
            {/* Show welcome message ONLY if no chat history yet */}
            {chatHistory.length === 0 && (
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text">
                  {welcomeMessage.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Render Chat History */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* Chatbot Footer */}
          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
 