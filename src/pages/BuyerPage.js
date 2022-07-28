import React, { useState, useEffect } from 'react';
import Page from '../components/Page'

import { useContractRead } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../lib/utils'
import { Link } from "react-router-dom";

export default function BuyerPage() {

    const [totalProducts, setTotalProducts] = useState(0)

    const { data: nextId  } = useContractRead({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'nextId',
    })

    useEffect(() => {
        setTotalProducts(Number(nextId.toString())-1) 
    }, [nextId])

    return (
        <Page>
            <h1>Buyer Page</h1>
            <p>Total Products: {totalProducts}</p>

<ul>
{
    Array.from(Array(totalProducts).keys()).map(x => {
        return (
            <li>
                <Link to={`/product/${x+1}`}>Product {x+1}</Link>
            </li>
        )
    })
}

</ul>
        </Page>
    )
}
