import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Textarea,
  Button,
  Center,
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearCart } from '../features/cartSlice';
const Payment = () => {
  const cart = useSelector((state) => state.cartProducts.cart);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let toast = useToast();
  const [id, setId] = useState('');

  async function getuser() {
    const { data } = await supabase.auth.getUser();
    setId(data.user.id);
     console.log(id);
  }

  useEffect(() => {
    getuser();
  }, []);

 

  let products = [];
  let items = cart.map((c) => {
    products.push({
      title: c.name,
      price: c.price,
      quanty: c.quanty,
      product_id: c.id,
      userId: id,
      imageUrl: c.imageUrl,
    });
  });

  async function checkoutHandler() {
    const { error, data } = await supabase.from('orders').insert(products);
    console.log(data);
    try {
      dispatch(clearCart());
      navigate('/orders');
      toast({
        title: 'Payment.',
        description: 'Payment successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'error payment.',
        description: 'failed payment',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }

    try {
      // Loop through each product in the order
      for (const product of products) {
        const productId = product.product_id; // Replace with the actual column name
        const purchasedQuantity = product.quanty; // Replace with the actual column name

        // Fetch the current stock quantity from the 'menProducts' table
        const { data: productData, error: fetchError } = await supabase
          .from('menProducts')
          .select('stock')
          .eq('id', productId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        // Update the stock quantity by subtracting the purchased quantity
        const updatedStock = productData.stock - purchasedQuantity;

        // Update the 'menProducts' table with the new stock quantity
        const { data: updatedProduct, error: updateError } = await supabase
          .from('menProducts')
          .update({ stock: updatedStock })
          .eq('id', productId);

        if (updateError) {
          throw updateError;
        }
      }

      console.log('Stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error.message);
    }
  }

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
      <Container maxW={'95%'} mt="5rem" bg="white">
        <Box p={{ sm: '2rem', md: '2rem', base: '0.2rem' }} rounded={'sm'}>
          <Heading overflow="hidden">Customer Info</Heading>

          <Flex mt="1rem">
            <FormControl mr="5%">
              <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                First name
              </FormLabel>
              <Input
                id="first-name"
                placeholder="First name"
                focusBorderColor="none"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                Last name
              </FormLabel>
              <Input
                id="last-name"
                placeholder="First name"
                focusBorderColor="none"
              />
            </FormControl>
          </Flex>
          <FormControl mt="2%">
            <FormLabel htmlFor="address" fontWeight={'normal'}>
              Address
            </FormLabel>
            <Textarea placeholder="Address" focusBorderColor="none" />
          </FormControl>
        </Box>

        <Box p={{ sm: '2rem', md: '2rem', base: '0.2rem' }}>
          <Heading overflow={'hidden'}>Payment Info</Heading>
          <Flex mt="1rem">
            <FormControl mr="5%">
              <FormLabel fontWeight={'normal'}>Card number</FormLabel>
              <Input
                id="last-name"
                placeholder="card number"
                focusBorderColor="none"
                type="number"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={'normal'}> date</FormLabel>
              <Input
                focusBorderColor="none"
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
              />
            </FormControl>
          </Flex>
          <FormControl mt="1rem">
            <FormLabel fontWeight={'normal'}>CVC</FormLabel>
            <Input
              focusBorderColor="none"
              type="number"
              htmlSize={4}
              width="auto"
              placeholder="CVC"
            />
          </FormControl>
        </Box>
        <Box p={{ sm: '2rem', md: '2rem', base: '0.2rem' }}>
          <Button colorScheme="whatsapp" onClick={checkoutHandler}>
            Complete Checkout and Pay
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Payment;
