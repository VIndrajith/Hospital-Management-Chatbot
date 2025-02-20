import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://domestic-cologne-fig-prospective.trycloudflare.com/chat"; // Replace with actual API URL

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(API_URL, { message: input });
      setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
        console.error("Error connecting to chatbot:", error);  // Log the error for debugging
        setMessages([...newMessages, { text: "Error: Could not connect to chatbot.", sender: "bot" }]);
    }
  };

  return (
    <div className="chat-container">
      <h2>Hospital Chatbot</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
