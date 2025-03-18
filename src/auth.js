// src/services/auth.js

import {
  getAuth,
  setPersistence,
  signOut,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/services/firebase";
// Export auth from this file so it can be used in other files
export { auth };

export const loginUser = async (email, password) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

export const updateUserProfile = async (user, profile) => {
  try {
    await updateProfile(user, profile);
    return true;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// getCurrentUser: This function returns the current authenticated user(if one exists) at the moment it's called.
// It uses auth.currentUser, which gives you the current user without needing to subscribe to state changes.
// Note: auth.currentUser is a simple getter that holds the current user at the time the code is run.
// This is not a listener and won't automatically update when the user logs in or out. It gives the user information immediately at the point it's called.

export const getCurrentUser = () => {
  return auth.currentUser;
};

// *****************************************************************************************************
// below is complete code

// src/services/firebase/auth.js
// import app from './firebase';
// import {
//   getAuth,
//   setPersistence,
//   signOut,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   browserSessionPersistence,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   updateProfile
// } from "firebase/auth";

// const auth = getAuth(app);

// export const loginUser = async (email, password) => {
//   try {
//     await setPersistence(auth, browserSessionPersistence);
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error logging in:", error.message);
//     throw error;
//   }
// };

// export const registerUser = async (email, password, displayName) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     // Update profile with display name
//     if (displayName) {
//       await updateProfile(userCredential.user, { displayName });
//     }
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error registering user:", error.message);
//     throw error;
//   }
// };

// export const logoutUser = async () => {
//   try {
//     await signOut(auth);
//     console.log("User logged out successfully");
//   } catch(error) {
//     console.error("Error logging out:", error.message);
//     throw error;
//   }
// };

// export const resetPassword = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     return true;
//   } catch (error) {
//     console.error("Error resetting password:", error.message);
//     throw error;
//   }
// };

// export const updateUserProfile = async (user, profile) => {
//   try {
//     await updateProfile(user, profile);
//     return true;
//   } catch (error) {
//     console.error("Error updating profile:", error.message);
//     throw error;
//   }
// };

// // This function will be used to listen for changes in auth state
// export const onAuthStateChange = (callback) => {
//   return onAuthStateChanged(auth, callback);
// };

// export const getCurrentUser = () => {
//   return auth.currentUser;
// };
// *****************************************************************************************************
