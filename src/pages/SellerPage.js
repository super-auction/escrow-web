import React, { useState } from 'react';
import Page from '../components/Page'
import { TextField, Box, Button } from '@mui/material'
import { useContractWrite } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS, toWei } from '../lib/utils'


export default function SellerPage() {
    // await sell(seller1, 'http://example.com/1', toWei('20'));

    const [url, setURL ] = useState('http://example.com/1')
    const [price, setPrice] = useState(10)

    const { write: execWrite } = useContractWrite({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'sell',
        args: [url, price],
        // onMutate({args}) {
        //     args[0] = toWei(args[0].toString())
        //     args[3] = +new Date(startDate)
        //     args[4] = +new Date(endDate)
        // },
        onError(error) {
            console.log('contract write error', error)
        }
    })

    return (
        <Page>
            <h1>Seller Page</h1>

            <h3>Sell Product</h3>
            <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}
                noValidate
                autoComplete="off">
                    <TextField 
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                        label="URL" />

                    <TextField 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        label="Price"/>
            </Box>
            <Button onClick={() => execWrite()} sx={{marginTop: '10px', marginLeft: '10px'}}  variant="contained" >Execute Sell</Button>

        </Page>
    )
}
