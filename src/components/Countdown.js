import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc,updateDoc,arrayUnion } from 'firebase/firestore';
const CountdownTimer = ({auction}) => {
    

  const [countdownDate, setCountdownDate] = useState(auction.duration);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const updateItemsId = async () => {
    try {
      const aucRef = doc(db, "auctions", auction.id);
      await updateDoc(aucRef, { status: "ended"});
      const docRef = doc(db, "Users", auction.highestBidder);
      await updateDoc(docRef, { itemsId: arrayUnion(auction.auction_id) });
      console.log("Firestore document updated successfully.");
    } catch (e) {
      console.error("Error updating Firestore document:", e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (distance <= 0) {
        updateItemsId();
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate, auction.highestBidder, auction.auction_id, db]);
  return (
    <div>
      <h2>Countdown Timer</h2>
      <p>{countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes, {countdown.seconds} seconds</p>
    </div>
  );
};

export default CountdownTimer;
