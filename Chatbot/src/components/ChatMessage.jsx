import { motion } from "framer-motion";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === "model";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`message ${isBot ? "bot-message" : "user-message"}`}
    >
      {isBot && <ChatbotIcon />}
      <div className="message-text">
        {chat.text === "typing" ? (
          <span className="typing-indicator">
            <span></span><span></span><span></span>
          </span>
        ) : (
          chat.text.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
