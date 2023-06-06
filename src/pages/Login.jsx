import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Center,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import supabase from '../config/supabaseClient';
import React, { useState, useEffect } from 'react';
import { Eye, EyeSlash } from 'iconsax-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AuthError } from '@supabase/supabase-js';

export default function SimpleCard() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const scrollUp = () => {
    window.scrollTo({
      top: '0',
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    scrollUp();
  }, []);
  async function logInHandler() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast({
        title: 'error login.',
        description: 'Invalid password or email',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'login successfully.',
        description: 'welcome ',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      getSession();
    }
  }

  async function getSession() {
    const { data, error } = await supabase.auth.getSession();

    try {
      navigate(`/myaccount`, {
        state: {
          token: data.session,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box mt="2rem" px="5rem" w="full">
        <Text fontWeight={'semibold'} mr="1rem" textAlign={'center'}>
          demoEmail : demoacc@gmail.com
        </Text>
        <Text fontWeight={'semibold'} mr="1rem" textAlign={'center'}>
          demoPass : 123456789
        </Text>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: '0.3', type: 'ease-in-out' },
        }}
      >
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          width={'100%'}
          py="12"
          px="8"
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'}>
            <Stack align={'center'}>
              <Heading
                mb="0.5rem"
                overflow={'hidden'}
                fontSize={{ md: '4xl', sm: '2xl' }}
                fontStyle="italic"
              >
                Sign in to your account
              </Heading>
            </Stack>
            <Box bgColor={'white'} rounded={'lg'} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    focusBorderColor="none"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      focusBorderColor="none"
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement
                      h={'full'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? (
                        <Eye size="28" />
                      ) : (
                        <EyeSlash size="28" />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack>
                  <Stack
                    my="1rem"
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox iconColor="#000" colorScheme="gray">
                      Remember me
                    </Checkbox>
                    <Box
                      _hover={{ color: 'gray', textDecoration: 'underline' }}
                    >
                      <NavLink>Forgot password?</NavLink>
                    </Box>
                  </Stack>
                  <Text display={{ sm: 'flex', base: 'grid' }}>
                    Don't have an account?
                    <Box
                      ml="0.3rem"
                      _hover={{ color: 'gray', textDecoration: 'underline' }}
                    >
                      <NavLink to="/register">Register</NavLink>
                    </Box>
                  </Text>
                  <Center>
                    <Button
                      mt="1rem"
                      variant={'outline'}
                      border="1px solid black"
                      bg="black"
                      color="white"
                      _hover={{
                        bg: 'white',
                        color: 'black',
                      }}
                      width={'200px'}
                      onClick={logInHandler}
                    >
                      Sign in
                    </Button>
                  </Center>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </motion.div>
    </>
  );
}
