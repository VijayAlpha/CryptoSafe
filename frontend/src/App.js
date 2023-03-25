import React, { useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDashboard from './components/UserDashboard';

export default function App() {
  const [ethAddress, setEthAddress] = useState("");
  const [cryptoSafeContract, setCryptoSafeContract] = useState("");
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Home setEthAddress={setEthAddress} setCryptoSafeContract={setCryptoSafeContract} />} />
        <Route exact path='/dashboard' element={<UserDashboard ethAddress={ethAddress} cryptoSafeContract={cryptoSafeContract} />} />
      </Routes>
    </HashRouter>
  )
}
