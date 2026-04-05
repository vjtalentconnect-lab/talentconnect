/**
 * Ensures a strong JWT secret is present before any JWT operations run.
 * Import this module before creating or verifying JWTs to fail fast at startup.
 */
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be set and at least 32 characters long. Set a strong secret in your environment.');
  process.exit(1);
}

export { JWT_SECRET };
