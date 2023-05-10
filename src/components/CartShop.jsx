import React, { useState, useEffect } from 'react';
import {
  Center,
  Tooltip,
  IconButton,
  Box,
  Badge,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Text,
  Divider,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import CardSearch from './CardSearch';
import CartItems from './CartItems';
import { NavLink } from 'react-router-dom';

const CartShop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemCart = useSelector((state) => state.cartProducts.cart);

  let price = [];
  itemCart?.map((item) => {
    price.push(item.price * item.quanty);
  });

  const sum = price.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  let quantity = [];
  itemCart?.map((item) => {
    quantity.push(item.quanty);
  });
  const quanty = quantity.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  
  
  return (
    <>
      <Center w="80px" h="5rem" overflow={'hidden'}>
        <Tooltip label="View your cart">
          <IconButton
            variant={'unstyle'}
            icon={<HiOutlineShoppingBag size={30} />}
            onClick={onOpen}
          />
        </Tooltip>
        <Box h={'1.3em'} w="1.3em" mt="20px" ml="-15px" overflow={'hidden'}>
          <Center>
            <Badge
              bgColor={'blackAlpha.900'}
              variant="solid"
              borderRadius={'50%'}
            >
              {quanty}
            </Badge>
          </Center>
        </Box>
      </Center>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'sm'}>
        <DrawerOverlay />
        <DrawerContent
          DrawerContent
          bgColor="rgba(255, 251, 251, 1)"
          overflow={'hidden'}
        >
          <DrawerCloseButton bgColor={'white'} color="black" size={'lg'} />

          <Text p="1rem" fontSize={'2xl'}>
            Your cart ({quanty})
          </Text>

          <DrawerBody mt="0rem">
            {itemCart.map((item, index) => {
              return <CartItems key={index} item={item} qty={quanty} />;
            })}

            <Divider borderColor={'blackAlpha.900'} />
            <Box
              fontSize={'1xl'}
              overflow={'hidden'}
              fontWeight={'bold'}
              mt={'1rem'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Center>
                <Text display={'flex'}>
                  SUBTOTAL : {sum.toFixed(1)} <Text ml="0.5rem">$</Text>
                </Text>
              </Center>

              <Button
                bg="black"
                color="white"
                _hover={{
                  bg: 'black',
                  color: 'white',
                }}
                overflow={'hidden'}
                isDisabled={quanty < 1 ? true : false}
                onClick={onClose}
              >
                {quanty < 1 ? (
                  <Text overflow={'hidden'}> Checkout</Text>
                ) : (
                  <NavLink to={'payment'}>
                    <Text overflow={'hidden'}> Checkout</Text>
                  </NavLink>
                )}
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartShop;
