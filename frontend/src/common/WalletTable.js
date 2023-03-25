import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material"

export default function WalletTable({ assets, handleClickOpen, type }) {
    console.log(assets)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Token Address</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assets.map((asset) => (
                        <TableRow key={asset.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{asset.symbol}</TableCell>
                            <TableCell>{asset.balance}</TableCell>
                            <TableCell>{asset.address}</TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={() => handleClickOpen(asset.address)}>
                                    {type}
                                </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
