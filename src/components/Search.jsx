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
import React, { useState } from 'react';
import { Autocomplete } from 'chakra-ui-simple-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import { motion } from 'framer-motion';
const Search = () => {
  const menItems = useSelector((state) => state.menProducts.value);
  const womenItems = useSelector((state) => state.womenProducts.value);
  let allItems = menItems.concat(womenItems);
  const [result, setResult] = useState('');
  const [foundItem, setFoundItem] = useState([]);
  const [err, setErr] = useState('');
  let name = allItems.map((n) => {
    return n.title;
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

  function searchHandler() {
    for (let product of allItems) {
      if (product.title.toUpperCase() === result.toUpperCase()) {
        setFoundItem(product);
      }
    }
    setResult('');
  }

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
              <Hint options={name}>
                <input
                  className="input"
                  placeholder="Search"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                />
              </Hint>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                placeItems={'center'}
              >
                <Button
                  position={'fixed'}
                  variant={'unstyled'}
                  mr="0.5rem"
                  onClick={searchHandler}
                >
                  <RiSearchLine size={30} />
                </Button>
              </Box>
            </Center>

            <motion.div
              key={foundItem?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Box
                shadow="md"
                display={foundItem?.length < 1 ? 'none' : 'block'}
              >
                {foundItem.id && (
                  <CardSearch foundItem={foundItem} close={onCloseSearch} />
                )}
              </Box>
            </motion.div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Search;
