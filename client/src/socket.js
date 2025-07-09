import { io } from 'socket.io-client';
const URL = "https://whiteboard-backend-iw3p.onrender.com"; 
export const socket = io(URL, {
  autoConnect: false
});