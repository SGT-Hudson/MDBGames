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

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const userData = await createUserDocument(result.user);
  return userData;
};

export const registerWithEmail = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const logInWithEmail = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
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
  if (!userId) return;
  let bestPath = outPath;
  let uid = userId;
  try {
    const bestClickPathRef = doc(db, 'bestclickpath', `${initActorID}`);
    const snapShot = await getDoc(bestClickPathRef);

    if (snapShot.exists()) {
      if (snapShot.data()[endActorID]) {
        const path = snapShot.data()[endActorID].path;
        const storedUid = snapShot.data()[endActorID].uid;
        if (path.length <= outPath.length) {
          bestPath = path;
          uid = storedUid;
        }
      } else {
        await setDoc(bestClickPathRef, {
          [endActorID]: {
            path: outPath,
            uid,
          },
        });
      }
    } else {
      await setDoc(bestClickPathRef, {
        [endActorID]: {
          path: outPath,
          uid,
        },
      });
    }
  } catch (error) {
    console.log('Error getting best click path', error.message);
  }

  // get the info from the user and return the best path
  try {
    const userData = await getUserDocument(uid);
    const name = userData.name;
    return {
      bestPath,
      name,
    };
  } catch (error) {
    console.log('Error getting user', error.message);
    return 1;
  }
};
