import { createContext, useContext, useEffect, useState } from "react";
import { AuthErrorCodes } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { getDocs,getDoc, doc, addDoc, setDoc, collection } from 'firebase/firestore';
export const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
 
   const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assume that 'roles' is a collection in Firestore containing user roles
  async function getUserRole(uid) {
    try {
      // const docRef = doc(db, 'useresinformation', uid);
      // console.log('UID in getUserRole:', uid);
      
      const docSnap = await getDoc(doc(db, 'userinformation', uid));
      console.log(docSnap);
      const userData = docSnap.data();
      console.log(userData);
      if (userData && userData.role){
        console.log(userData.role);
      }
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log('User data found in Firestore:', userData);
        return userData.role;
      } else {
        // Handle the case when the user role document doesn't exist
        console.error("User role not found for UID:", uid);
        return null;
      }
    } catch (error) {
      console.error("Error getting user role:", error.message);
      throw error;
    }
  }
  

  async function logIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);
      // Retrieve the user's role from the database
      const userRole = await getUserRole(user.uid);
      console.log(userRole);
      return userRole;
      
    } catch (error) {
      // Handle login errors
      console.error('Error logging in:', error.message);
      throw error; // Rethrow the error for the caller to handle
    }
  }
  const signUp = async (email, password, firstname, lastname) => {
    setError(""); // Clear any previous errors
  
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result.user);

      const ref = doc(db, "userinformation", result.user.uid);
      const docRef = await setDoc(ref, { email,firstname, lastname, role: 'user',})

      alert("Your data has been added!");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("Email is already in use. Try another email.");
      } else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("Password must be at least 6 characters.");
      } else {
        setError(error.message);
      }
    }
};

  
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userinformation"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isGuest = () => {
    return user && signInAnonymously(user);
  };

  return (
    <userAuthContext.Provider value={{ user,users, logIn, signUp, logOut, isGuest }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
