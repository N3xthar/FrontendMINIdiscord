import React from 'react';
import './JoinPage.css';

// JoinPage Component - The entry point for users to join the chat
const JoinPage = ({ userName, setUserName, onJoinChat, onKeyPress }) => {
  // This component receives props from parent App component:
  // - userName: Current value of username input
  // - setUserName: Function to update username state
  // - onJoinChat: Function to handle joining the chat
  // - onKeyPress: Function to handle keyboard events (Enter key)

  return (
    // Main container for the join page with background styling
    <div className="join-page-container">
      
      {/* Card element that contains all the join page content */}
      <div className="join-page-card">
        
        {/* Main title of the application */}
        <h1 className="join-page-title">MiniDiscord </h1>
        
        {/* Subtitle describing the app's purpose */}
        <p className="join-page-subtitle">Connect with your friends in real-time</p>
        
        {/* Section containing the input field and join button */}
        <div className="join-page-input-section">
          
          {/* Input field for user to enter their name */}
          <input
            type="text" // Text input type
            className="join-page-input" // CSS class for styling
            placeholder="Enter your name" // Hint text inside input
            value={userName} // Controlled component - value comes from parent state
            // Update userName state when user types
            onChange={(e) => setUserName(e.target.value)}
            // Handle Enter key press to join chat
            onKeyPress={onKeyPress}
          />
          
          {/* Button to join the chat room */}
          <button 
            className="join-page-button" // CSS class for styling
            // Call parent's join function when clicked
            onClick={onJoinChat}
            // Disable button if username is empty or only whitespace
            disabled={!userName.trim()}
          >
            Join Chat {/* Button text */}
          </button>
        </div>
        
        {/* Help text showing user interaction options */}
        <p className="join-page-hint">
          Press Enter or click Join to start chatting
        </p>
      </div>
    </div>
  );
};

export default JoinPage;