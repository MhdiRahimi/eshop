import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import offpic from '../assets/homepage/off.jpg';
import Carousel from '../components/Carousel';
import { motion } from 'framer-motion';
import Search from '../components/Search';
import supabase from '../config/supabaseClient';

const Home = () => {
  // const [session, setSession] = useState(null);
  // useEffect(() => {
  //   async function getSession() {
  //     const { data, error } = await supabase.auth.getSession();
  //     setSession(data.session);
  //   }
  //   getSession();
  // }, []);

  // console.log(session);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: '0.3', type: 'ease-in-out' },
      }}
    >
      <Stack
        direction="row"
        px="2rem"
        mt="5rem"
        zIndex="1"
        justifyContent="center"
      >
        <SimpleGrid columns={{ md: 2, sm: 1 }} spacing="10">
          <Box className="content" maxH="500px" maxW="540px">
            <NavLink to="products/men">
              <Center>
                <div className="content-overlay"></div>
                <Image
                  objectFit="contain"
                  className="content-image"
                  src={
                    'https://files.aassttiinn.com/aassttiinn-website-main/-_638111878854654994_1000.jpeg'
                  }
                />

                <div className="content-details fadeIn-bottom">
                  <Text
                    color={'whiteAlpha.900'}
                    mb="2rem"
                    fontStyle={'italic'}
                    fontSize="larger"
                  >
                    Fashion / Men
                  </Text>
                  <Button
                    bgColor="white"
                    color="black"
                    _hover={{
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                    textTransform="uppercase"
                  >
                    Shop Now
                  </Button>
                </div>
              </Center>
            </NavLink>
          </Box>

          <Box className="content" maxH="500px" maxW="540px">
            <NavLink to="products/women">
              <Center>
                <div className="content-overlay"></div>
                <Image
                  objectFit="fill"
                  src={
                    'https://files.aassttiinn.com/aassttiinn-website-main/-4_638131769643201435_1000.jpeg'
                  }
                />
                <div className="content-details fadeIn-bottom">
                  <Text
                    color={'whiteAlpha.900'}
                    mb="2rem"
                    fontStyle={'italic'}
                    fontSize="larger"
                  >
                    Fashion / Women
                  </Text>
                  <Button
                    bgColor="white"
                    color="black"
                    _hover={{
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                    textTransform="uppercase"
                  >
                    Shop Now
                  </Button>
                </div>
              </Center>
            </NavLink>
          </Box>
        </SimpleGrid>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Box mt="3rem" zIndex="1" className="content" maxH="50%" maxW="82%">
          <NavLink to={'products/off'}>
            <Image src={offpic} />

            {/* <Text
                bgColor="white"
                color="red.500"
                px="1em"
                fontSize={{ md: '50px', sm: '15px' }}
                textTransform="uppercase"
                _hover={{
                  backgroundColor: 'black',

                  transition: ' all 0.3s ease-in-out ',
                }}
              >
                up to 50% OFF
              </Text> */}
            <Badge
              position={'absolute'}
              colorScheme={'red'}
              variant="solid"
              top={'70%'}
              width="50%"
              height={{ md: '4rem', sm: 'auto' }}
              right={0}
              bgColor="whiteAlpha.900"
              _hover={{
                backgroundColor: 'black',
                transition: ' all 0.3s ease-in-out',
              }}
            >
              <Text
                fontWeight={'bold'}
                fontSize={{ md: '2xl', sm: '15px' }}
                textAlign={'end'}
                color="red.500"
                p="12px"
              >
                up to 50% OFF
              </Text>
            </Badge>
          </NavLink>
        </Box>
      </Stack>
      <Box mt="6rem" overflow={'hidden'}>
        <Center mb={'3rem'} mx="2rem">
          <Divider
            borderColor={'blackAlpha.900'}
            width={{ md: '35%', sm: '0' }}
          />
          <Heading
            fontSize={{ sm: '20px', md: '20px' }}
            mx="1rem"
            overflow={'hidden'}
          >
            Bestseller for men
          </Heading>
          <Divider
            borderColor={'blackAlpha.900'}
            width={{ md: '35%', sm: '0' }}
          />
        </Center>
        <Carousel mod={false} />
      </Box>
      <Stack overflow={'hidden'}>
        <Center mb={'3rem'} mx="2rem">
          <Divider
            borderColor={'blackAlpha.900'}
            width={{ md: '35%', sm: '0' }}
          />
          <Heading
            fontSize={{ sm: '20px', md: '20px' }}
            mx="1rem"
            overflow={'hidden'}
          >
            Bestseller for women
          </Heading>
          <Divider
            borderColor={'blackAlpha.900'}
            width={{ md: '35%', sm: '0' }}
          />
        </Center>
        <Carousel mod={true} />
      </Stack>
    </motion.div>
  );
};

export default Home;

// <Stack
//   direction="row"
//   px="1rem"
//   mt="3rem"
//   zIndex="1"
//   justifyContent="space-evenly"
// >
//   <SimpleGrid columns={{ md: 2, sm: 1 }} spacing="150">
//     <Stack direction="column">
//       <Box
//         overflow="hidden"
//         maxW="350px"
//         maxH="400px"
//         border="1px solid black"
//       >
//         <NavLink to="products">
//           <Center>
//             <Image src={women1} />
//           </Center>
//         </NavLink>
//       </Box>
//       <Center mt="2rem">
//         <Button
//           variant="outline"
//           colorScheme="blackAlpha.900"
//           _hover={{
//             backgroundColor: 'black',
//             color: 'white',
//           }}
//           textTransform="uppercase"
//         >
//           Shop new season
//         </Button>
//       </Center>
//     </Stack>
//     <Stack direction="column">
//       <Box
//         overflow="hidden"
//         maxW="350px"
//         maxH="400px"
//         border="1px solid black"
//       >
//         <NavLink to="products">
//           <Center>
//             <Image src={men1} />
//           </Center>
//         </NavLink>
//       </Box>
//       <Center mt="2rem">
//         <Button
//           variant="outline"
//           colorScheme="blackAlpha.900"
//           _hover={{
//             backgroundColor: 'black',
//             color: 'white',
//           }}
//           textTransform="uppercase"
//         >
//           Shop new season
//         </Button>
//       </Center>
//     </Stack>
//   </SimpleGrid>
// </Stack>;
