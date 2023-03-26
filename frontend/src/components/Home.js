import React, { useEffect } from 'react';
import { Container, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
//import CryptoSafeFactory from "../abis/CryptoSafeFactory.json"
import CryptoSafeFactory from "../abis/CryptoSafeFactoryzkEVM.json"
import { Web3Provider, Contract } from 'zksync-web3';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "./top-logo.png";
import UAuth from '@uauth/js';

const CRYPTOSAFEFACTORY_CONTRACT_ADDRESS = "0x845835274d85d210e3377f41A4305945aD8de61F"; //zksync
//const CRYPTOSAFEFACTORY_CONTRACT_ADDRESS = "0xDbdf4B0674b98A94010152F804D663a0D4213529"; //zkEVM
const CRYPTOSAFEFACTORY_ABI = CryptoSafeFactory.abi;
const theme = createTheme();

const uauth = new UAuth({
    clientID: "b17d069a-150a-4c64-b2e1-5babb87c5bd7",
    redirectUri: "http://localhost:3000",
});
export default function Home({ setEthAddress, setCryptoSafeContract, setUserSigner, setDomainData }) {
    useEffect(() => {
        uauth
            .user()
            .then(userData => {
                console.log(userData);
                setDomainData(userData);
                setEthAddress(userData.wallet_address);
                navigate('./dashboard');
            })
            .catch(error => {
                console.error('profile error:', error);
            })
    }, [])


    const navigate = useNavigate();

    const loginWithUnstoppableDomains = async () => {
        try {
            const authorization = await uauth.loginWithPopup();
            authorization.sub = authorization.idToken.sub;
            console.log(authorization);

            setDomainData(authorization);
            setEthAddress(authorization.idToken.wallet_address);
            navigate('./dashboard');
        } catch (error) {
            console.error(error);
        }
    }


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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <img src={logo} onClick={() => navigate("/")} style={{ height: "50px", cursor: "pointer" }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        CryptoSafe
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            CryptoSafe
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            CryptoSafe is a decentralized custody protocol and collective asset management platform on Polygon zkEVM & zkSync
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={loginWithUnstoppableDomains}>Connect With Unstoppable Domain</Button>
                            <Button variant="contained" onClick={connectWithMetamask} > Connect With Metamask </Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    )
}
