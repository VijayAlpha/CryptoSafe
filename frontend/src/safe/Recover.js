import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function Recover({ cryptoSafeContract }) {
    const [oldAddress, setOldAddress] = useState("");

    const recoverSafe = async () => {
        const txHandle = await cryptoSafeContract.changeSafeOwner(oldAddress, {
            customData: {
                // Passing the token to pay fee with
                feeToken: "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b", //DAI
                // feeToken: "0x3ce1bab7b7bAE26775F81Ee3576a99f0EAd5B33C" //wETH
            },
        });

        await txHandle.wait();
    }
    return (
        <div>
            <h1>Recover</h1>

            <h2>Enter your previous address to recover your safe</h2>
            <TextField label="Old Address" variant="outlined" size='small' value={oldAddress} onChange={(e) => setOldAddress(e.target.value)} />
            <Button variant="contained" onClick={recoverSafe}>Recover</Button>
        </div>
    )
}
