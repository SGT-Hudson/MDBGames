// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Each auth helper lets Firebase errors propagate so the caller (Login) can
// surface a message to the user instead of navigating on a failed sign-in.
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return createUserDocument(result.user);
};

// Popups are unreliable on mobile browsers (blocked / not supported), so we
// fall back to a full-page redirect flow on those devices.
export const signInWithGoogleRedirect = async () => {
  await signInWithRedirect(auth, provider);
};

export const getGoogleRedirectResult = async () => {
  const result = await getRedirectResult(auth);
  if (!result) return null;
  return createUserDocument(result.user);
};

export const registerWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return createUserDocument(result.user);
};

export const logInWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return createUserDocument(result.user);
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};

//-----------------------------------------------------//

// create a document in the users collection in firestore
export const createUserDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', userAuth.uid);
  try {
    let snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
      const { email } = userAuth;
      const createdAt = new Date();
      if (userAuth.displayName === null) {
        userAuth.displayName = userAuth.email.substring(
          0,
          userAuth.email.lastIndexOf('@')
        );
      }
      const newUser = {
        name: userAuth.displayName,
        email,
        createdAt,
        timePlayed: [],
        clicks: [],
        wins: 0,
        fails: 0,
      };
      await setDoc(userRef, newUser);
      return getUserDocument(userAuth.uid);
    }
    return snapShot.data();
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getUserDocument = async (userId) => {
  if (!userId) return;

  const userRef = doc(db, 'users', userId);
  const snapShot = await getDoc(userRef);

  if (snapShot.exists()) {
    return snapShot.data();
  }
  return null;
};

export const updateUserStats = async (userAuth, data) => {
  if (!userAuth) return;
  const userRef = doc(db, 'users', userAuth.uid);
  const snapShot = await getDoc(userRef);

  const { timePlayed, clicks, wins, fails } = snapShot.data();

  const newTimePlayed = [...timePlayed, data.timePlayed];
  const newClicks = [...clicks, data.clicks];
  const newWins = wins + data.wins;
  const newFails = fails + data.fails;

  try {
    await updateDoc(userRef, {
      timePlayed: newTimePlayed,
      clicks: newClicks,
      wins: newWins,
      fails: newFails,
    });
  } catch (error) {
    console.log('Error updating user', error.message);
  }

  return await getUserDocument(userAuth.uid);
};

export const getBestClickPath = async (
  userId,
  initActorID,
  endActorID,
  outPath
) => {
  // Always return a consistent shape so the UI can destructure safely.
  if (!userId) return { bestPath: outPath, name: null };

  let bestPath = outPath;
  // The current player's own name (reading our own user doc is always allowed
  // by the security rules — we never read other users' documents here).
  let bestName = null;
  try {
    const me = await getUserDocument(userId);
    bestName = me ? me.name : null;
  } catch (error) {
    console.log('Error getting current user', error.message);
  }

  // A "give up" run has no path to compare against or store.
  if (!outPath) {
    return { bestPath: null, name: bestName };
  }

  try {
    const bestClickPathRef = doc(db, 'bestclickpath', `${initActorID}`);
    const snapShot = await getDoc(bestClickPathRef);
    const stored = snapShot.exists() ? snapShot.data()[endActorID] : null;

    if (stored && stored.path && stored.path.length <= outPath.length) {
      // An existing record is as good or better — show it. The owner's name is
      // stored alongside the path, so we don't need to read their profile.
      bestPath = stored.path;
      bestName = stored.name || bestName;
    } else {
      // Our run is the new best — save it. `merge` preserves the records for
      // other destination actors stored in the same document.
      await setDoc(
        bestClickPathRef,
        {
          [endActorID]: {
            path: outPath,
            uid: userId,
            name: bestName,
          },
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.log('Error getting best click path', error.message);
  }

  return { bestPath, name: bestName };
};
