
import './App.css';


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Nav from './components/Nav';
import Create from './components/Create';
import Homepage from './components/Homepage';

function App() {

  

  return (
   <div className="">

      {/* <div>
      <TonConnectButton></TonConnectButton>
      </div>
      <div>
        <CreateNFT/>
        <Home></Home>
      </div> */}

<BrowserRouter>
    
    <div className="App min-h-screen">
      
      <div className='gradient-bg-welcome h-screen w-screen'>
      <Nav/>
      <Routes>
      <Route path="/" element={<Homepage/>}></Route>
        <Route path="/all-nft" element={<Home/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        {/* <Route path="/info" element={<Info nftitem={nftitem} />}></Route> */}
      </Routes>
      </div>
    </div>
  
    </BrowserRouter>
   </div>
  )
}

export default App
