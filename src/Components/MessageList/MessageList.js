import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list-container">
       {/* Bina ? ke agar messages undefined hota toh error aata: */}
      {messages?.map?.((msg, index) => ( 
        <div 
          key={index} 
          className={`message-list-item ${msg.type === 'JOIN' ? 'message-join' : 'message-chat'}`}
        >
          {msg.type === 'JOIN' ? (
            <div className="message-system">
              <span className="message-system-icon">🎉</span>
              <span className="message-system-text">{msg.content}</span>
            </div>
          ) : (
            <div className="message-user">
              <span className="message-sender">{msg.studentName}:</span>
              <span className="message-content">{msg.content}</span>
            </div>
          )}
          <span className="message-time">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      )) || <div>No messages found</div>}
    </div>
  );
};

export default MessageList;