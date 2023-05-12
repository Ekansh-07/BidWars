import { useState } from "react";
import Bid from "./Bids";

export const Home = () =>{

    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
        <div className="home">
            <h1>Auction Count</h1>
           
            <div className="s-category">
                <p>Category:</p>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="Coins">Coins</option>
                    <option value="Paintings">Paintings</option>
                    <option value="Sculptures">Sculptures</option>
                    <option value="Other">others</option>
                </select>
            </div>
            <div className="bids-section">
                <Bid selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}
