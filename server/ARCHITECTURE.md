# TalentConnect Data Architecture

## Primary Source of Truth
- **Firestore** (via Firebase Admin SDK in `server/lib/firebaseAdmin.js`) is the primary database.
- All production reads and writes go through Firestore collections using the Admin SDK.

## Mongoose Models
- Mongoose models in `server/models/` are **not used for production queries**.
- They serve as schema documentation and for a possible future MongoDB migration.
- Do **not** call Mongoose model methods from controllers; always use `db.collection()` from the Firestore Admin SDK.

## MongoDB Backup (textBackup.js)
- `textBackup.js` writes a best-effort audit copy of writes to MongoDB.
- This backup is **not guaranteed to be restorable** because Firestore string IDs don't align with the `ObjectId` references in the Mongoose schemas.
- Firestore remains the sole source of truth.
- If `MONGODB_URI` is not set, backup writes are skipped silently—this is intentional for development and environments without MongoDB.

## Key Warnings
- Do not rely on MongoDB data for recovery; treat it as an audit trail only.
- Do not use Mongoose model methods in controllers—use Firestore via `db.collection()` from `firebaseAdmin.js`.

## Summary
Firestore is authoritative. MongoDB backups are optional, best-effort audit logs. Mongoose models are reference-only.
