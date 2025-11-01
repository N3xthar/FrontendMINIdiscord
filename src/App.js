import React, { useState, useEffect } from 'react';
import JoinPage from './Components/JoinPage/JoinPage';
import ChatPage from './Components/ChatPage/ChatPage';
import { WebSocketService } from './services/websocketService';
import { MESSAGES_API } from './utils/constants';
import './App.css';

function App() {
  // State management for the entire application
  const [userName, setUserName] = useState(''); // Stores the current user's name
  const [messageText, setMessageText] = useState(''); // Stores the message being typed
  const [chatMessages, setChatMessages] = useState([]); // Stores all chat messages
  const [isUserJoined, setIsUserJoined] = useState(false); // Tracks if user has joined the chat currently set false 
  const [websocketService] = useState(new WebSocketService()); // WebSocket service instance that help use to connect to backend api dude 

  // Effect hook that runs when isUserJoined state changes
  useEffect(() => {
    // When user joins the chat
    if (isUserJoined) {
      loadPreviousMessages(); // Load previous messages from server
      connectWebSocket(); // Establish WebSocket connection
    }

    // Cleanup function - runs when component unmounts or before re-running the effect
    return () => {
      websocketService.disconnect(); // Disconnect WebSocket when leaving
    };
  }, [isUserJoined]); // Dependency array - effect runs when isUserJoined changes



  // Function to establish WebSocket connection
  const connectWebSocket = () => {
    websocketService.connect(
      // Callback when a new message is received via WebSocket
      (newMessage) => {
        // Add new message to the chat messages array
        setChatMessages(prev => [...prev, newMessage]);
      },
      // Callback when WebSocket connection is successfully established
      () => {
        // Send a join message to notify other users
        websocketService.sendJoinMessage(userName);
      }
    );
  };



  // Function to load previous messages from the server
  const loadPreviousMessages = async () => {
    try {
      // Fetch previous messages from the API
      const response = await fetch(MESSAGES_API);
      const messages = await response.json();
      // Set the chat messages with the loaded messages
      setChatMessages(messages);
    } catch (error) {
      console.error('Error loading previous messages:', error);
    }
  };



  // Handler for joining the chat
  const handleJoinChat = () => {
    // Check if username is not empty
    if (userName.trim()) {
      setIsUserJoined(true); // Set joined state to true
    }
  };



  // Handler for sending a message
  const handleSendMessage = () => {
    // Check if message is not empty
    if (messageText.trim()) {
      // Send message via WebSocket
      websocketService.sendChatMessage(userName, messageText);
      setMessageText(''); // Clear the message input field
    }
  };



  // Handler for keyboard events (Enter key)
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // If user hasn't joined yet, join on Enter press
      if (!isUserJoined) {
        handleJoinChat();
      } else {
        // If user has joined, send message on Enter press
        handleSendMessage();
      }
    }
  };


  
  // Main render method
  return (
    <div className="app-main-container">
      {/* Conditional rendering based on join status */}
      {!isUserJoined ? (
        // Show JoinPage if user hasn't joined yet
        <JoinPage
          userName={userName}
          setUserName={setUserName}
          onJoinChat={handleJoinChat}
          onKeyPress={handleKeyPress}
        />
      ) : (
        // Show ChatPage if user has joined
        <ChatPage
          userName={userName}
          messageText={messageText}
          setMessageText={setMessageText}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
}

export default App;