// import './App.css';
import { Grid } from '@mui/material'
import { Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SellerPage from './pages/SellerPage';
import BuyerPage from './pages/BuyerPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <>
        <Grid container justifyContent="center" columns={12}>
        <Routes>
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/buy" element={<BuyerPage />} /> 
          <Route path="/sell" element={<SellerPage />} /> 
          <Route path="/product/:id" element={<ProductPage />} /> 
        </Routes>
        </Grid>
    </>
  );
}

export default App;
