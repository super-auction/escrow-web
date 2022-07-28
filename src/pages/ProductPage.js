import React, { useEffect, useState } from 'react';
import Page from '../components/Page'
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Box, Button, TextField, Alert } from '@mui/material'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { CONTRACT_ABI, CONTRACT_ADDRESS, toEth, toWei, formatDate, formatNumber } from '../lib/utils'
import { useContractRead, useContractWrite, useFeeData, useAccount } from 'wagmi'


export default function ProductPage() {
    const { id: productId } = useParams()
    const [ price, setPrice ] = useState(0)

    const { data: product } = useContractRead({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'getTxInfo',
        args: [productId]
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
        // onMutate({args}) {
        //     args[1] = toWei(args[1].toString())
        // },
        onError(error) {
            console.log('contract write error', error)
        }
    })

    useEffect(() => {   
        setPrice(product?.price.toString())
    }, [product])

    console.log('price', price)

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
            </List>
            <Button  onClick={() => execWriteBuy()} variant="contained">Buy this Product</Button>

        </Page>
    )
}
