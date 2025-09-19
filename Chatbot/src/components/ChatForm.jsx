import { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  const [file, setFile] = useState(null);

  const systemInstruction = `
You are **MassAI**, an expert AI tutor with a friendly and encouraging personality.
Follow this approach step by step:
1. Greet warmly & ask for name if unknown.
2. Ask what subject they want to learn.
3. Ask what specific topic they need help with.
4. Give a clear 3-4 sentence explanation.
5. Provide a worked example, step-by-step.
6. Ask if they want another example or have questions.
7. If they say thanks, reply warmly and close politely.
Keep it short, structured, and encouraging.
`.trim();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage && !file) return;

    inputRef.current.value = "";

    setChatHistory((prev) => [
      ...prev,
      file
        ? { role: "user", text: `📎 Sent file: ${file.name}` }
        : { role: "user", text: userMessage },
      { role: "model", text: "typing" }
    ]);

    generateBotResponse({ userMessage, file, systemInstruction });
    setFile(null);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        className="message-input"
      />

      <label className="file-upload-label">
        📎
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      <button type="submit" className="material-symbols-outlined">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
