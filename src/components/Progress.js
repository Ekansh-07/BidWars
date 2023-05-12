import { useEffect} from "react";

import React from 'react';
import useStorage from "../hooks/useStoraje";

export const Progress = ({auction, setAuction})=>{
    
    const { progress, isCompleted } = useStorage(auction);

    useEffect(() => {
      if (isCompleted) {
        setAuction(null);
      }
    }, [isCompleted, setAuction]);
  
    return(
        <>
        {isCompleted && <div>
        Item is submitted for auction successfully
      </div>}
        </>
    );
    
}