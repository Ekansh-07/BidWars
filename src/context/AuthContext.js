
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useState ,useEffect} from "react";
import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { auth} from "../config/firebase";

export const AuthContext = createContext();

export const AuthContextProvider  = ({children})=>{
  const [name,setName] = useState(""); 
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


    const [currentUser,setCurrentUser] = useState(null); 
    
    const register = (email,password)=>{
        
       createUserWithEmailAndPassword(auth,email,password).then(
        ()=>{
            return signInWithEmailAndPassword(auth,email,password); 

        }
       ); 

    }

    const login = (email,pwd)=>{
        return  signInWithEmailAndPassword(auth,email,pwd); 
           
    }

    const logout = ()=>{
        return signOut(auth);
    }

    useEffect(()=>{
      onAuthStateChanged(auth, async (user) => {
        console.log(name)
        setIsLoading(false);
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
           user.displayName = name; 
            const userData = {
              id : user.uid, 
              name: name,
              email: user.email,
              itemsId: [],
            };
            await setDoc(docRef, userData);
  
            setUserData(userData);
          }
        }
        setCurrentUser(user);
      });}, []
    );
   

    return (
        <AuthContext.Provider
        value={
            {
                register,
                login,
                logout,
                currentUser,
                name,
                setName
            }
        }
        >
           {children}
        </AuthContext.Provider>
    );
}