import React from 'react';
import './MessageInput.css';

// MessageInput Component - Handles message composition and sending
const MessageInput = ({ messageText, setMessageText, onSendMessage, onKeyPress, userName }) => {
  // This component receives props from parent ChatPage component:
  // - messageText: Current value of the message input field
  // - setMessageText: Function to update message text state
  // - onSendMessage: Function to handle sending the message
  // - onKeyPress: Function to handle keyboard events (Enter key)
  // - userName: Current user's name for personalized placeholder

  return (
    // Main container for the message input area
    // Typically positioned at the bottom of the chat interface
    <div className="message-input-container">
      
      {/* Input field for typing new messages */}
      <input
        type="text" // Standard text input type
        className="message-input-field" // CSS class for styling the input
        // Personalized placeholder that includes the user's name
        placeholder={`Type a message, ${userName}...`}
        value={messageText} // Controlled component - value comes from parent state
        // Event handler for when input value changes
        // Updates the messageText state in parent component with new value
        onChange={(e) => setMessageText(e.target.value)}
        // Event handler for keyboard presses
        // Specifically used to detect Enter key for sending messages
        onKeyPress={onKeyPress}
      />
      
      {/* Button to send the message */}
      <button 
        className="message-send-button" // CSS class for styling the button
        // Event handler for when button is clicked
        // Calls parent's function to send the message
        onClick={onSendMessage}
        // Disable button if message is empty or only contains whitespace
        // Prevents sending empty messages
        disabled={!messageText.trim()}
      >
        Send {/* Button text label */}
      </button>
    </div>
  );
};

export default MessageInput;