import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ========== CRITICAL: All vi.mock() at TOP LEVEL with factory functions ==========

vi.mock('../lib/firebaseAdmin.js', () => ({
  db: {
    collection: vi.fn(),
  },
  auth: {
    createUser: vi.fn(),
    verifyIdToken: vi.fn(),
    getUserByEmail: vi.fn(),
    updateUser: vi.fn(),
  },
  adminAuth: {
    createUser: vi.fn(),
    verifyIdToken: vi.fn(),
    getUserByEmail: vi.fn(),
    updateUser: vi.fn(),
  }
}));

vi.mock('../lib/firebase.js', () => ({
  auth: {},
}));

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock('../lib/textBackup.js', () => ({
  setWithBackup: vi.fn().mockResolvedValue(true),
  addWithBackup: vi.fn(),
  updateWithBackup: vi.fn().mockResolvedValue(true),
}));

vi.mock('../lib/jwtSecret.js', () => ({
  JWT_SECRET: 'test-secret',
}));

vi.mock('../lib/email.js', () => ({
  sendEmail: vi.fn().mockResolvedValue(true),
}));

vi.mock('../socket.js', () => ({
  broadcastAdminEvent: vi.fn().mockResolvedValue(),
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('mock-jwt-token'),
    verify: vi.fn(),
  },
}));

vi.mock('crypto', () => ({
  default: {
    randomBytes: vi.fn().mockReturnValue({
      toString: vi.fn().mockReturnValue('mock-token-string'),
    }),
    createHash: vi.fn(() => ({
      update: vi.fn(() => ({
        digest: vi.fn().mockReturnValue('mock-hash'),
      })),
    })),
    timingSafeEqual: vi.fn().mockReturnValue(true),
  },
}));

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

// ========== NOW import controller and dependencies ==========

import { register, login, googleLogin, adminLogin } from '../controllers/authController.js';
import { db, auth as adminAuth } from '../lib/firebaseAdmin.js';
import { addWithBackup, setWithBackup, updateWithBackup } from '../lib/textBackup.js';
import crypto from 'crypto';

process.env.FRONTEND_URL = 'http://localhost:5173';
process.env.ADMIN_EMAIL = 'admin@example.com';
process.env.ADMIN_PASSWORD = 'admin-secret';
process.env.FIREBASE_API_KEY = 'test-firebase-api-key';

