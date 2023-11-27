import React, { useState } from 'react'
import Head from './Component/Head/Head'
import "./App.css"
import Total_value from './Component/Total_value/Total_value'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import NftStaking from './Component/nftStaking/NftStaking';
import { Route, Routes } from 'react-router-dom';
function App() {
  const [showw, setShoww] = useState(false);
  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );

  return (
    <div className='' >
      <div className='back'>
        <ToastContainer />
        <Head handleClosee={handleClosee} handleShoww={handleShoww} setShoww={setShoww} showw={showw} />
        <Routes>
          <Route path='/' element={<Total_value setShoww={setShoww} />} />
          <Route path='/Nft_Staking' element={<NftStaking setShoww={setShoww} />} />
        </Routes>



      </div>
    </div>
  )
}

export default App
