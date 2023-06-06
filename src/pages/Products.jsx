import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Center,
  Heading,
  Divider,
  Flex,
  Grid,
  useMediaQuery,
  GridItem,
} from '@chakra-ui/react';

import CardItem from '../components/CardItem';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TabsProduct from '../components/TabsProduct';
import BraedsProducts from '../components/BraedsProducts';
import AccordiansProduct from '../components/AccordiansProduct';
const Products = () => {
  const [isLargerThan530] = useMediaQuery('(min-width: 520px)');
  const menItems = useSelector((state) => state.menProducts.value);
  const womenItems = useSelector((state) => state.womenProducts.value);
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [title, setTitle] = useState('');
  const [filterItems, setFilterItems] = useState([]);

  let offItems = menItems.concat(womenItems);
  const location = useLocation();
  const scrollUp = () => {
    window.scrollTo({
      top: '0',
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    scrollUp();
  }, []);
  useEffect(() => {
    switch (location.pathname) {
      case (location.pathname = '/products/men'):
        setItems(menItems);
        setTitle('Fashion Men');
        break;
      case (location.pathname = '/products/women'):
        setItems(womenItems);
        setTitle('Fashion women');

        break;
      case (location.pathname = '/products/off'):
        setItems(
          offItems.filter((item) => {
            if (item.off > 0) {
              return item;
            }
          })
        );
        setTitle('UP To 50% OFF');
        break;

      default:
        setItems();
    }
  }, [location]);

  useEffect(() => {
    switch (activeTab) {
      case 'All':
        setFilterItems(items);
        break;
      case 'Clothing':
        setFilterItems(items.filter((i) => i.category === 'clothing'));
        break;
      case 'Shoes':
        setFilterItems(items.filter((i) => i.category === 'shoes'));
        break;
      case 'Bags':
        setFilterItems(items.filter((i) => i.category === 'bags'));
        break;
      case 'Accessories':
        setFilterItems(items.filter((i) => i.category === 'accessories'));
        break;
      default:
        setFilterItems(items);
        break;
    }
  }, [activeTab, items]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: '0.3', type: 'ease-in-out' },
      }}
    >
      <Box mx="auto">
        <Center>
          {' '}
          <Heading
            px="3rem"
            mt="5rem"
            mb="0.5rem"
            overflow={'hidden'}
            fontSize={{ md: '4xl', sm: '2xl' }}
            fontStyle="italic"
            fontFamily={'serif'}
            fontWeight={''}
          >
            {title}
          </Heading>
        </Center>
        <Center>
          <Divider width={'90%'} borderColor={'blackAlpha.900'} mx="3rem" />
        </Center>

        {isLargerThan530 === true ? (
          <>
            <Flex mt="3.2rem" px="2rem" justifyContent="center">
              <BraedsProducts
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </Flex>
          </>
        ) : (
          <>
            <Box px="3rem" mt="1rem" mb="2rem" overflow={'hidden'}>
              <TabsProduct activeTab={activeTab} setActiveTab={setActiveTab} />
            </Box>
          </>
        )}

        <Grid
          px="3rem"
          gap={3}
          mt={{ sm: '5rem' }}
          templateColumns={{
            base: 'repeat(1, 12fr)',
            sm: 'repeat(1, 12fr)',
            md: 'repeat(3,12fr)',
            lg: 'repeat(3,12fr)',
          }}
        >
          <GridItem colSpan={1} p="0.3rem">
            <AccordiansProduct items={items} />
          </GridItem>
          <GridItem colSpan={2} mt={{ sm: '-1rem' }}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: '0.3', type: 'ease-in-out' },
              }}
            >
              <SimpleGrid
                templateColumns={{
                  sm: 'repeat(1, 12fr)',
                  md: 'repeat(3,12fr)',
                  lg: 'repeat(3,12fr)',
                  '2xl': 'repeat(5,12fr)',
                }}
              >
                {' '}
                {filterItems.map((item) => {
                  return (
                    <Center key={item.id} mt={{ sm: '0rem' }}>
                      <CardItem item={item} />
                    </Center>
                  );
                })}
              </SimpleGrid>
            </motion.div>
          </GridItem>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Products;
