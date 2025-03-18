// src/services/db.js
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { app } from "@/services/firebase";

const db = getFirestore(app);



// Generic function to add a document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const colRef = collection(db, collectionName);
    const docRef = doc(colRef); // generates a new document reference
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id; // Return the ID of the new document
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error(`Failed to add document to ${collectionName}`);
  }
};

// Generic function to update a document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error(
      `Error updating document in ${collectionName} with docId ${docId}:`,
      error
    );
    throw error(`Failed to update document in ${collectionName}`);
  }
};

// Generic function to get documents from a collection
export const getDocuments = async (collectionName, constraints = []) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, ...constraints);
    const querySnapshot = await getDocs(q);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error(`Failed to retrieve documents from ${collectionName}`);
  }
};

// Generic function to get a document by ID
export const getDocumentById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null; // Document not found
    }
  } catch (error) {
    console.error(
      `Error getting document from ${collectionName} with docId ${docId}:`,
      error
    );
    throw error(`Failed to retrieve document from ${collectionName}`);
  }
};

// Generic function to delete a document
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(
      `Error deleting document from ${collectionName} with docId ${docId}:`,
      error
    );
    throw error(`Failed to delete document from ${collectionName}`);
  }
};


// Create a user profile in Firestore
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error(`Error creating user profile for userId ${userId}:`, error);
    throw error("Failed to create user profile");
  }
};

// Get user profile from Firestore
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error(`Error getting user profile for userId ${userId}:`, error);
    throw error("Failed to retrieve user profile");
  }
};

// Update user profile in Firestore
export const updateUserProfileInDB = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error(`Error updating user profile for userId ${userId}:`, error);
    throw error("Failed to update user profile");
  }
};


export default db;
