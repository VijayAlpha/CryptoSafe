import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ethers } from "ethers";
import { Provider } from "zksync-web3";
import { TOKEN_ADDRESS } from "../utils/TokenAddresses";
import ActionDialogue from '../common/ActionDialogue';
import WalletTable from '../common/WalletTable';

const provider = new Provider('https://zksync2-testnet.zksync.dev');

export default function Safe({ cryptoSafeContract, safeAddress, userAssets }) {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [feeToken, setFeeToken] = useState("");
    const [selectedToken, setSelectedToken] = useState("");
    const [safeAssets, setSafeAssets] = useState("");

    useEffect(() => {
        if (safeAddress) {
            getSafeBalance();
        }
    }, [safeAddress])

    const getSafeBalance = async () => {
        try {
            const assets = [];
            for (let i = 0; i < TOKEN_ADDRESS.length; i++) {
                const balanceInUnits = await provider.getBalance(safeAddress, "latest", TOKEN_ADDRESS[i].address);
                console.log(balanceInUnits)
                const balance = ethers.formatUnits(balanceInUnits.toBigInt(), TOKEN_ADDRESS[i].decimal);
                console.log(balance)
                assets.push({
                    address: TOKEN_ADDRESS[i].address,
                    symbol: TOKEN_ADDRESS[i].symbol,
                    decimal: TOKEN_ADDRESS[i].decimal,
                    balance: balance
                })
            }
            setSafeAssets(assets);
        } catch (err) {
            console.log(err);
        }
    }

    const createSafe = async () => {
        const txHandle = await cryptoSafeContract.createRecoverableSafe({
            customData: {
                // Passing the token to pay fee with
                feeToken: "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b",
            },
        })
        await txHandle.wait();
    }

    const withdrawToken = async () => {
        try {
            const txHandle = await cryptoSafeContract.withdrawTokenfromSafe(
                selectedToken, ethers.parseEther(amount), {
                customData: {
                    // Passing the token to pay fee with
                    feeToken: feeToken
                },
            })
            await txHandle.wait();
            setOpen(false);
        } catch (err) {
            console.error(err);
            console.log(err.transaction.value.toString());
        }
    }

    const handleClickOpen = (tokenAddress) => {
        setSelectedToken(tokenAddress);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h1>Your Safe</h1>
            {safeAddress === "0x0000000000000000000000000000000000000000"
                ?
                <Button variant="contained" onClick={createSafe} style={{ marginTop: '1rem' }}>Create Safe</Button>
                :
                <WalletTable assets={safeAssets} handleClickOpen={handleClickOpen} type="Withdraw" />
            }
            <ActionDialogue open={open} onClose={handleClose} userAssets={userAssets} amount={amount} setAmount={setAmount} action={withdrawToken} handleClickOpen={handleClickOpen} feeToken={feeToken} setFeeToken={setFeeToken} type="Withdraw" />
        </div>

    )
}
