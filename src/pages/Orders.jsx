import { Box, Heading, Stack, Container } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import CartItems from '../components/CartItems';
import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  redirect,
  Navigate,
} from 'react-router-dom';
import OrdersCard from '../components/OrdersCard';

const Orders = () => {
  let navigate = useNavigate();

  const [session, setSession] = useState();
  const [data, setData] = useState();

  async function getToken() {
    const { data, error } = await supabase.auth.getSession();
    setSession(data.session);
  }

  async function getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('userId', session?.user?.id);
    try {
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getOrders();
  }, [session]);

  const scrollUp = () => {
    window.scrollTo({
      top: '0',
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    scrollUp();
  }, []);

  return (
    <>
      <Container maxW={'95%'} mt="1rem" bgColor="white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: '0.3', type: 'ease-in-out' },
          }}
        >
          <Heading mt="1rem" overflow={'hidden'}>
            Orders
          </Heading>
          <Stack
            p={{ sm: '2rem', md: '2rem', base: '0.2rem' }}
            rounded={'sm'}
            mt="2rem"
            minH={'70vh'}
          >
            <Box>
              {data?.map((order, i) => {
                return <OrdersCard key={i} data={order} />;
              })}
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </>
  );
};

export default Orders;
