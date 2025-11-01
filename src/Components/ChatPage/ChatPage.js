import React from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';
import './ChatPage.css';

// ChatPage component - Main container for the chat interface
const ChatPage = ({ 
  userName,           // Current user's name
  messageText,        // Current message being typed
  setMessageText,     // Function to update message text
  messages,           // Array of all chat messages
  onSendMessage,      // Function to send a message
  onKeyPress          // Function to handle Enter key press
}) => {
  return (
    <div className="chat-page-container">
      {/* Header section - shows app title and user info */}
      <ChatHeader userName={userName} />
      
      {/* Middle section - displays all chat messages */}
      <MessageList messages={messages} />
      
      {/* Bottom section - input field and send button */}
      <MessageInput
        messageText={messageText}
        setMessageText={setMessageText}
        onSendMessage={onSendMessage}
        onKeyPress={onKeyPress}
        userName={userName}
      />
    </div>
  );
};

export default ChatPage;