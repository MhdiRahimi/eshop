import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../features/cartSlice';

export default function socialProfileWithImageHorizontal({
  foundItem,
  close,
  status,
}) {
  let offPrice =
    (foundItem?.price * foundItem?.discount) / 100 + foundItem?.price;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  function forwardData() {
    close();
    navigate(`/productdetails/${foundItem.name}`, {
      state: {
        item: foundItem,
      },
    });
  }

  const toast = useToast();
  function addToCart() {
    dispatch(addCart(foundItem));
    toast({
      title: 'add item.',
      description: 'added to cart',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    });
  }

  const urlImage = `https://rbaomvdckrmiwqyvkrfl.supabase.co/storage/v1/object/public/products-images/`;
  return (
    <>
      <Center py={6} onClick={!status && forwardData}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '80%', md: '800px', base: '100%' }}
          height={{ sm: 'auto', md: '19rem' }}
          direction={{ base: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          padding={{ sm: 1, md: 2, base: 0 }}
        >
          <Flex flex={1} position={'relative'}>
            <Badge
              display={foundItem.discount > 0 ? 'block' : 'none'}
              zIndex={2}
              position={'absolute'}
              colorScheme={'red'}
              variant="solid"
            >
              <Text fontWeight={'semibold'} fontSize="medium">
                {foundItem.discount}% OFF
              </Text>
            </Badge>
            <Image
              objectFit="cover"
              boxSize="100%"
              src={urlImage + foundItem.imageUrl}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading
              fontSize={'2xl'}
              fontFamily={'body'}
              overflow="hidden"
              align={'center'}
              justify={'center'}
            >
              {foundItem.name}
            </Heading>
            <Text
              fontWeight={600}
              color={'gray.500'}
              size="sm"
              mb={4}
              align={'center'}
              justify={'center'}
            >
              {foundItem.brand}
            </Text>
            <Text
              align={'center'}
              justify={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              textTransform="capitalize"
            >
              {foundItem.category}
            </Text>
            <Stack
              align={'center'}
              justify={'center'}
              direction={'row'}
              overflow={'hidden'}
            >
              <Text fontSize={'2xl'} overflow={'hidden'} fontWeight={'bold'}>
                {foundItem?.price}$
              </Text>
            </Stack>
            <Text
              fontSize={'1xl'}
              overflow={'hidden'}
              fontWeight={'bold'}
              textDecoration={'line-through'}
              color={'gray.600'}
              textDecorationColor="red.600"
              textDecorationThickness={'1px'}
              display={foundItem.discount > 0 ? 'block' : 'none'}
            >
              {offPrice}$
            </Text>

            {!status && (
              <Stack
                width={'100%'}
                mt={'2rem'}
                direction={'row'}
                padding={2}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Button
                  overflow={'hidden'}
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  color={'white'}
                  bgColor={'black'}
                  _hover={{
                    backgroundColor: 'none',
                    color: 'none',
                    scale: '1.1',
                  }}
                  onClick={addToCart}
                >
                  Add to card
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
