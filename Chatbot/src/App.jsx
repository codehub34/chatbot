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

  const apiUrl = import.meta.env.VITE_API_URL; // Gemini API endpoint

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  // ✅ Generate Bot Response
  const generateBotResponse = async ({ userMessage, file, systemInstruction }) => {
    try {
      let payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction}\n\nUser: ${userMessage}` }],
          },
        ],
      };

      if (file) {
        const fileData = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(fileData)));

        payload.contents[0].parts.push({
          inlineData: {
            mimeType: file.type,
            data: base64,
          },
        });
      }

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error(data.error?.message || "No response from Gemini.");
      }

      const reply = data.candidates[0].content.parts[0].text
        .replace(/\*/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      setChatHistory((prev) => {
        const updated = [...prev];
        const lastIndex = updated.findIndex(
          (msg, i) => msg.role === "model" && msg.text === "typing" && i === updated.length - 1
        );
        if (lastIndex !== -1) updated.splice(lastIndex, 1);
        updated.push({ role: "model", text: reply });
        return updated;
      });
    } catch (err) {
      console.error("API Error:", err);
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { role: "model", text: "⚠️ Unable to get a response right now." },
      ]);
    }
  };

  return (
    <>
      <Home setShowChatbot={setShowChatbot} />
      <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
        <button
          onClick={() => setShowChatbot((prev) => !prev)}
          id="chatbot-toggler"
        >
          <span className="material-symbols-outlined">mode_comment</span>
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="chatbot-popup">
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

          <div ref={chatBodyRef} className="chat-body">
            {chatHistory.length === 0 && (
              <div className="message bot-message">
                <ChatbotIcon />
                <p>👋 Hi! I’m MassAI, your Jula Tech tutor. What topic would you like to explore today?</p>
              </div>
            )}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

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
