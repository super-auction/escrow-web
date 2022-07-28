import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";

import {
	useConnect,
	useBalance,
	useNetwork,
	useAccount,
	useProvider,
    useContractRead
} from 'wagmi'

import { connectorsList } from '../lib/wallet/connectors'


export default function LoginPage() {
    const { connect } = useConnect()
    let navigate = useNavigate();

    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
            console.log('Connected', { address, connector, isReconnected })
        }
    })

    const login = async function() {
        connect({ connector: connectorsList['metamask'] })

    }
    React.useEffect(() => {
        console.log('account', account.address)
        if (account?.address) {
            // redirect to viiew
            navigate("/home");
        } else {
            console.log('not yet')
        }
    }, [account])

    return(
        <Box xs={4} sx={{
            marginTop: '5%'
        }}>
            <Paper elevation={10} sx={{
                paddingLeft: '10%',
                paddingRight: '10%',
                paddingTop: '5%',
                paddingBottom: '5%'
            }}>
            <h1>Super Escrow</h1>
            <h3>Please login with MetaMask to continue</h3>
            <Button onClick={login} variant="contained">Login with Metamask</Button>

            </Paper>
        </Box>
    )
}