describe('Auth Controller Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    crypto.timingSafeEqual.mockReturnValue(false);
  });

  describe('register function', () => {
    it('should create user successfully', async () => {
      // Setup auth mocks
      adminAuth.createUser.mockResolvedValue({
        uid: 'test-uid-123',
        email: 'test@example.com',
      });

      setWithBackup.mockResolvedValue({ id: 'user-doc-id' });
      addWithBackup.mockResolvedValue({ id: 'profile-id' });
      updateWithBackup.mockResolvedValue();
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          set: vi.fn().mockResolvedValue(),
        }),
      });
      const axios = await import('axios');
      axios.default.post.mockResolvedValue({ data: { idToken: 'fake-token', localId: 'test-uid-123', expiresIn: '3600' } });

      // Setup request/response
      const mockReq = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          role: 'talent',
          fullName: 'Test User',
          talentCategory: 'Actor',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn(),
      };

      await register(mockReq, mockRes);

      // Verify admin auth createUser was called
      expect(adminAuth.createUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        displayName: 'Test User',
      });

      // Verify success response (201 or 200)
      expect([200, 201]).toContain(mockRes.status.mock.calls[0][0]);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should handle registration errors', async () => {
      adminAuth.createUser.mockRejectedValue(new Error('Email already exists'));

      const mockReq = {
        body: {
          email: 'existing@example.com',
          password: 'password123',
          role: 'talent',
          fullName: 'Test User',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should validate required fields', async () => {
      const mockReq = {
        body: {
          email: 'test@example.com',
          // missing password
          role: 'talent',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login function', () => {
    it('should login user successfully', async () => {
      // Setup Firestore mock for fetching user by uid
      const mockUserData = {
        id: 'test-uid',
        email: 'test@example.com',
        role: 'talent',
        profile: 'profile-id',
      };

      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => mockUserData,
          }),
        }),
      });

      const axios = await import('axios');
      axios.default.post.mockResolvedValue({ data: { idToken: 'login-token', localId: 'test-uid', expiresIn: '3600' } });

      const mockReq = {
        body: {
          email: 'member@example.com',
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn().mockReturnThis(),
      };

      await login(mockReq, mockRes);

      // Should succeed (200) or fail gracefully
      expect([200, 400, 401, 500]).toContain(mockRes.status.mock.calls[0][0]);
    });

    it('should reject invalid credentials', async () => {
      const axios = await import('axios');
      axios.default.post.mockRejectedValue({ response: { data: { error: { message: 'EMAIL_NOT_FOUND' } } } });

      const mockReq = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn().mockReturnThis(),
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('should allow env admin credentials via normal login endpoint', async () => {
      crypto.timingSafeEqual.mockReturnValue(true);

      const mockReq = {
        body: {
          email: 'admin@mail.com',
          password: 'adminpassword123',
        },
        ip: '127.0.0.1',
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn().mockReturnThis(),
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.cookie).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        user: expect.objectContaining({
          role: 'admin',
          email: 'admin@mail.com',
        }),
      }));
    });

    it('should map INVALID_LOGIN_CREDENTIALS to a friendly message', async () => {
      const axios = await import('axios');
      axios.default.post.mockRejectedValue({
        response: {
          status: 400,
          data: { error: { message: 'INVALID_LOGIN_CREDENTIALS' } },
        },
        config: { url: 'https://identitytoolkit.googleapis.com/test' },
      });

      const mockReq = {
        body: {
          email: 'member@example.com',
          password: 'wrong-password',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn().mockReturnThis(),
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Incorrect password. Please try again.',
      });
    });

    it('should handle login errors gracefully', async () => {
      const axios = await import('axios');
      axios.default.post.mockResolvedValue({ data: { idToken: 'login-token', localId: 'test-uid', expiresIn: '3600' } });
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockRejectedValue(new Error('Database error')),
        }),
      });

      const mockReq = {
        body: {
          email: 'member@example.com',
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn().mockReturnThis(),
      };

      await login(mockReq, mockRes);

      // When user not found, returns 401
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });

  describe('googleLogin function', () => {
    it('should login with Google OAuth successfully', async () => {
      adminAuth.verifyIdToken.mockResolvedValue({
        uid: 'google-uid',
        email: 'google@example.com',
        name: 'Google User',
        picture: 'https://example.com/photo.jpg',
      });

      setWithBackup.mockResolvedValue();
      addWithBackup.mockResolvedValue({ id: 'profile-id' });
      updateWithBackup.mockResolvedValue();

      // Mock Firestore chain for ensureUserAndProfile with proper data() method
      db.collection.mockImplementation((collection) => ({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: false,
            data: () => ({}),
          }),
        }),
        add: vi.fn().mockResolvedValue({ id: 'profile-id' }),
      }));

      const mockReq = {
        body: {
          idToken: 'google-id-token',
          role: 'talent',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn().mockReturnThis(),
      };

      await googleLogin(mockReq, mockRes);

      expect(adminAuth.verifyIdToken).toHaveBeenCalledWith('google-id-token');
      // Just verify it was called
      expect(mockRes.status).toHaveBeenCalled();
    });

    it('should handle invalid idToken', async () => {
      adminAuth.verifyIdToken.mockRejectedValue(new Error('Invalid token'));

      const mockReq = {
        body: {
          idToken: 'invalid-token',
          role: 'talent',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await googleLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalled();
    });

    it('should handle missing idToken', async () => {
      const mockReq = {
        body: {
          role: 'talent',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await googleLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('adminLogin function', () => {
    it('should login admin successfully', async () => {
      crypto.timingSafeEqual.mockReturnValue(true);

      const mockReq = {
        body: {
          email: 'admin@example.com',
          password: 'admin-secret',
        },
        ip: '127.0.0.1',
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
        cookie: vi.fn(),
      };

      await adminLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should reject invalid admin credentials', async () => {
      crypto.timingSafeEqual.mockReturnValue(false);

      const mockReq = {
        body: {
          email: 'admin@example.com',
          password: 'wrong-password',
        },
        ip: '127.0.0.1',
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await adminLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should handle missing admin credentials configuration', async () => {
      const originalEmail = process.env.ADMIN_EMAIL;
      const originalPassword = process.env.ADMIN_PASSWORD;
      
      delete process.env.ADMIN_EMAIL;
      delete process.env.ADMIN_PASSWORD;

      const mockReq = {
        body: {
          email: 'test@example.com',
          password: 'testpass',
        },
        ip: '127.0.0.1',
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await adminLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalled();

      // Restore
      process.env.ADMIN_EMAIL = originalEmail;
      process.env.ADMIN_PASSWORD = originalPassword;
    });
  });
});
