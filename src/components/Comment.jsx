import {
  Stack,
  Box,
  Card,
  CardBody,
  Avatar,
  Flex,
  Text,
  Badge,
  CardHeader,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
const Comment = () => {
  return (
    <Box>
      <Stack
        border="1px solid black"
        px={{ base: '1', md: "5rem" }}
        py="3rem"
        bgColor={'white'}
        spacing={{ base: 2, md: 4, lg: 10 }}
      >
        <Box width={'1200px'}></Box>
        <Card bg={'rgba(0,0,0,0.5)'}>
          <CardHeader>
            <Flex>
              <Avatar icon={<AiOutlineUser fontSize="1.5rem" />} />
              <Box ml="3" mt="0.5rem">
                <Text fontWeight="bold">Segun Adebayo</Text>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            voluptates cupiditate explicabo!
          </CardBody>
        </Card>
        <Card bg={'rgba(0,0,0,0.5)'}>
          <CardHeader>
            <Flex>
              <Avatar icon={<AiOutlineUser fontSize="1.5rem" />} />
              <Box ml="3" mt="0.5rem">
                <Text fontWeight="bold">Segun Adebayo</Text>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            voluptates cupiditate explicabo!
          </CardBody>
        </Card>
        <Card bg={'rgba(0,0,0,0.5)'}>
          <CardHeader>
            <Flex>
              <Avatar icon={<AiOutlineUser fontSize="1.5rem" />} />
              <Box ml="3" mt="0.5rem">
                <Text fontWeight="bold">Segun Adebayo</Text>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            voluptates cupiditate explicabo!
          </CardBody>
        </Card>
      </Stack>
    </Box>
  );
};

export default Comment;
