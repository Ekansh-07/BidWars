import { useState,useContext } from "react";
import React from 'react';
import { AuthContext } from "../context/AuthContext";

const Login =  ()=> {
 
    const [email,setEmail] = useState(""); 
    const [pwd,setPwd] = useState(""); 
    const {login} = useContext(AuthContext);

    const handleSubmit = (e)=>{
        e.preventDefault()
       login(email,pwd)
    .catch(
        (error)=> console.log(error)
    )
        
    }

    return ( 
        <form className="login-form" onSubmit={handleSubmit}>
           <input id = "email" type="email" 
           placeholder="Email" required  onChange={
            (e)=>setEmail(e.target.value)
            }/>
           <input id = "pwd" placeholder="Password" type="password" required
           onChange={
            (e)=>setPwd(e.target.value)}/>
            <input type="submit"/>
        </form>

     );
}

export default Login;