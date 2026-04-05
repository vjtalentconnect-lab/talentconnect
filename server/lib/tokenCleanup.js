import { db } from './firebaseAdmin.js';

export const cleanupExpiredTokens = async () => {
  const now = new Date().toISOString();
  let deletedCount = 0;
  try {
    for (const collection of ['emailVerifications', 'passwordResets']) {
      const expired = await db.collection(collection)
        .where('expiresAt', '<', now)
        .limit(500)
        .get();
      if (expired.empty) continue;
      const batch = db.batch();
      expired.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      deletedCount += expired.size;
      console.info('[Cleanup]', expired.size, 'expired tokens deleted from', collection);
    }
  } catch (err) {
    console.error('[Cleanup] Token cleanup failed:', err.message);
  }
  return deletedCount;
};

export const scheduleTokenCleanup = () => {
  // Run immediately on startup (catches any backlog)
  cleanupExpiredTokens();
  // Then run every hour
  const HOUR = 60 * 60 * 1000;
  setInterval(cleanupExpiredTokens, HOUR);
  console.info('[Cleanup] Token cleanup scheduled every hour');
};
