import React from 'react';
import { Box, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import { useAccount } from 'wagmi'

export default function Page(props) {

    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
            console.log('Connected', { address, connector, isReconnected })
        }
    })

    return (
        <Box xs={8} sx={{ width: '100%' }}>
            <Paper elevation={10} sx={{ marginTop: '5px', padding: '2%' }}>
                <p>
                    <small>You are logged in as : {account.address}</small>
                </p>
                <Link to="/">Go Home</Link>
                {props.children}
            </Paper>
        </Box>
    )
}