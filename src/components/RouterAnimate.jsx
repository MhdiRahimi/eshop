import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  redirect,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Payment from '../pages/Payment';
import ProductDetails from '../pages/ProductDetails';
import Products from '../pages/Products';

import Register from '../pages/Register';
import AccountProfile from '../pages/AccountProfile';
import Orders from '../pages/Orders';
import { AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
function RouterAnimate() {
  const location = useLocation();
  const [session, setSession] = useState();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();

    try {
      setSession(data.session);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSession();
  }, [location]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        {!session ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        ) : (
          <Route path="/" element={<Home />} />
        )}

        <Route path="products/:part" element={<Products />} />

        {session && (
          <Route>
            <Route index path="myaccount" element={<AccountProfile />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        )}

        <Route path="payment" element={session ? <Payment /> : <Login />} />
        <Route path="productdetails/:id" element={<ProductDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default RouterAnimate;
