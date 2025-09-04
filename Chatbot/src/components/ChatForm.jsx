// src/components/ChatForm.jsx
import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        // Update chat history with the user's message
        setChatHistory(prev => [...prev, {role: "user", text: userMessage }]);
        
        // Add "Thinking..." message immediately
        setChatHistory(prev => [...prev, {role: "model", text: "Thinking..." }]);

        // Generate bot response after a short delay
        setTimeout(() => {
            generateBotResponse([...chatHistory, {role: "user", text: userMessage }]);
        }, 500);
    }
    
    return(
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
            <button type="submit" className="material-symbols-outlined">arrow_upward</button>
        </form>
    )
}

export default ChatForm;