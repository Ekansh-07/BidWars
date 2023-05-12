import { useContext,useEffect, useState} from "react"
import { AuthContext } from "../context/AuthContext"
import { collection,doc,getDoc,getDocs,query,where } from "firebase/firestore";
import { db } from "../config/firebase";
import "../css/users.css"

export const User = () => {
    const {currentUser} = useContext(AuthContext);
    const [auctions, setAuctions] = useState([]); 
    const [user, setUser] = useState({}); 
        useEffect(() => {
          const fetchUser = async () => {
            const userRef = doc(collection(db, "Users"), currentUser.uid);

            const userDoc = await getDoc(userRef);
           setUser(userDoc.data());
            if (userDoc.exists()) {
              const itemIds = userDoc.data().itemsId;
             if(itemIds.length !== 0){
              const auctionsRef = collection(db, "auctions");
              const auctionsQuery = query(auctionsRef, where("auction_id", "in", itemIds));
            
              const auctionsSnapshot = await getDocs(auctionsQuery);
            
              const auctionsData = [];
            
              auctionsSnapshot.forEach((doc) => {
                auctionsData.push({ id: doc.id, ...doc.data() });
              });
              
              setAuctions(auctionsData);
              console.log(auctions.length);

              
            }}  
            
        };
        fetchUser();
      }, [ ]);

      return (
<>
        <div className="profile" >
          <div>image</div>
          <h2>{user.name}</h2>
        </div>
        {auctions.length >0 ? 
       
        <>
        Items Purchased:
        <div className="profile-auctions">
          {auctions.map((auction)=>{ return(
            <div className="auction-card" key={auction.auction_id}>
               <img src={auction.itemImage} alt='' />
          <h2>{auction.title}</h2>
          <p>{auction.desc}</p>
          <p>Current Bid: {auction.curPrice}</p>
          <p>Category: {auction.itemCategory}</p>
            </div>
          )})}
        </div>
        </>
        :
        <>
        No Bids Placed 
        </>  
        
      }

</>
      );
}