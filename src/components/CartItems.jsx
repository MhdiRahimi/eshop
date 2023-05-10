import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Button,
  Heading,
  Flex,
  Box,
  useToast,
} from '@chakra-ui/react';
import { Heart, Share, Minus, Add } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/cartSlice';
import { NavLink, useNavigate } from 'react-router-dom';
const CartItems = ({ item, qty }) => {
  const dispatch = useDispatch();
  let price = (item.price * item.quanty).toFixed(1);
  let navigate = useNavigate();
  function forwardData() {
    navigate(`/productdetails/${item.title}`, {
      state: {
        item: item,
      },
    });
  }
  const toast = useToast();
  function removeItems() {
    dispatch(removeItem(item));
    toast({
      title: 'item removed.',
      status: 'error',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  return (
    <Box py="1rem" overflow="hidden">
      <Card
        direction={{ base: 'row' }}
        overflow="hidden"
        variant="outline"
        h="200px"
      >
        <Image
          objectFit="cover"
          minW="200px"
          h="200px"
          src={item?.images?.img1}
          alt={item.title}
          onClick={forwardData}
          cursor={'pointer'}
        />

        <Stack overflow="hidden" mt="-1rem">
          <CardBody overflow="hidden">
            <Text fontSize={'1xl'} overflow={'hidden'} fontWeight={'bold'}>
              {item.title}
            </Text>
            <Text
              fontSize={'sm'}
              overflow={'hidden'}
              fontWeight={'bold'}
              color="blackAlpha.700"
            >
              {item.brand}
            </Text>

            <Text>Qty : {item.quanty}</Text>

            <Text
              fontSize={'1xl'}
              overflow={'hidden'}
              fontWeight={'bold'}
              mt={'1rem'}
            >
              {price}$
            </Text>
            <Button variant="link" mt="1rem" onClick={removeItems}>
              Remove
            </Button>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default CartItems;
