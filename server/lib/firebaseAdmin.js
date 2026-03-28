import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount;
try {
    if (process.env.FIREBASE_ADMIN_KEY && process.env.FIREBASE_ADMIN_KEY !== 'your_admin_key_json_string') {
        let rawKey = process.env.FIREBASE_ADMIN_KEY;
        if (rawKey.startsWith("'") && rawKey.endsWith("'")) {
            rawKey = rawKey.slice(1, -1);
        }
        serviceAccount = JSON.parse(rawKey);
        if (serviceAccount && serviceAccount.private_key) {
            serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }
    }
} catch (error) {
    console.error('CRITICAL: Error parsing FIREBASE_ADMIN_KEY. Ensure it is a valid JSON string.');
}

if (!admin.apps.length) {
    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('Firebase Admin initialized successfully');
    } else {
        console.error('CRITICAL: Firebase Admin could not be initialized. Missing or invalid FIREBASE_ADMIN_KEY.');
    }
}

let db, storage, auth;

if (admin.apps.length > 0) {
    db = admin.firestore();
    storage = admin.storage();
    auth = admin.auth();
}

export { db, storage, auth, admin };
