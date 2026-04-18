import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL?.replace('/api', '') || window.location.origin;

// We connect manually after attaching auth/user metadata
const socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
});

export default socket;
