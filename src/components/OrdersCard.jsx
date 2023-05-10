import {
  Box,
  Card,
  Flex,
  Grid,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Badge,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const OrdersCard = ({ data }) => {
  const menItems = useSelector((state) => state.menProducts.value);
  const womenItems = useSelector((state) => state.womenProducts.value);

  let allItems = menItems.concat(womenItems);

  let items = [];

  for (let item of allItems) {
    if (item.id === data.product_id) {
      items.push({ ...item });
    }
  }

  return (
    <>
      <Flex justify={'center'} mb="3rem">
        <Card
          direction={{ base: 'column', md: 'row' }}
          overflow="hidden"
          variant="outline"
          
        >
          <Image
            objectFit="contain"
            w={{ base: '100%', md: '200px',}}
           
            src={items.map((src) => src.images.img1)}
            alt={data.title}
          />

          <Flex w={'500px'}>
            <CardBody>
              <Heading overflow={'hidden'} size="md">
                {data?.title}
              </Heading>

              <Heading overflow={'hidden'} size="sm" my="2">
                Qty :{data?.quanty}
              </Heading>
              <Heading overflow={'hidden'} size="sm" my="2">
                Price :{data.price}$
              </Heading>
             
                <Badge variant="solid" colorScheme="green" p="0.2rem">
                  Delivered
                </Badge>

                <Text mt='1rem'>{data?.created_at}</Text>
            
            </CardBody>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};

export default OrdersCard;
