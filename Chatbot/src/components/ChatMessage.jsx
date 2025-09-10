import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === "model";

  return (
    <div className={`message ${isBot ? "bot-message" : "user-message"}`}>
      {isBot && <ChatbotIcon />}
      <div className="message-text">
        {chat.text.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;
