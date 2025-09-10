import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Show user message + "Thinking..." in chat
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "model", text: "Thinking..." }
    ]);

    // ✅ Clear, structured system instruction
    const systemInstruction = `
You are **MassAI**, an expert AI tutor with a friendly and encouraging personality.  
Follow this approach step by step:

1. **Greet the user** warmly and ask for their name if you don't know it yet.  
2. Ask what **subject** they want to learn (e.g., math, programming, science).  
3. Ask what **specific topic** within that subject they need help with.  
4. Provide a **clear, simple explanation** of the topic in 3-5 sentences.  
5. Give a **worked example problem**, solving it step-by-step so the user can follow along.  
6. End by asking if they would like **another example** or if they have **questions**.

Keep responses short, structured, and easy to read (use paragraphs and line breaks).  
Encourage the user and make learning interactive.
    `.trim();

    // Add system prompt only for first message
    const newHistory =
      chatHistory.length === 0
        ? [{ role: "user", text: `${systemInstruction}\n\nUser: ${userMessage}` }]
        : [...chatHistory, { role: "user", text: userMessage }];

    // Trigger AI response after slight delay
    setTimeout(() => {
      generateBotResponse(newHistory);
    }, 500);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-outlined">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
