// src/components/MessageInput.tsx
import React from 'react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend }) => {
  return (
    <div className="message-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
};

export default MessageInput;
