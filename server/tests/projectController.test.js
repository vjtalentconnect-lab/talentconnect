import { describe, it, expect, vi, beforeEach } from 'vitest';

// ========== CRITICAL: All vi.mock() at TOP LEVEL with factory functions ==========

vi.mock('../lib/firebaseAdmin.js', () => ({
  db: {
    collection: vi.fn(),
  },
}));

vi.mock('../lib/textBackup.js', () => ({
  addWithBackup: vi.fn(),
  updateWithBackup: vi.fn().mockResolvedValue(),
  setWithBackup: vi.fn().mockResolvedValue(),
}));

vi.mock('../socket.js', () => ({
  sendNotification: vi.fn().mockResolvedValue(),
  broadcastAdminEvent: vi.fn().mockResolvedValue(),
  broadcastProjectCreated: vi.fn().mockResolvedValue(),
}));

// ========== NOW import controller and dependencies ==========

import {
  createProject,
  applyToProject,
  updateApplicationStatus,
  scheduleAudition
} from '../controllers/projectController.js';
import { db } from '../lib/firebaseAdmin.js';
import { addWithBackup, updateWithBackup } from '../lib/textBackup.js';

describe('Project Controller Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createProject function', () => {
    it('should create a new project successfully', async () => {
      addWithBackup.mockResolvedValue({ id: 'new-project-id' });

      const mockReq = {
        user: { id: 'director-id', email: 'director@example.com' },
        body: {
          title: 'Test Project',
          description: 'Test description',
          category: 'Film',
          requirements: 'Test requirements',
          budget: '$1000',
          location: 'New York',
          deadline: '2024-12-31',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await createProject(mockReq, mockRes);

      // Verify successful response
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should handle creation errors', async () => {
      addWithBackup.mockRejectedValue(new Error('Database error'));

      const mockReq = {
        user: { id: 'director-id' },
        body: { title: 'Test Project' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await createProject(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('should validate required fields', async () => {
      const mockReq = {
        user: { id: 'director-id' },
        body: {
          // missing required title field
          description: 'Test description',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await createProject(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('applyToProject function', () => {
    it('should apply to project successfully', async () => {
      addWithBackup.mockResolvedValue({ id: 'new-app-id' });

      // Mock Firestore project check
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({
              id: 'project-id',
              title: 'Test Project',
              director: 'director-id',
              status: 'open',
            }),
          }),
        }),
        where: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue({
              empty: true,
              docs: [],
            }),
          }),
        }),
      });

      const mockReq = {
        user: { id: 'talent-id', email: 'talent@example.com' },
        params: { id: 'project-id' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await applyToProject(mockReq, mockRes);

      // Verify response
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should handle project not found', async () => {
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: false,
          }),
        }),
      });

      const mockReq = {
        user: { id: 'talent-id' },
        params: { id: 'nonexistent-project' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await applyToProject(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('should prevent duplicate applications', async () => {
      // Mock project exists but application already exists
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({ id: 'project-id', status: 'open' }),
          }),
        }),
        where: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue({
              empty: false,
              docs: [{ id: 'existing-app' }],
            }),
          }),
        }),
      });

      const mockReq = {
        user: { id: 'talent-id' },
        params: { id: 'project-id' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await applyToProject(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('updateApplicationStatus function', () => {
    it('should update application status successfully', async () => {
      updateWithBackup.mockResolvedValue();

      db.collection.mockImplementation((collectionName) => {
        if (collectionName === 'applications') {
          return {
            doc: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({
                exists: true,
                data: () => ({
                  id: 'app-id',
                  project: 'project-id',
                  talent: 'talent-id',
                  status: 'applied',
                }),
              }),
            }),
          };
        } else if (collectionName === 'projects') {
          return {
            doc: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({
                exists: true,
                data: () => ({
                  id: 'project-id',
                  director: 'director-id',
                  title: 'Test Project',
                }),
              }),
            }),
          };
        } else if (collectionName === 'users') {
          return {
            doc: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({
                exists: true,
                data: () => ({
                  email: 'talent@example.com',
                }),
              }),
            }),
          };
        } else if (collectionName === 'profiles') {
          return {
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                get: vi.fn().mockResolvedValue({
                  empty: false,
                  docs: [{
                    data: () => ({
                      fullName: 'Test Talent',
                    }),
                  }],
                }),
              }),
            }),
          };
        } else if (collectionName === 'notifications') {
          return {
            doc: vi.fn().mockReturnValue({
              set: vi.fn().mockResolvedValue(),
            }),
          };
        }
        return {};
      });

      const mockReq = {
        user: { id: 'director-id' },
        params: { appId: 'app-id' },
        body: { status: 'shortlisted' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await updateApplicationStatus(mockReq, mockRes);

      expect([200, 201]).toContain(mockRes.status.mock.calls[0][0]);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should reject invalid status', async () => {
      const mockReq = {
        user: { id: 'director-id' },
        params: { appId: 'app-id' },
        body: { status: 'invalid-status' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await updateApplicationStatus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('should handle unauthorized access', async () => {
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({
              id: 'app-id',
              director: 'different-director-id',
            }),
          }),
        }),
      });

      const mockReq = {
        user: { id: 'wrong-director-id' },
        params: { appId: 'app-id' },
        body: { status: 'shortlisted' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await updateApplicationStatus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should handle application not found', async () => {
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: false,
          }),
        }),
      });

      const mockReq = {
        user: { id: 'director-id' },
        params: { appId: 'nonexistent-app' },
        body: { status: 'shortlisted' },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await updateApplicationStatus(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe('scheduleAudition function', () => {
    it('should schedule audition successfully', async () => {
      updateWithBackup.mockResolvedValue();

      db.collection.mockImplementation((collectionName) => {
        if (collectionName === 'applications') {
          return {
            doc: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({
                exists: true,
                data: () => ({
                  id: 'app-id',
                  project: 'project-id',
                  talent: 'talent-id',
                  status: 'applied',
                }),
              }),
            }),
          };
        } else if (collectionName === 'projects') {
          return {
            doc: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({
                exists: true,
                data: () => ({
                  id: 'project-id',
                  director: 'director-id',
                  title: 'Test Project',
                }),
              }),
            }),
          };
        } else if (collectionName === 'users') {
          return {
            doc: vi.fn().mockReturnValue({
              get: vi.fn().mockResolvedValue({
                exists: true,
                data: () => ({
                  email: 'talent@example.com',
                }),
              }),
            }),
          };
        } else if (collectionName === 'profiles') {
          return {
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                get: vi.fn().mockResolvedValue({
                  empty: false,
                  docs: [{
                    data: () => ({
                      fullName: 'Test Talent',
                    }),
                  }],
                }),
              }),
            }),
          };
        }
        return {};
      });

      const mockReq = {
        user: { id: 'director-id' },
        params: { appId: 'app-id' },
        body: {
          auditionDate: '2026-12-25T10:00:00Z',
          auditionLocation: 'Studio A',
          auditionNotes: 'Please prepare a monologue',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await scheduleAudition(mockReq, mockRes);

      expect([200, 201]).toContain(mockRes.status.mock.calls[0][0]);
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should handle unauthorized access', async () => {
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({
              id: 'app-id',
              director: 'different-director-id',
            }),
          }),
        }),
      });

      const mockReq = {
        user: { id: 'wrong-director-id' },
        params: { appId: 'app-id' },
        body: {
          auditionDate: '2026-12-25T10:00:00Z',
          auditionLocation: 'Studio A',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await scheduleAudition(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should handle application not found', async () => {
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: false,
          }),
        }),
      });

      const mockReq = {
        user: { id: 'director-id' },
        params: { appId: 'nonexistent-app' },
        body: {
          auditionDate: '2024-12-25T10:00:00Z',
          auditionLocation: 'Studio A',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await scheduleAudition(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('should validate audition date', async () => {
      db.collection.mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({
              id: 'app-id',
              director: 'director-id',
            }),
          }),
        }),
      });

      const mockReq = {
        user: { id: 'director-id' },
        params: { appId: 'app-id' },
        body: {
          // missing auditionDate
          auditionLocation: 'Studio A',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await scheduleAudition(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalled();
    });
  });
});