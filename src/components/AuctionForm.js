import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

import "react-datetime/css/react-datetime.css";

const categories = [
  { value: "Coins", label: "Coins" },
  { value: "Paintings", label: "Paintings" },
  { value: "Antique", label: "Antique" },
  { value: "Sculpture", label: "Sculpture" },
  { value: "Other", label: "Other" },
];

function AuctionForm({setAuction}) {

  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const itemTitleRef = useRef(null);
  const itemDescRef = useRef(null);
  const startPriceRef = useRef(null);
  const itemImageRef = useRef(null);
  const itemCategoryRef = useRef(null); 
  const duration = useRef(null); 


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError(null);

    const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const selectedImg = itemImageRef.current.files[0];

    if (!selectedImg || !imgTypes.includes(selectedImg.type)) {
      return setError('Please select a valid image');
    }

    let now = new Date();
    let time = duration.current.value * 60 * 60 * 1000
    const dueDate = now.getTime() + time;
    if (dueDate < now.getTime()) {
      return setError('Please select a future date');
    }

    


    const newAuction = {
      auction_id: uuidv4(),
      email: currentUser.email,
      title: itemTitleRef.current.value,
      desc: itemDescRef.current.value,
      curPrice: startPriceRef.current.value,
      duration: dueDate , 
      itemImage: selectedImg,
      itemCategory: itemCategoryRef.current.value ,
      status: "live",
      highestBidder : ""
    };

    setAuction(newAuction);
   
  };
  return (
    <>
      <header>
        <h1>Fill this Form</h1>
      </header>
      <form className="auction-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" ref={itemTitleRef} required />
        </label>
        <label>
          Description:
          <input type="text" ref={itemDescRef} required />
        </label>
        <label>
          Price:
          <input type="number" ref={startPriceRef} required />
        </label>
        <label>
          Image:
          <input type="file" ref={itemImageRef} required />
        </label>
        <label>
          Category:
          <select ref={itemCategoryRef}>
            {categories.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <br/>
        <label>
          End time in hours:
         <input type='number' step='any' name = 'hours' ref={duration}/>
         </label>
        <button type="submit">Submit</button>
      </form>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default AuctionForm;
