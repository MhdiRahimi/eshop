import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Stack,
  Text,
  Heading,
  Image,
  Card,
  CardBody,
  Box,
  Badge,
  Button,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../features/counterSlice';
import { motion } from 'framer-motion';

const CardItem = ({ item }) => {
  const [image, setImage] = useState(item.images?.img1);

  useEffect(() => {
    setImage(item?.images?.img1);
  }, [item]);
  let offPrice = (item.price * item.off) / 100 + item.price;

  let navigate = useNavigate();

  function forwardData() {
   
    navigate(`/productdetails/${item.title}`, {
      state: {
        item: item,
      },
    });
    
  }
  return (
    <>
      <Box onClick={forwardData}>
        <Stack>
          <Card
            maxW="sm"
            bgColor={'transparent.900'}
            minH={'450px'}
            rounded="0"
            boxShadow={0}
          >
            <CardBody mt={{ sm: '0rem' }}>
              <Image
                src={image}
                onMouseEnter={() => setImage(item.images?.img2)}
                onMouseOut={() => setImage(item.images.img1)}
                loading="lazy"
                alt={item?.title}
              />
              <Badge
                display={item.off > 0 ? 'block' : 'none'}
                position={'absolute'}
                colorScheme={'red'}
                variant="solid"
                top="5"
                right={5}
                textAlign="end"
              >
                <Text fontWeight={'semibold'} fontSize="medium">
                  {item.off}% OFF
                </Text>
              </Badge>
              <Stack mt="1rem">
                <Text fontSize={'larger'} textTransform="capitalize">
                  {item.brand}
                </Text>

                <Heading
                  overflow={'hidden'}
                  size="sm"
                  minH={'40px'}
                  textTransform="capitalize"
                >
                  {item?.title}
                </Heading>
              </Stack>
              <Stack direction={'row'} mt="1rem">
                <Text fontWeight={800} fontSize={'xl'}>
                  {item.price}$
                </Text>
                <Text
                  textDecoration={'line-through'}
                  color={'gray.600'}
                  textDecorationColor="red.600"
                  textDecorationThickness={'1px'}
                  display={item.off > 0 ? 'block' : 'none'}
                >
                  {offPrice.toFixed(1)}$
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default CardItem;
