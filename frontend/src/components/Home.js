import React from 'react';
import { Card, CardContent, Container, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import CryptoSafeFactory from "../abis/CryptoSafeFactory.json"
import { Web3Provider, Contract } from 'zksync-web3';

const CRYPTOSAFEFACTORY_CONTRACT_ADDRESS = "0x845835274d85d210e3377f41A4305945aD8de61F";
const CRYPTOSAFEFACTORY_ABI = CryptoSafeFactory.abi;

export default function Home({ setEthAddress, setCryptoSafeContract, setUserSigner }) {
    const navigate = useNavigate();

    const connectWithMetamask = async () => {
        window.ethereum.request({ method: "eth_requestAccounts" }).then(async accounts => {
            if (+window.ethereum.networkVersion === 280) {
                setEthAddress(accounts[0]);
                const signer = (new Web3Provider(window.ethereum)).getSigner();
                setUserSigner(signer);
                const contract = new Contract(
                    CRYPTOSAFEFACTORY_CONTRACT_ADDRESS,
                    CRYPTOSAFEFACTORY_ABI,
                    signer
                );
                setCryptoSafeContract(contract);
                navigate('./dashboard');
            } else {
                alert("Please Switch to zkSync Network!");
            }
        }).catch((e) => {
            console.log(e);
        })
    }


    return (
        <Container>
            <Card>
                <CardContent>
                    <h1 style={{ marginBottom: '.3rem' }}>CryptoSafe</h1>
                    <p style={{ marginBottom: '.5rem' }}>Store your Crypto on Recoverable Safe (zksync testnet)</p>
                    <hr />
                    <br />
                    <Button variant="contained" fullWidth>
                        Connect With Unstoppable Domain
                    </Button>
                    <br />
                    <br />
                    <Button variant="contained" onClick={connectWithMetamask} fullWidth>
                        Connect With Metamask
                    </Button>
                </CardContent>
            </Card>
        </Container>
    )
}
