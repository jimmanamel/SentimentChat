import { useState } from "react";
import Message from "./Message";
import "./ChatWindow.css";
import { MessageType } from "../App";

interface ChatWindowsProps {
  messages: MessageType[];
  onSend: (text: string) => void;
}

const ChatWindow = ({ messages, onSend }: ChatWindowsProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="title">Chat Bot</h2>
      <div className="messages">
        {messages.map((msg, idx) => (
          <Message key={idx} text={msg.text} sentiment={msg.sentiment} />
        ))}
      </div>
      <div className="input-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
