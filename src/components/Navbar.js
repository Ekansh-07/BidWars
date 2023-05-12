import React, { useContext, useEffect, useState } from "react";
import {Link, redirect, useNavigate } from "react-router-dom";
import "../css/nav.css"; 
import logo from "../images/logo.jpg"
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import { User } from "./User";


const Navbar = () =>{
    const nav = useNavigate(); 
    const {currentUser,logout} = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false); 
    const [showRegister, setShowRegister] = useState(false); 

    const handleLogin = ()=>{
        setShowLogin(true); 
        setShowRegister(false); 
    }

    const handleRegister = ()=>{
        setShowLogin(false); 
        setShowRegister(true); 
        
    }

    
    const handleLogout = ()=>{
        
       logout(); 
        
    }
    useEffect(
        ()=>{
            
            setShowRegister(false); 

            setShowLogin(false); 
            nav("/"); 
        }
        , [currentUser]
    )

    const handleUser = () =>{
        nav("/profile"); 
    }

    return (
       <div className="nav">
            <div className="nav-home">
                <img clssName="nav-logo" src={logo} alt=""/>
                <h3><Link to="/">Bids</Link></h3>
                <Link to="/auction"> <h3>Auction</h3></Link>
            </div>
            
            <div className="nav-log">
           
           {currentUser ? 
            <>
            <button type="button" onClick={handleUser} >Profile</button>
            <button type="button" onClick={handleLogout} >logout</button>
            </>:
            <>
            <Link to="/"> <button type="button" onClick={handleLogin} >Login</button></Link>
                    <Link to="/register"><button type="button" onClick={handleRegister}>Register</button></Link>
                    </>
}
     {showLogin && <Login/>}
            </div>
            
           
           
           
            
        </div>
       

    );
}

export default Navbar; 