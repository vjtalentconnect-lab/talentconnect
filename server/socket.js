import { Server } from 'socket.io';

let io;

export const init = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        socket.on('sendMessage', (data) => {
            // data: { sender, receiver, content, createdAt }
            io.to(data.receiver).emit('receiveMessage', data);
            
            // Also notify the receiver about a new message
            io.to(data.receiver).emit('newNotification', {
                type: 'message',
                title: 'New Message',
                message: `You have a new message from ${data.senderName || 'someone'}`,
                link: '/talent/messages'
            });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

export const sendNotification = (userId, notification) => {
    if (io) {
        io.to(userId.toString()).emit('newNotification', notification);
    }
};
