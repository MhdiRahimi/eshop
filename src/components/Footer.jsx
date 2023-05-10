import {
  Box,
  chakra,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Center,
  Tooltip,
  Button,
  AvatarGroup,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/eshop-low-resolution-logo-black-on-transparent-background.svg';
import {
  Instagram,
  Whatsapp,
  Facebook,
  Bitcoin,
  Tether,
  Ethereum,
  Cardano,
  Paypal,
  DollarCircle,
} from 'iconsax-react';

export default function SmallCentered() {
  return (
    <Box bg="#fff" borderTop={'2px solid black'} mt="4rem">
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Center w="100px" h="5rem" color="#000000">
          <NavLink to="/">
            <img src={logo} />
          </NavLink>
        </Center>
        <Center>
          <Text>PAY USING</Text>
        </Center>
        <Stack direction="row">
          <Cardano size="32" />
          <Bitcoin size="32" />
          <Ethereum size="32" />
          <Tether size="32" />
          <DollarCircle size="32" />
          <Paypal size="32" />
        </Stack>
        <Divider orientation="horizontal" borderColor={'blackAlpha.900'} />
      </Container>

      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© Eshop </Text>
        <Stack direction={'row'} spacing={6} cursor="pointer">
          <Tooltip label={'Facebook'}>
            <Facebook size="32" color="#000000" />
          </Tooltip>
          <Tooltip label={'Whatsapp'}>
            <Whatsapp size="32" color="#000000" />
          </Tooltip>
          <Tooltip label="Instagram">
            <Instagram size="32" color="#000000" />
          </Tooltip>
        </Stack>
      </Container>
    </Box>
  );
}
