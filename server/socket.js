import { Server } from 'socket.io';

let io;

export const init = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: [process.env.FRONTEND_URL || 'https://talentconnect-6e347.web.app', 'http://localhost:5173'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Client should emit { userId, role }
        socket.on('register', async ({ userId, role }) => {
            if (userId) {
                socket.join(userId.toString());
                console.log(`User ${userId} joined their room`);
                
                // Secure role check: verify from DB instead of trusting client
                try {
                    const { db } = await import('./lib/firebaseAdmin.js');
                    const userDoc = await db.collection('users').doc(userId.toString()).get();
                    if (userDoc.exists && userDoc.data().role === 'admin') {
                        socket.join('admins');
                        console.log(`Verified Admin ${userId} joined admins room`);
                    }
                } catch (err) {
                    console.error('Socket role verification failed:', err);
                }
            }
        });

        // Backwards compatibility
        socket.on('join', (userId) => {
            if (userId) socket.join(userId.toString());
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

export const broadcastAdminEvent = (payload) => {
    if (io) {
        io.to('admins').emit('adminEvent', payload);
    }
};

export const broadcastProjectCreated = (project) => {
    if (io) {
        io.emit('projectCreated', project);
    }
};
