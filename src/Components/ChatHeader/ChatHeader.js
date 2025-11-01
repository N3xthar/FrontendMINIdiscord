import React from 'react';
import './ChatHeader.css';

const ChatHeader = ({ userName }) => {
  return (
    <div className="chat-header-container">
      <div className="chat-header-left">
        <h2 className="chat-header-title">Mini-Discord</h2>
        <span className="chat-header-online-dot"></span>
        <span className="chat-header-online-text">Online</span>
      </div>
      <div className="chat-header-right">
        <span className="chat-header-welcome">Welcome, </span>
        <span className="chat-header-username">{userName}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
