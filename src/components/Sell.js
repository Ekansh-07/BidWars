import React, { useContext, useState } from "react";
import { Progress } from "../components/Progress";
import { AuthContext } from "../context/AuthContext";
import AuctionForm from "./AuctionForm";


export const AuctionBody = ()=>{
    const[auction,setAuction] = useState(null);
    const {currentUser} = useContext(AuthContext);
    return(
    < >
     {currentUser && <AuctionForm  setAuction={setAuction}/>}
    {auction && <Progress auction = {auction} setAuction={setAuction}/>}
   
    {!currentUser && <div>
        Kindly Login First
    </div>}
    </>
    ); 
}