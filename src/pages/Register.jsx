import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react';
import { BiPhone } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'iconsax-react';
import { motion } from 'framer-motion';
import supabase from '../config/supabaseClient';
import { useToast } from '@chakra-ui/react';
export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [profile, setProfile] = useState();

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
  let navigate = useNavigate();
  async function signUpHandler() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          firstName: name,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address: address,
        },
      },
    });

    if (error) {
      toast({
        title: 'Account creation failed. .',

        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Account created seccessfully.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      setEmail();
      setPassword();
      navigate('/myaccount');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: '0.3', type: 'ease-in-out' },
      }}
    >
      <Flex align={'center'} justify={'center'} mt="3rem" w={'full'}>
        <Stack mx={'auto'} maxW={'lg'} py={12} px={6} w="100%">
          <Stack align={'center'}>
            <Heading
              mb="0.5rem"
              overflow={'hidden'}
              fontSize={{ md: '4xl', sm: '2xl' }}
              fontStyle="italic"
              textAlign={'center'}
            >
              Sign up
            </Heading>
          </Stack>
          <Box rounded={'lg'} boxShadow={'lg'} p={8} bg="white">
            <FormControl mr="5%" isRequired>
              <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                First Name
              </FormLabel>
              <Input
                placeholder="First Name"
                id="first-name"
                focusBorderColor="none"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt="1rem">
              <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                Last Name
              </FormLabel>
              <Input
                onChange={(e) => setLastName(e.target.value)}
                id="last-name"
                placeholder="Last Name"
                focusBorderColor="none"
              />
            </FormControl>

            <Box mt="1rem">
              <FormControl mt="5%" isRequired>
                <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                  Phone Number
                </FormLabel>
                <InputGroup>
                  <InputLeftElement children={<BiPhone size={20} />} />
                  <Input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="number"
                    name="phoneNumber"
                    placeholder="Your Phone"
                    focusBorderColor="none"
                  />
                </InputGroup>
              </FormControl>
            </Box>
            <Box mt="1rem">
              <FormControl mt="5%" isRequired>
                <FormLabel htmlFor="address" fontWeight={'normal'}>
                  Address
                </FormLabel>
                <Textarea
                  isRequired
                  placeholder="Address"
                  focusBorderColor="none"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </Box>
            <Stack spacing={4} mt="1rem">
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
                    type={showPassword ? 'text' : 'password'}
                    focusBorderColor="none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement
                    h={'full'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <Eye size="28" /> : <EyeSlash size="28" />}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
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
                  onClick={signUpHandler}
                >
                  Sign up
                </Button>
              </Center>
              <Stack pt={6}>
                <Text align={'center'} display="flex">
                  Already a user?{' '}
                  <Box
                    ml="0.3rem"
                    _hover={{ color: 'gray', textDecoration: 'underline' }}
                  >
                    <NavLink to="/login">Login</NavLink>
                  </Box>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </motion.div>
  );
}
