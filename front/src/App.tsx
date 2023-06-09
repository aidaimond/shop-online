import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import OneProduct from "./features/products/OneProduct";
import NewProduct from "./features/products/NewProduct";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import Products from "./features/products/Products";
import Basket from "./features/basket/Basket";
import Checkout from "./features/orders/ Checkout";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main style={{margin: '20px'}}>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:categoryId" element={<Products/>}/>
            <Route path="/basket" element={<Basket/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/product/:id" element={<OneProduct/>}/>
            <Route path="/new-product" element={<NewProduct/>}/>
            <Route path={'/register'} element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={(<h1>Not found!</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
