import React from 'react';
import Page from '../components/Page'
import { Link } from 'react-router-dom';

export default function HomePage() {

    return (
        <Page>
            <h1>Home Page</h1>
            <ul>
                <li>
                    <Link to="/buy">See Products</Link>
                </li>
                <li>
                    <Link to="/sell">Sell</Link>
                </li>
            </ul>
        </Page>
    )
}
