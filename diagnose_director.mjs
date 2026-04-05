import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'server', '.env') });

let serviceAccount;
try {
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
    if (serviceAccount && serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
} catch (e) {
    console.error('Error parsing FIREBASE_ADMIN_KEY:', e.message);
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const userId = process.env.USER_ID || process.argv[2];

if (!userId) {
    throw new Error('USER_ID is required (set USER_ID env or pass as first argument)');
}

async function diagnose() {
    console.log(`Diagnosing user: ${userId}`);
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
        console.log('User document NOT found in "users" collection.');
    } else {
        console.log('User document found:', JSON.stringify(userDoc.data(), null, 2));
    }

    const profilesByUserId = await db.collection('profiles').where('user', '==', userId).get();
    if (profilesByUserId.empty) {
        console.log('No profile found in "profiles" collection where "user" == userId.');
        
        // Let's try searching by any field that might be the user ID
        const allProfilesSnap = await db.collection('profiles').limit(10).get();
        console.log('Sample profiles (first 10):');
        allProfilesSnap.forEach(doc => {
            console.log(`- ${doc.id}: user field type is ${typeof doc.data().user}, value is ${JSON.stringify(doc.data().user)}`);
        });
    } else {
        console.log(`Found ${profilesByUserId.size} profiles by user ID:`);
        profilesByUserId.forEach(doc => console.log(`- ${doc.id}:`, JSON.stringify(doc.data(), null, 2)));
    }

    if (userDoc.exists && userDoc.data().profile) {
        const profileId = userDoc.data().profile;
        console.log(`Checking profile by ID from user document: ${profileId}`);
        const profileDoc = await db.collection('profiles').doc(profileId).get();
        if (!profileDoc.exists) {
            console.log('Profile document NOT found by ID.');
        } else {
            console.log('Profile document found by ID:', JSON.stringify(profileDoc.data(), null, 2));
        }
    }
}

diagnose().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});
