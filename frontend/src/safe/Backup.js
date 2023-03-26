import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function BackUp({ cryptoSafeContract }) {
    const [backupAddress, setBackupAddress] = useState("");
    const [newBackupAddress, setNewBackupAddress] = useState("");
    const [showSetBackupAddress, setShowSetBackupAddress] = useState(false);

    useEffect(() => {
        if (cryptoSafeContract) {
            getBackupOwnerAddress();
        }
    }, [cryptoSafeContract])

    const getBackupOwnerAddress = async () => {
        const address = await cryptoSafeContract.getSafeBackupOwner();
        setBackupAddress(address);
    }

    const setSafeBackupOwner = async () => {
        const txHandle = await cryptoSafeContract.setSafeBackupOwner(newBackupAddress, {
            customData: {
                // Passing the token to pay fee with
                feeToken: "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b", //DAI
                //feeToken: "0x3ce1bab7b7bAE26775F81Ee3576a99f0EAd5B33C" //wETH
            },
        });

        await txHandle.wait();
        setShowSetBackupAddress(false);
        getBackupOwnerAddress();
    }
    return (
        <div>
            <h2>Set Your Backup Address</h2>
            <p>
                {backupAddress} <Button variant="contained" onClick={() => setShowSetBackupAddress(!showSetBackupAddress)}>{showSetBackupAddress ? 'Cancel' : 'Edit'}</Button
                ></p>
            {showSetBackupAddress &&
                <>
                    <TextField label="BackupAddress" variant="outlined" size='small' value={newBackupAddress} onChange={(e) => setNewBackupAddress(e.target.value)} />
                    <Button variant="contained" onClick={setSafeBackupOwner}>Update</Button>
                </>}
        </div>
    )
}
