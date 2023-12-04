import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Grid,
  GridItem,
  Wrap,
  Flex,
  Spacer,
  Heading,
  Button,
  Text,
  Center,
  IconButton,
  Select,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  TabIndicator,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import CarouselItemDetails from '../components/CarouselItemDetails';
import { Heart, Share, Minus, Add } from 'iconsax-react';
import TabsProducts from '../components/TabsProduct';
import ContactUs from '../components/ContactUs';
import Comment from '../components/Comment';
import { useLocation } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { useSelector, useDispatch } from 'react-redux';

import {
  addCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from '../features/cartSlice';
import { useEffect } from 'react';

const ProductDetails = () => {
  let cartItems = useSelector((state) => state.cartProducts.cart);
  const dispatch = useDispatch();
  let location = useLocation();
  let item = location.state.item;

  const toast = useToast();
  console.log(item);
  function addToCart() {
    dispatch(addCart(item));
    toast({
      title: 'add item.',
      description: 'added to cart',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  function add() {
    dispatch(incrementQuantity(item));
  }
  function minus() {
    dispatch(decrementQuantity(item));
  }
  let quanty = [];
  cartItems.filter((el) => (el.id === item.id ? quanty.push(el.stock) : 0));

  if (quanty[0] === 0) {
    dispatch(removeItem(item));
    toast({
      title: 'item removed.',
      status: 'error',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    });
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
  let offPrice = (item.price * item.discount) / 100 + item.price;
  console.log(item);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: '0.3', type: 'ease-in-out' },
        }}
      >
        <Container maxW={'container.xl'} mt="5rem">
          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2,12fr)',
              lg: 'repeat(2,12fr)',
              '2xl': 'repeat(2,12fr)',
            }}
            overflow={'hidden'}
          >
            <CarouselItemDetails images={item.imageUrl} items={item} />

            <Flex
              justifyContent={{ md: 'space-between', base: 'center' }}
              overflow={'hidden'}
              maxW={'1020px'}
              flexWrap={'wrap'}
              mx="2rem"
              mt="1rem"
            >
              {' '}
              <Text
                textAlign={{ md: 'left', base: 'center' }}
                overflow={'hidden'}
                textTransform="capitalize"
                wordBreak={'break-word'}
                fontSize="26px"
                fontWeight={'bold'}
                width={'500px'}
              >
                {item.name}
              </Text>
              <Stack
                direction={'row'}
                maxH={'100px'}
                mt="1rem"
                w={'100%'}
                placeContent={{ md: 'flex-start', base: 'center' }}
              >
                <Box cursor={'pointer'}>
                  <Share size="28" />
                </Box>
                <Box cursor={'pointer'}>
                  <Heart size="28" />
                </Box>
              </Stack>
              <Grid
                width={'100%'}
                mt="2rem"
                placeContent={{ md: 'flex-start', base: 'center' }}
              >
                <Text
                  fontSize={'lg'}
                  overflow={'hidden'}
                  fontWeight={'bold'}
                  color="blackAlpha.700"
                >
                  {item.brand}
                </Text>
                <Text
                  mt="2rem"
                  fontSize={'4xl'}
                  overflow={'hidden'}
                  fontWeight={'bold'}
                >
                  {parseInt(item.price)}$
                </Text>
                <Text
                  fontSize={'2xl'}
                  overflow={'hidden'}
                  fontWeight={'bold'}
                  textDecoration={'line-through'}
                  color={'gray.600'}
                  textDecorationColor="red.600"
                  textDecorationThickness={'1px'}
                  display={item.discount > 0 ? 'block' : 'none'}
                >
                  {offPrice.toFixed(1)}$
                </Text>

                <Text
                  mt="2rem"
                  fontSize={'md'}
                  overflow={'hidden'}
                  fontWeight={'bold'}
                >
                  SKD-10054
                </Text>
              </Grid>
              <Grid mt="1rem" transition={'all ease 0.5s'}>
                <Text fontSize={'md'} overflow={'hidden'} fontWeight="600">
                  Size*
                </Text>
                <Select
                  border="2px solid black"
                  placeholder="Select"
                  bgColor="transparent"
                  focusBorderColor="gray"
                  variant={'filled'}
                  required
                  minW={'300px'}
                >
                  <option value="option1">small</option>
                  <option value="option2">medium</option>
                  <option value="option3">large</option>
                </Select>

                {item.stock > 0 ? (
                  <Stack direction={'row'} mt="3rem">
                    <Center>
                      {quanty > 0 && (
                        <Flex
                          border="1px solid black"
                          justifyContent={'space-between'}
                          mr="2rem"
                          rounded={'md'}
                          overflow={'hidden'}
                          p="4px"
                        >
                          <Button
                            size="sx"
                            overflow={'hidden'}
                            variant={'ghost'}
                            _hover={{ backgroundColor: 'none', color: 'none' }}
                            onClick={minus}
                            isDisabled={quanty < 1 ? true : false}
                          >
                            <Minus size="28" />
                          </Button>
                          <Text overflow={'hidden'} px="1rem">
                            {quanty < 1 ? 0 : quanty}
                          </Text>
                          <Button
                            size="sx"
                            overflow={'hidden'}
                            variant={'ghost'}
                            _hover={{ backgroundColor: 'none', color: 'none' }}
                            onClick={add}
                            isDisabled={quanty >= item.stock ? true : false}
                          >
                            <Add size="28" />
                          </Button>
                        </Flex>
                      )}
                      <Button
                        bgColor={'black'}
                        color="white"
                        _hover={{ backgroundColor: 'none', color: 'none' }}
                        onClick={addToCart}
                        width={'150px'}
                      >
                        Add to cart
                      </Button>
                    </Center>
                  </Stack>
                ) : (
                  <h1 className=" text-3xl font-bold text-red-600">
                    out of stock
                  </h1>
                )}
              </Grid>
            </Flex>
          </Grid>

          <Flex justifyContent={'center'} mt="5rem">
            <Center>
              <Tabs position="relative" variant="unstyled">
                <TabList px="2rem" justifyContent={'center'}>
                  <Tab
                    fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                    fontWeight={'semibold'}
                  >
                    Description
                  </Tab>
                  <Tab
                    fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                    fontWeight={'semibold'}
                  >
                    Comments
                  </Tab>
                  <Tab
                    fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                    fontWeight={'semibold'}
                  >
                    {' '}
                    Contact us
                  </Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="black"
                  borderRadius="1px"
                />
                <TabPanels>
                  <TabPanel>
                    <Text
                      textAlign={'justify'}
                      border="1px solid black"
                      px={{ base: '1', md: '"5rem"' }}
                      p="1rem"
                      bgColor="white"
                      width={'auto'}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quod quae autem placeat minus magnam rerum facere ipsa
                      assumenda? Eveniet, inventore laboriosam. Corrupti totam
                      fugit debitis nobis ducimus laboriosam repellendus maiores
                      id exercitationem suscipit veniam vitae, provident,
                      asperiores modi! Ipsa facilis blanditiis voluptatibus
                      accusamus odio repudiandae voluptate recusandae aut
                      similique! Aliquid possimus dignissimos quod illum qui
                      blanditiis quas in. Ipsam assumenda autem, eos placeat
                      beatae numquam dolore illum ipsum porro enim facilis
                      aperiam earum quia, modi accusamus voluptatem quibusdam
                      iste doloribus harum? Eveniet, numquam eius ipsum dicta
                      aliquid, odit autem expedita earum ab quia eaque veritatis
                      unde, cumque aut nulla officiis.
                    </Text>
                  </TabPanel>
                  <TabPanel>
                    <Comment />
                  </TabPanel>
                  <TabPanel>
                    <ContactUs />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Center>
          </Flex>
        </Container>
        <Box mt="6rem" overflow={'hidden'}>
          <Center mb={'3rem'} mx="2rem">
            <Divider
              borderColor={'blackAlpha.900'}
              width={{ md: '40%', sm: '0' }}
            />
            <Heading
              fontSize={{ sm: '20px', md: '16px' }}
              mx="1rem"
              overflow={'hidden'}
            >
              Recomended
            </Heading>
            <Divider
              borderColor={'blackAlpha.900'}
              width={{ md: '40%', sm: '0' }}
            />
          </Center>
          <Carousel mod={item.id < 199 ? false : true} />
        </Box>
      </motion.div>
    </>
  );
};

export default ProductDetails;
