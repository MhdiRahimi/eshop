import React from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  Tooltip,
  Center,
} from '@chakra-ui/react';
import { Instagram } from 'iconsax-react';
import { RiUserLine } from 'react-icons/ri';
import { BiPhone } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';

const ContactUs = () => {
  return (
    <>
      <Flex
        align="center"
        justify="center"
        id="contact"
        border="1px solid black"
        px={{base:'1', md:"5rem"}}
        py="3rem"
        bgColor={'white'}
      >
        <Stack borderRadius="lg" spacing={{ base: 2, md: 4, lg: 10 }}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>

            <InputGroup>
              <InputLeftElement children={<RiUserLine size={20} />} />
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                width={'1200px'}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>

            <InputGroup>
              <InputLeftElement children={<HiOutlineMail size={20} />} />
              <Input type="email" name="email" placeholder="Your Email" />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>

            <InputGroup>
              <InputLeftElement children={<BiPhone size={20} />} />
              <Input
                type="number"
                name="phoneNumber"
                placeholder="Your Phone"
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>

            <Textarea
              name="message"
              placeholder="Your Message"
              rows={6}
              resize="none"
            />
          </FormControl>

          <Center>
            <Button
              variant={'outline'}
              border="1px solid black"
              bg="black"
              color="white"
              _hover={{
                bg: 'white',
                color: 'black',
              }}
              width={'200px'}
            >
              Send Message
            </Button>
          </Center>
        </Stack>
      </Flex>
    </>
  );
};

export default ContactUs;
