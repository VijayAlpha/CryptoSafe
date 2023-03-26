import React, { useEffect } from 'react';
import { Container, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CryptoSafeFactory from "../abis/CryptoSafeFactory.json"
//import CryptoSafeFactory from "../abis/CryptoSafeFactoryzkEVM.json"
import { Web3Provider, Contract } from 'zksync-web3';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import StarIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "./top-logo.png";
import GlobalStyles from '@mui/material/GlobalStyles';
import UAuth from '@uauth/js';
import CardContent from '@mui/material/CardContent';

const CRYPTOSAFEFACTORY_CONTRACT_ADDRESS = "0x845835274d85d210e3377f41A4305945aD8de61F"; //zksync
//const CRYPTOSAFEFACTORY_CONTRACT_ADDRESS = "0xDbdf4B0674b98A94010152F804D663a0D4213529"; //zkEVM
const CRYPTOSAFEFACTORY_ABI = CryptoSafeFactory.abi;

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


    const tiers = [
        {
            title: 'Create Safe',
            description: [
                'On chain recoverable safe on Polygon zkEVM & zkSync Testnets',
            ],
        },
        {
            title: 'Store Cryptos on Safe',
            description: [
                'Connect your wallet and add or withdraw your crypto assets on Cryptosafe platform',
            ],
        },
        {
            title: 'Recover Safe',
            description: [
                'Recover your safe if you lost your access to safe by setting up the backup guardian'
            ],
        },
    ];


    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <img src={logo} onClick={() => navigate("/")} style={{ height: "50px", cursor: "pointer" }} />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        CryptoSafe
                    </Typography>
                    <Button sx={{ my: 1, mx: 1.5 }} variant="contained" onClick={loginWithUnstoppableDomains}>Connect With Unstoppable Domain</Button>
                    <Button sx={{ my: 1, mx: 1.5 }} variant="contained" onClick={connectWithMetamask} > Connect With Metamask </Button>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h3"
                    variant="h3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    CryptoSafe
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    CryptoSafe is a decentralized custody protocol and collective asset management platform on
                    Polygon zkEVM & zkSync
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >

                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {/* Footer */}
        </>
    )
}
