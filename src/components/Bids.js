import { useState,useEffect, useContext } from "react";
import { collection,getDocs, doc,updateDoc, arrayUnion, deleteDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import "../css/bids.css"
import { AuthContext } from "../context/AuthContext";
import CountdownTimer from "./Countdown";


 function Bid({ selectedCategory }) {
  
  const [auctions, setAuctions] = useState([]);
  const [customBids, setCustomBids] = useState({});
  const [tempCustomBids, setTempCustomBids] = useState({});
  const {currentUser} = useContext(AuthContext); 
  const [highestBid, setHighestBid] = useState();
  useEffect(() => {
    const fetchAuctions = async () => {
      const colRef = collection(db, 'auctions');
      const querySnapshot = await getDocs(colRef);
      const auctionsData = [];
      querySnapshot.forEach((doc) => {
        auctionsData.push({ id: doc.id, ...doc.data() });
      });

      setAuctions(auctionsData);
    };
    fetchAuctions();
  }, [auctions]);

  
    
  

  const handleTempCustomBidChange = (auctionId, customBid) => {
    setTempCustomBids((prevCustomBids) => ({
      ...prevCustomBids,
      [auctionId]: customBid,
    }));
  };

  const handleBidUpdate = async (auction) => {
    const curr = Number(auction.curPrice);
    const customBid = Number(tempCustomBids[auction.id]);
    if (!isNaN(customBid) && customBid > curr) {
      setHighestBid(currentUser.id); 
      const docRef = doc(db, "auctions", auction.id);
      await updateDoc(docRef, { curPrice: customBid ,highestBidder: currentUser.uid});
  
      // update the state to reflect the new bid amount
      setAuctions((prevAuctions) =>
        prevAuctions.map((prevAuction) =>
          prevAuction.id === auction.id
            ? { ...prevAuction, curPrice: customBid }
            : prevAuction
        )
      );
      window.location.reload();

      // clear the custom bid input
      setCustomBids((prevCustomBids) => ({
        ...prevCustomBids,
        [auction.id]: 0,
      }));
    }
  }; 

  function handleEndAuction(auction) {
    // Check if the auction has already ended
    if (auction.status === 'ended') {
      alert('This auction has already ended!');
      return;
    }

    const auctionRef =  doc(db, "auctions", auction.id);
    deleteDoc(auctionRef).then(() => {
      })
      .catch((error) => {
        console.error('Failed to end auction:', error);
      });
  }
  
  
  const filteredAuctions = auctions.filter(
    (auction) => selectedCategory === 'all' || auction.itemCategory === selectedCategory
  );

  return (
    <div className='container'>
    {  currentUser && filteredAuctions.length> 0? <>{filteredAuctions.map((auction) => (
        <div key={auction.id} className='auction-card'>
          {auction.status === "ended" && auction.highestBidder.length > 0 ? (
          <div className='sold-div'>Sold</div>
        ) : (
          <div className='unsold-div'>Unsold</div>
        )}
          <img src={auction.itemImage} alt='' />
          <h2>{auction.title}</h2>
          <p>{auction.desc}</p>
          <p>Current Bid: {auction.curPrice}</p>
          <p>Category: {auction.itemCategory}</p>
          {auction.status==="live"? 
          <CountdownTimer auction={auction}  />
          :
          <>Auction has Ended</>}
          { currentUser && auction.status==="live" && auction.email !== currentUser.email &&  (    
             
            currentUser.uid === auction.highestBidder ? 
              <div>You hold the highest bid ATM</div>:
            <>
          <input
            type='number'
            name='custom bid'
            value={tempCustomBids[auction.id] || ''}
            onChange={(e) =>
              handleTempCustomBidChange(auction.id, e.target.value)
            }
          />  
          <button type='button' onClick={()=>{handleBidUpdate(auction)}}>
            Add bid
          </button>
          </>
          )}
          {auction.email === currentUser.email && auction.status === "live" &&(
            <button type='button' onClick={() => handleEndAuction(auction)}>
              End Auction
            </button>
          )}
        </div>
      ))}</>: 
      <div>No Items to display at the moment</div> }
      
      </div>
  );
      }

export default Bid; 