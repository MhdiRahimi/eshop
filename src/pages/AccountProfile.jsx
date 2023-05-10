import {
  Box,
  Heading,
  Stack,
  Container,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Textarea,
  Button,
  InputGroup,
  InputLeftElement,
  Avatar,
  Text,
  useToast,
} from '@chakra-ui/react';
import { BiPhone } from 'react-icons/bi';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  redirect,
  NavLink,
} from 'react-router-dom';
import { RiUserLine } from 'react-icons/ri';
const AccountProfile = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [session, setSession] = useState();
  const [user, setUser] = useState();
  async function getToken() {
    const { data, error } = await supabase.auth.getSession();
    try {
      setSession(data.session);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    setUser(session?.user);
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
  async function logOut(e) {
    e.preventDefault();
    await supabase.auth.signOut();
    setSession(null);
    navigate('/');
    toast({
      title: 'LogOut.',
      description: 'logOut successfully',
      status: 'info',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <>
      <Container maxW={'95%'} mt="1rem" bgColor="white" minH="100vh">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: '0.3', type: 'ease-in-out' },
          }}
        >
          <Heading mt="1rem" overflow={'hidden'}>
            Profile
          </Heading>
          <Box
            mt="3rem"
            spacing="4"
            bg="rgba(0, 0, 0, 0.05)"
            p="1rem"
            rounded={'sm'}
          >
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                bg="red.500"
                size={'md'}
                icon={<RiUserLine fontSize="1.5rem" />}
              />

              <Box>
                <Heading overflow={'hidden'} size="sm">
                  {user?.user_metadata?.firstName +
                    '  ' +
                    user?.user_metadata?.lastName}
                </Heading>
                <Text>{user?.email}</Text>
              </Box>
            </Flex>
            <Flex mt={'1rem'}>
              <Heading size={'sm'} overflow={'hidden'}>
                PhoneNumber :
              </Heading>
              <Heading size={'sm'} overflow={'hidden'} ml="0.5rem">
                {' '}
                {user?.user_metadata?.phoneNumber}
              </Heading>
            </Flex>
            <Flex mt={'1rem'}>
              <Heading size={'sm'} overflow={'hidden'}>
                Address :
              </Heading>
              <Heading size={'sm'} overflow={'hidden'} ml="0.5rem">
                {' '}
                {user?.user_metadata?.address}
              </Heading>
            </Flex>

            <Box py={{ sm: '2rem', md: '2rem', base: '1rem' }}>
              <Button colorScheme="whatsapp">Edit Profile</Button>
              <Button colorScheme="red" ml="1rem" onClick={logOut}>
                Logout
              </Button>
              <Button
                bgColor="blackAlpha.800"
                color="white"
                _hover={{ bgColor: 'blackAlpha.900' }}
                ml="1rem"
                fontSize={'1xl'}
              >
                <NavLink to="/orders">Orders</NavLink>
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </>
  );
};

export default AccountProfile;
