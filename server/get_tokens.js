import { auth, db } from './lib/firebaseAdmin.js';

async function checkDeepu() {
    try {
        const user = await auth.getUserByEmail('deepu@gmail.com').catch(() => null);
        if (user) {
            console.log(`Deepu exists in Firebase Auth with UID: ${user.uid}`);
            const userDoc = await db.collection('users').doc(user.uid).get();
            if (!userDoc.exists) {
                console.log('Deepu has NO Firestore document. Deleting from Auth to allow re-registration...');
                await auth.deleteUser(user.uid);
                console.log('Deepu deleted from Firebase Auth.');
            } else {
                console.log('Deepu HAS a Firestore document.');
            }
        } else {
            console.log('Deepu does NOT exist in Firebase Auth.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
    process.exit(0);
}

checkDeepu();
