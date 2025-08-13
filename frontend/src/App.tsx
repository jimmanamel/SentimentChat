import { useEffect, useRef, useState } from 'react';
import ChatWindow from './components/ChatWindow';

export type MessageType = {
  text: string,
  sentiment: 'positive' | 'neutral' | 'negative'
}

const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const socket = useRef<WebSocket>(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:8000/ws/chat');

    socket.current.onmessage = (event) => {
      const message: MessageType = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      if(socket.current) socket.current.close();
    };
  }, []);

  const sendMessage = (text:string) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(text);
    }
  };

  return (
    <div className="app">
      <ChatWindow messages={messages} onSend={sendMessage} />
    </div>
  );
};

export default App;