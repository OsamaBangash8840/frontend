// @/lib/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
    autoConnect: false, // Don't connect immediately
    withCredentials: true,
});

// Connect when needed
if (typeof window !== 'undefined') {
    socket.connect();
}

// Error handling
socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

export default socket;