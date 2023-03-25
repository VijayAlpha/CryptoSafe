import React from 'react';
import { Card, CardContent, Container, Button } from "@mui/material";

import CryptoSafeFactory from "../../../artifacts-zk/contracts/CryptoSafeFactory.sol/CryptoSafeFactory.json"

export default function Home({ setEthAddress, setCryptoSafeContract }) {
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
                    <Button variant="contained" fullWidth>
                        Connect With Metamask
                    </Button>
                </CardContent>
            </Card>
        </Container>
    )
}
