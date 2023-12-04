import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Text,
  Heading,
  Image,
  Card,
  CardBody,
  Box,
  Badge,
} from '@chakra-ui/react';
const urlImage = `https://rbaomvdckrmiwqyvkrfl.supabase.co/storage/v1/object/public/products-images/`;

const CardItem = ({ item }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(urlImage + item?.imageUrl);
  }, [item]);

  let navigate = useNavigate();

  function forwardData() {
    navigate(`/productdetails/${item.name}`, {
      state: {
        item: item,
      },
    });
  }

  return (
    <>
      {item && (
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
                <Image src={image} loading="lazy" alt={item?.name} />
                <Badge
                  display={item.discount > 0 ? 'block' : 'none'}
                  position={'absolute'}
                  colorScheme={'red'}
                  variant="solid"
                  top="5"
                  right={5}
                  textAlign="end"
                >
                  <Text fontWeight={'semibold'} fontSize="medium">
                    {item.discount}% OFF
                  </Text>
                </Badge>
                <Stack mt="1rem">
                  <Text fontSize={'larger'} textTransform="capitalize">
                    {item.brand}
                  </Text>
                  <Text fontSize={'larger'} textTransform="capitalize">
                  designer : {item.designer}
                  </Text>
                  <Heading
                    overflow={'hidden'}
                    size="sm"
                    minH={'40px'}
                    textTransform="capitalize"
                  >
                    {item?.name}
                  </Heading>
                </Stack>
                <Stack direction={'row'} mt="1rem">
                  <Text fontWeight={800} fontSize={'xl'}>
                    {item?.price}$
                  </Text>
                  <Text
                    textDecoration={'line-through'}
                    color={'gray.600'}
                    textDecorationColor="red.600"
                    textDecorationThickness={'1px'}
                    display={item.discount > 0 ? 'block' : 'none'}
                  >
                    {((item.price * item.discount) / 100 + item.price).toFixed(
                      1
                    )}
                    $
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default CardItem;
