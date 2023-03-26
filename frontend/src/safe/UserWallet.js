import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
import { Provider } from 'zksync-web3';
import ActionDialogue from '../common/ActionDialogue';
import WalletTable from "../common/WalletTable"
import { TOKEN_ADDRESS } from '../utils/TokenAddresses';

const provider = new Provider("https://zksync2-testnet.zksync.dev");
// const provider = new ethers.JsonRpcProvider("https://rpc.public.zkevm-test.net")

export default function UserWallet({ ethAddress, userSigner, setUserAssets, userAssets, safeAddress }) {
    const [selectedToken, setSelectedToken] = useState("");
    const [amount, setAmount] = useState("");
    const [feeToken, setFeeToken] = useState("");
    const [open, setOpen] = useState(false)


    useEffect(() => {
        if (ethAddress) {
            getWalletBalance();
        }
    }, [ethAddress]);

    const getWalletBalance = async () => {
        try {
            const assets = [];
            for (let i = 0; i < TOKEN_ADDRESS.length; i++) {
                console.log(TOKEN_ADDRESS[i].address)
                const balanceInUnits = await provider.getBalance(ethAddress, "latest", TOKEN_ADDRESS[i].address);
                console.log(balanceInUnits)
                const balance = ethers.formatUnits(balanceInUnits.toBigInt(), TOKEN_ADDRESS[i].decimal);
                console.log(balance)
                assets.push({
                    address: TOKEN_ADDRESS[i].address,
                    symbol: TOKEN_ADDRESS[i].symbol,
                    balance: balance
                })
            }
            setUserAssets(assets);
        } catch (err) {
            console.log(err);
        }
    }

    const depositToSafe = async () => {
        const transferHandle = await userSigner.transfer({
            to: safeAddress,
            token: selectedToken,
            amount: ethers.parseEther(amount),
            feeToken: feeToken
        })
        console.log(transferHandle);
        getWalletBalance();
        setOpen(false);
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
            <h1>Your Wallet</h1>
            <WalletTable assets={userAssets} handleClickOpen={handleClickOpen} type="Deposit" />
            <ActionDialogue open={open} onClose={handleClose} userAssets={userAssets} amount={amount} setAmount={setAmount} action={depositToSafe} handleClickOpen={handleClickOpen} feeToken={feeToken} setFeeToken={setFeeToken} type="Deposit" />
        </div>
    )
}
