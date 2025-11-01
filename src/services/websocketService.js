import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { WEBSOCKET_URL } from '../utils/constants';

export class WebSocketService {
  constructor() {
    this.client = null;        // STOMP client instance
    this.isConnected = false;  // Connection status flag
  }

  // Main method to connect to WebSocket server
  connect(onMessageReceived, onConnected) {
    // Create new STOMP client with browser-compatible config
    this.client = new Client({
      webSocketFactory: () => new SockJS(WEBSOCKET_URL), // Use SockJS for browser compatibility
      reconnectDelay: 5000,     // Try to reconnect every 5 seconds if disconnected
      heartbeatIncoming: 4000,  // Send heartbeat every 4 seconds to keep connection alive
      heartbeatOutgoing: 4000,  // Receive heartbeat every 4 seconds
      
      // Called when successfully connected to server
      onConnect: () => {
        this.isConnected = true;
        console.log(' WebSocket Connected!');
        
        // Subscribe to receive messages from public channel
        this.client.subscribe('/topic/public', (message) => {
          const newMessage = JSON.parse(message.body); // Parse incoming message
          onMessageReceived(newMessage); // Send to callback function
        });
        
        // Call the onConnected callback if provided
        if (onConnected) onConnected();
      },
      
      // Called when there's STOMP protocol error
      onStompError: (error) => {
        console.error(' STOMP Error:', error);
      },
      
      // Called when WebSocket connection closes
      onWebSocketClose: () => {
        console.log('WebSocket Closed');
        this.isConnected = false;
      }
    });

    // Activate the connection - starts the connection process
    this.client.activate();
  }

  // Send join message when user enters chat
  sendJoinMessage(userName) {
    if (this.client && this.isConnected) {
      this.client.publish({
        destination: "/app/chat.join", // Server endpoint for join messages
        body: JSON.stringify({
          studentName: userName,
          content: `${userName} joined the chat!`,
          type: 'JOIN' // Message type for system messages
        })
      });
    }
  }

  // Send regular chat message
  sendChatMessage(userName, messageText) {
    if (this.client && this.isConnected) {
      this.client.publish({
        destination: "/app/chat.send", // Server endpoint for chat messages
        body: JSON.stringify({
          studentName: userName,
          content: messageText,
          type: 'CHAT' // Message type for regular messages
        })
      });
    }
  }

  // Disconnect from WebSocket server
  disconnect() {
    if (this.client) {
      this.client.deactivate(); // Properly close connection
      this.isConnected = false;
      console.log(' WebSocket Disconnected');
    }
  }
}