import {
  Box,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  DrawerFooter,
  Center,
  Tooltip,
  IconButton,
  Button,
} from '@chakra-ui/react';
import CardSearch from './CardSearch';
import { RiUserLine, RiSearchLine } from 'react-icons/ri';
import React, { useState, useEffect } from 'react';
import { Autocomplete } from 'chakra-ui-simple-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import { motion } from 'framer-motion';
import { fetchAllClothes } from '../features/allClothsSlice';

const Search = () => {
  const dispatch = useDispatch();
  const allClothes = useSelector((state) => state.allClothes.value);

  const [result, setResult] = useState('');

  useEffect(() => {
    dispatch(fetchAllClothes());
  }, [dispatch]);

  // Filter items based on the search input
  const filteredItems = allClothes.filter((item) => {
    const lowercasedQuery = result.toLowerCase();

    // Check if the name, brand, or designer includes the search query
    return (
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.brand.toLowerCase().includes(lowercasedQuery) ||
      item.designer.toLowerCase().includes(lowercasedQuery)
    );
  });
  const {
    onOpen: onOpenSearch,
    isOpen: isOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure();
  const openSearchInput = () => {
    onOpenSearch();
    setFoundItem('');
  };

  return (
    <>
      <Center w="80px" h="5rem">
        <Tooltip label="Search">
          <IconButton
            onClick={() => openSearchInput()}
            variant="unstyle"
            icon={<RiSearchLine size="28" />}
          />
        </Tooltip>
      </Center>

      <Drawer
        onClose={onCloseSearch}
        isOpen={isOpenSearch}
        size="full"
        placement="top"
        blockScrollOnMount
      >
        <DrawerOverlay />
        <DrawerContent bgColor="rgba(255, 251, 251, 0.8)">
          <DrawerCloseButton bgColor={'white'} color="black" size={'lg'} />

          <DrawerBody mt="5rem">
            <Center
              rounded={'lg'}
              mx={{ md: '8rem', sm: '1rem', base: '0.5rem' }}
              display="flex"
            >
              <input
                className="input"
                placeholder="Search"
                value={result}
                onChange={(e) => setResult(e.target.value)}
              />

              {/* <Box
                display={'flex'}
                justifyContent={'flex-end'}
                placeItems={'center'}
              >
                <Button position={'fixed'} variant={'unstyled'} mr="0.5rem">
                  <RiSearchLine size={30} />
                </Button>
              </Box> */}
            </Center>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              {result && (
                <Box shadow="md">
                  {filteredItems.map((item, i) => {
                    return (
                      <CardSearch
                        key={i}
                        foundItem={item}
                        close={onCloseSearch}
                      />
                    );
                  })}
                </Box>
              )}
            </motion.div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Search;
