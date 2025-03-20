export const androidCode = `// Assuming you have Firebase initialized in your application
// FirebaseMessaging instance is obtained from the Firebase SDK
FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
    if (!task.isSuccessful) {
        // Handle error
        Log.w("FCM", "Failed to get FCM token", task.exception)
        return@addOnCompleteListener
    }
    
    // Get FCM token
    val fcmToken = task.result
    
    // Store token for later use or send to your server
    // ...
}`;

export const iosCode = `// Assuming you have Firebase initialized in your application
// Messaging instance is obtained from Firebase SDK
Messaging.messaging().token { token, error in
    if let error = error {
        // Handle error
        print("Error fetching FCM token: \\(error)")
        return
    }
    
    if let token = token {
        // Store FCM token for later use or send to your server
        // ...
    }
}`;

export const webCode = `// Import required Firebase modules
import { getMessaging, getToken } from "firebase/messaging";

// Assuming Firebase is already initialized in your application
// Get messaging instance from Firebase
const messaging = getMessaging();

try {
    // Get registration token with your VAPID key
    // Initially this makes a network call, subsequent calls return
    const currentToken = await getToken(messaging, {
        vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE'
    });
    
    if (currentToken) {
        // Store FCM token for later use
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
} catch (err) {
    console.error('An error occurred while retrieving token:', err);
    // Handle error appropriately
    // ...
}`;
