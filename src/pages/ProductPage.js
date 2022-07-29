import React, { useEffect, useState } from 'react';
import Page from '../components/Page'
import { useParams } from "react-router-dom";
import { Box, Button, TextField } from '@mui/material'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../lib/utils'
import { useContractRead, useContractWrite, useFeeData, useAccount } from 'wagmi'


export default function ProductPage() {
    const { id: productId } = useParams()
    const [ price, setPrice ] = useState(0)
    const [ accessCode, setAccessCode ] = useState()
    const [ isSeller, setIsSeller ] = useState(false)

    // buyer variables
    const [ isBuyer, setIsBuyer ] = useState(false)
    const [ passCode, setPassCode] = useState()
    const [ productUrl, setProductUrl ] = useState()

    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
            console.log('Connected', { address, connector, isReconnected })
        }
    })

    const { data: product } = useContractRead({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'getTxInfo',
        args: [productId]
    })

    const { data: txUrl, refetch: execReadUrl } = useContractRead({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'getUrl',
        args: [productId, passCode],
        enabled: false,
        overrides: {
            from: account?.address
        },
        onError(error) {
            console.log(error.message)
            alert('Your Passcode is incorrect')
        }
    })

    const feeData = useFeeData({
        watch: true,
        cacheTime: 2_000,
    })

    const { write: execWriteBuy } = useContractWrite({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'buy',
        args: [productId],
        overrides: {
            value: price,
            gasLimit: 500000,
            gasPrice: feeData?.gasPrice || 0
        },
        onError(error) {
            console.log('contract write error', error)
        }
    })

    const { write: execWriteSendCode } = useContractWrite({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'sendCode',
        args: [productId, accessCode],
        overrides: {
            gasLimit: 500000,
            gasPrice: feeData?.gasPrice || 0
        },
        onError(error) {
            console.log('contract write error', error)
        }
    })

    useEffect(() => {   
        setPrice(product?.price.toString())
    }, [product])

    useEffect(() => {
        if (product?.seller && account?.address) {
            setIsSeller(product?.seller === account?.address);
        }
        if (product?.buyer && account?.address) {
            setIsBuyer(product?.buyer === account?.address);
        }
    }, [product, account])

    useEffect(() => {
        setProductUrl(txUrl)
    }, [txUrl])

    // console.log('product', product)
    // console.log('isSeller', isSeller)

    const renderSendCode = () => {
        return (
            <>
            <h3>Send Code</h3>
            <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}
                noValidate
                autoComplete="off">
                    <TextField 
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        label="Code" />
            </Box>
            <Button   onClick={() => execWriteSendCode()} variant="contained">Send Code</Button>
            </>
        )
    }

    const renderGetUrl = () => {
        return (
            <>
            <h3>Get URL</h3>
            <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}
                noValidate
                autoComplete="off">
                    <TextField 
                        value={passCode}
                        onChange={(e) => setPassCode(e.target.value)}
                        label="Enter access code to get the URL" />
            </Box>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <StorefrontIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Your URL is" secondary={productUrl || "Please retrieve it first"} />
                </ListItem>

            <Button   onClick={() => execReadUrl()} variant="contained">Send Code</Button>
            </>
        )
    }

    return (
        <Page>
            <h1>Product Page</h1>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <AttachMoneyIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Price" secondary={product?.price.toString()} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <StorefrontIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Seller" secondary={product?.seller} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <StorefrontIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Buyer" secondary={product?.buyer} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <StorefrontIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Product Status" secondary={product?.isPaid ? "Paid" : "For Sale"} />
                </ListItem>
            </List>

            {!isSeller && <Button disabled={isBuyer || product?.isPaid}  onClick={() => execWriteBuy()} variant="contained">Buy this Product</Button>}

            {(isSeller && product?.isPaid && !product?.passcode) && renderSendCode()}

            {(isBuyer) &&renderGetUrl()}
        </Page>
    )
}
