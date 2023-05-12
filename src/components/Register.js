import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from '../config/firebase';
import { collection, doc, setDoc } from "firebase/firestore";



const Register =  ()=> {
   const [email,setEmail] = useState("");
   const [pwd,setPwd] = useState("");
   const [cnfPwd,setcnfPwd] = useState(""); 
   const [error, setError] = useState(""); 
   const {register,name,setName} = useContext(AuthContext);
   
   
   const signUp = async (e) => {
    e.preventDefault();
    try {
      if (cnfPwd !== pwd) {
        setError(true);
      } else {
        await register(email, pwd);
      }
    } catch (err) {
      console.error(err);
    }
  };



    return ( 
        <>
        <form className="register-form" onSubmit={signUp}>
              <input type="text" placeholder="Name"  value={name}
                onChange = {(e)=> setName(e.target.value)}/> 
                <input type="email" placeholder="Email"  value={email} 
                onChange = {(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={pwd}
                 onChange = {(e)=> setPwd(e.target.value)}/>
                   <input type="password" placeholder="Confirm Password" value={cnfPwd}
                 onChange = {(e)=> setcnfPwd(e.target.value)}/>
            <input type="submit" className="login-button email"/>
            
        </form>
        {error && 
        <p>password do not match</p>}
        </>
     );
}

export default Register;