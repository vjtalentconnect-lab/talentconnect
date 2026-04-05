// Security model: All room memberships are derived server-side from the verified token.
// Clients cannot request to join arbitrary rooms; joins are automatic after auth.
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

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
            if (!token) return next(new Error('Authentication required'));

            const { auth, db } = await import('./lib/firebaseAdmin.js');
            let userId, userRole;
            try {
                const decoded = await auth.verifyIdToken(token);
                userId = decoded.uid;
                const userDoc = await db.collection('users').doc(userId).get();
                if (!userDoc.exists) return next(new Error('User not found'));
                userRole = userDoc.data().role;
            } catch {
                const jwt = (await import('jsonwebtoken')).default;
                const { JWT_SECRET } = await import('./lib/jwtSecret.js');
                const decoded = jwt.verify(token, JWT_SECRET);
                userId = decoded.id;
                userRole = decoded.role;
            }

            socket.userId = userId;
            socket.userRole = userRole;
            next();
        } catch (err) {
            next(new Error('Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        socket.join(socket.userId);
        if (socket.userRole === 'admin') {
            socket.join('admins');
        }
        console.log('Socket authenticated:', socket.userId, 'role:', socket.userRole);

        socket.on('sendMessage', (data) => {
            if (data.sender !== socket.userId) {
                socket.emit('error', { message: 'Cannot send messages as another user' });
                return;
            }
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
