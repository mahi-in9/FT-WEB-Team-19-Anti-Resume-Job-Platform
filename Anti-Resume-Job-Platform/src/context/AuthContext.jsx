import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "../utils/api/firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email, displayName } = firebaseUser;
        const userDoc = await getDoc(doc(db, "users", uid));
        const userRole = userDoc.exists() ? userDoc.data().role : "candidate";

        const formattedUser = {
          uid,
          email,
          name: displayName || "User",
          role: userRole,
        };
        setUser(formattedUser);
        setRole(userRole);
        localStorage.setItem("antiResumeUser", JSON.stringify(formattedUser));
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("antiResumeUser");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // 🧩 Sign Up with role
  const signup = async (email, password, name, role = "candidate") => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCred.user, { displayName: name });
    await setDoc(doc(db, "users", userCred.user.uid), { email, name, role });
    setUser({ uid: userCred.user.uid, email, name, role });
    setRole(role);
  };

  // 🔐 Login
  const login = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
    const userRole = userDoc.exists() ? userDoc.data().role : "candidate";
    const loggedUser = {
      uid: userCred.user.uid,
      email: userCred.user.email,
      name: userCred.user.displayName || "User",
      role: userRole,
    };
    setUser(loggedUser);
    setRole(userRole);
    localStorage.setItem("antiResumeUser", JSON.stringify(loggedUser));
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    localStorage.removeItem("antiResumeUser");
  };

  const value = {
    user,
    role,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
