import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../common/layout/Sidebar';
import UserWallet from '../safe/UserWallet';
import Safe from '../safe/Safe';
import Recover from '../safe/Recover';
import BackUp from '../safe/Backup';

export default function UserDashboard({ ethAddress, cryptoSafeContract, userSigner, domainData }) {
    const [safeAddress, setSafeAddress] = useState("");
    const [userAssets, setUserAssets] = useState([]);
    const [currentSection, setCurrentSection] = useState("Wallet");

    useEffect(() => {
        if (cryptoSafeContract) {
            getSafeAddress();
        }
    }, [cryptoSafeContract])

    const getSafeAddress = async () => {
        try {
            const address = await cryptoSafeContract.getSafeContract();
            setSafeAddress(address);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar setCurrentSection={setCurrentSection} currentSection={currentSection} safeAddress={safeAddress} ethAddress={ethAddress} domainData={domainData} />
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Toolbar />
                {currentSection === "Wallet" && <UserWallet ethAddress={ethAddress} userSigner={userSigner} setUserAssets={setUserAssets} userAssets={userAssets} safeAddress={safeAddress} />}
                {currentSection === "Safe" && <Safe cryptoSafeContract={cryptoSafeContract} safeAddress={safeAddress} userAssets={userAssets} />}
                {currentSection === "Recover" && <Recover cryptoSafeContract={cryptoSafeContract} />}
                {currentSection === "Backup" && <BackUp cryptoSafeContract={cryptoSafeContract} />}
            </Box>
        </Box>
    )
}
