import './Message.css';

interface MessageProps {
    text: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }

const emojiMap = {
  positive: '😊',
  neutral: '😐',
  negative: '😞',
};

const Message = ({ text, sentiment }:MessageProps) => (
  <div className={`message ${sentiment}`}>
    <span className="emoji">{emojiMap[sentiment]}</span>
    <span>{text}</span>
  </div>
);

export default Message;