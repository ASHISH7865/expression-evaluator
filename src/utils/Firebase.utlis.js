import {initializeApp} from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {collection, doc, getDoc, getFirestore, setDoc, writeBatch} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyB52ZcVTHwA3riVRtVXkXgTEmjBjoA1Fis",
    authDomain: "simple-calculator-db.firebaseapp.com",
    projectId: "simple-calculator-db",
    storageBucket: "simple-calculator-db.appspot.com",
    messagingSenderId: "936654714987",
    appId: "1:936654714987:web:956269bebde9289d20992e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });


export const auth = getAuth();
export const  signInWithPopupGoogle =()=> signInWithPopup(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromGoogleAuth = async (userAuth, additionalData) => {
    const userDocRef = doc(db , 'user', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {  email} = userAuth;


        try {
            await setDoc(userDocRef, {
                    email,
                    ...additionalData
                }
            );

            console.log('User created : ');
        }catch (error) {
            console.error('Error creating user', error.message);
        }
    }

    return userDocRef;
}

export const createUserAuthFromEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        throw new Error('Please provide an email and password');
    }
    return await createUserWithEmailAndPassword(auth,email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const batch = writeBatch(db)
    const collectionRef = collection(db,collectionKey);
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef , object.uid);
        batch.set(docRef,object);
    });
    await batch.commit();
    console.log('done')
}

export const createCalculatorHistoryDocument = async (uid,email,result) => {
    console.log(uid)
    const userDocRef = doc(db , 'user', uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        console.log('User not found');
    }
    const historyDocRef = doc(db , 'history', uid);
    const historySnapshot = await getDoc(historyDocRef);
    console.log(historySnapshot);
    if (!historySnapshot.exists()) {
        console.log('History not found');
        await addCollectionAndDocuments('history',[{
            uid,
            result: [result],
            createdAt: new Date()
        }]);
    }
    else {
        const history = historySnapshot.data();
        console.log(history);
        history.result.push(result);
        await setDoc(historyDocRef, history);
    }
}
export const getCalculatorHistory = async (uid) => {
    const historyDocRef = doc(db , 'history', uid);
    const historySnapshot = await getDoc(historyDocRef);
    if (!historySnapshot.exists()) {
        return [];
    }
    else {
        return historySnapshot.data();
    }
}

export const getUserData = async (uid) => {
    const userDocRef = doc(db , 'user', uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        return null;
    }
    else {
        return userSnapshot.data();
    }
}
export const updateUserData = async (uid,data) => {
    const userDocRef = doc(db , 'user', uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        return null;
    }
    else {
        await setDoc(userDocRef, data);
    }
}

export {
    signOut
}