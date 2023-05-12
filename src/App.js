import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { Home } from './components/Home';
import { AuctionBody } from './components/Sell';
import Register from './components/Register';
import { User } from './components/User';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route   path="/auction" element={<AuctionBody/>} />
            <Route path= "/register" element={<Register/>}/>
            <Route path= "/profile" element={<User/>}/>

          </Routes>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
