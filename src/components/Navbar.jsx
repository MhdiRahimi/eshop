import {
  Text,
  IconButton,
  Button,
  useDisclosure,
  Center,
  Spacer,
  Tooltip,
  useMediaQuery,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  Badge,
  Image,
  Tab,
  Tabs,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  DrawerFooter,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';
import logo from '../assets/eshop-low-resolution-logo-black-on-transparent-background.svg';
import { HambergerMenu } from 'iconsax-react';

import User from './User';
import { motion } from 'framer-motion';
import Search from './Search';
import CartShop from './CartShop';
const Navbar = () => {
  const [matches] = useMediaQuery('(min-width: 920px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openMenu = () => {
    onOpen();
  };

  const linkStyle = {
    width: matches ? '15%' : '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  };
  const activeLink = {
    backgroundColor: 'black',
    color: 'white',

    width: matches ? '15%' : '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <>
      <Center overflow={'hidden'}>
        <Box
          minHeight="4rem"
          minWidth="100%"
          bgColor="#ffff"
          boxShadow="0 3px 12px rgb(40 51 65 / 10%), 0 0 1px rgb(40 51 65 / 20%)"
          zIndex="5"
        >
          {matches ? (
            <>
              <Flex px="1rem">
                <Center w={matches ? '10%' : '15%'} h="5rem" color="#000000">
                  <NavLink to="/">
                    <Image src={logo} />
                  </NavLink>
                </Center>
                <Spacer />
                {/* <Center width="100px" color="#000000">
                  <motion.div
                    style={{
                      borderRadius: '5px',
                    }}
                    whileHover={{
                      backgroundColor: 'black',
                      color: '#fff',
                      borderRadius: '5px',
                    }}
                    transition={{ type: 'ease-in-out ', delay: 0.1 }}
                  >
                    <NavLink
                      to={`products/men`}
                      style={({ isActive }) => {
                        return isActive ? activeLink : linkStyle;
                      }}
                    >
                      Men
                    </NavLink>
                  </motion.div>
                </Center> */}

                <NavLink
                  to={`products/men`}
                  style={({ isActive }) => {
                    return isActive ? activeLink : linkStyle;
                  }}
                  className={'activeLink'}
                >
                  <Center>
                    {' '}
                    <Center
                      fontFamily={'serif'}
                      fontStyle={'italic'}
                      fontWeight={'bold'}
                      fontSize={'2xl'}
                    >
                      Men
                    </Center>
                  </Center>
                </NavLink>

                <NavLink
                  to={`products/women`}
                  style={({ isActive }) => {
                    return isActive ? activeLink : linkStyle;
                  }}
                  className={'activeLink'}
                >
                  <Center
                    fontFamily={'serif'}
                    fontStyle={'italic'}
                    fontWeight={'bold'}
                    fontSize={'2xl'}
                  >
                    <Center>Women</Center>
                  </Center>
                </NavLink>
                <NavLink
                  to="/products/off"
                  style={({ isActive }) => {
                    return isActive ? activeLink : linkStyle;
                  }}
                  className={'activeLink'}
                >
                  <Center>
                    <Center
                      fontFamily={'serif'}
                      fontStyle={'italic'}
                      fontSize={'2xl'}
                      fontWeight={'bold'}
                      color={'red.500'}
                    >
                      50% OFF
                    </Center>
                  </Center>
                </NavLink>
                <Search />

                <Center w="80px" h="5rem">
                  <User />
                </Center>

                <CartShop />
              </Flex>
            </>
          ) : (
            <>
              <Flex px="0.8rem" overflow={'hidden'}>
                <Center w="100px" h="5rem" color="#000000" overflow={'hidden'}>
                  <NavLink to="/">
                    <Image overflow={'hidden'} src={logo} />
                  </NavLink>
                </Center>

                <Spacer />

                <Search />
                <CartShop />
                <Center>
                  <IconButton
                    bgColor={'transparent'}
                    onClick={() => openMenu()}
                    icon={<HambergerMenu size="32" color="#000000" />}
                  />
                </Center>
                <Drawer
                  onClose={onClose}
                  isOpen={isOpen}
                  size="xs"
                  placement="right"
                >
                  <DrawerContent>
                    <DrawerCloseButton size="lg" />

                    <DrawerHeader
                      borderBottomWidth="2px"
                      minH="110px"
                      overflow="hidden"
                    >
                      <Center>
                        <User />
                      </Center>
                    </DrawerHeader>

                    <DrawerBody>
                      <Center width="100p%" h="5rem" color="#000000">
                        <motion.div
                          style={{
                            width: '100%',
                          }}
                          onClick={onClose}
                        >
                          <NavLink
                            to="/products/men"
                            style={({ isActive }) => {
                              return isActive ? activeLink : linkStyle;
                            }}
                          >
                            <Center>
                              <Center
                                fontFamily={'serif'}
                                fontStyle={'italic'}
                                fontSize={'2xl'}
                                fontWeight={'bold'}
                              >
                                Men
                              </Center>
                            </Center>
                          </NavLink>
                        </motion.div>
                      </Center>
                      <Center w="100%" h="5rem" color="#000000">
                        <motion.div
                          onClick={onClose}
                          style={{
                            width: '100%',
                          }}
                        >
                          <NavLink
                            to="/products/women"
                            style={({ isActive }) => {
                              return isActive ? activeLink : linkStyle;
                            }}
                          >
                            <Center>
                              <Center
                                fontFamily={'serif'}
                                fontStyle={'italic'}
                                fontSize={'2xl'}
                                fontWeight={'bold'}
                              >
                                Women
                              </Center>
                            </Center>
                          </NavLink>
                        </motion.div>
                      </Center>

                      <Center w="100%" h="5rem" color="red.400">
                        <motion.div
                          onClick={onClose}
                          style={{
                            width: '100%',
                          }}
                        >
                          <NavLink
                            to="/products/off"
                            style={({ isActive }) => {
                              return isActive ? activeLink : linkStyle;
                            }}
                          >
                            <Center>
                              <Center
                                fontFamily={'serif'}
                                fontStyle={'italic'}
                                fontSize={'2xl'}
                                fontWeight={'bold'}
                                color={'red.500'}
                              >
                                50% OFF
                              </Center>
                            </Center>
                          </NavLink>
                        </motion.div>
                      </Center>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Flex>
            </>
          )}
        </Box>
      </Center>
    </>
  );
};

export default Navbar;
