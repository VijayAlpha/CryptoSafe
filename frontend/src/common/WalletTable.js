import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export default function WalletTable() {
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
                    <TableRow>
                        <TableCell>Dummy-1</TableCell>
                        <TableCell>Dummy-2</TableCell>
                        <TableCell>Dummy-3</TableCell>
                        <TableCell>Dummy-4</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
