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
import { fetchMenClothes } from '../features/menClothesSlice';
import CardItem from '../components/CardItem';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TabsProduct from '../components/TabsProduct';
import BraedsProducts from '../components/BraedsProducts';
import AccordiansProduct from '../components/AccordiansProduct';
import supabase from '../config/supabaseClient';
import { fetchWomenClothes } from '../features/womenClothesSlice';
import { fetchOffClothes } from '../features/offClothes';
const Products = () => {
  const [isLargerThan530] = useMediaQuery('(min-width: 520px)');
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [title, setTitle] = useState('');
  const [filterItems, setFilterItems] = useState([]);
  const dispatch = useDispatch();
  // let offItems = menItems.concat(womenItems);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectDesigner, setSelectDesigner] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 150]);
  const loaction = useLocation();
  const menClothes = useSelector((state) => state.menProducts.value);
  const womenClothes = useSelector((state) => state.womenProducts.value);
  const off = useSelector((state) => state.offProducts.value);
  useEffect(() => {
    dispatch(fetchMenClothes());
    dispatch(fetchWomenClothes());
    dispatch(fetchOffClothes());
  }, [dispatch]);

  useEffect(() => {
    switch (location.pathname) {
      case '/products/men':
        setItems(menClothes);
        setTitle('Fashion Men');
        break;
      case '/products/women':
        setItems(womenClothes);
        setTitle('Fashion Women');
        break;

      case '/products/off':
        setItems(off);
        setTitle('50% Off');
        break;
      default:
        setItems(menClothes);
    }
  }, [location, items, menClothes, womenClothes]);

  // useEffect(() => {
  //   switch (activeTab) {
  //     case 'All':
  //       setFilterItems(items);
  //       break;
  //     case 'Clothing':
  //       setFilterItems(items.filter((i) => i.category === 'clothing'));

  //       break;
  //     case 'Shoes':
  //       setFilterItems(items.filter((i) => i.category === 'shoes'));

  //       break;
  //     case 'Bags':
  //       setFilterItems(items.filter((i) => i.category === 'bags'));

  //       break;
  //     case 'Accessories':
  //       setFilterItems(items.filter((i) => i.category === 'accessories'));

  //       break;
  //     default:
  //       setFilterItems(items);
  //       break;
  //   }
  // }, [activeTab, items]);
  // useEffect(() => {
  //   // Filter items based on selected brands, designers, and price range
  //   const filteredItems = items.filter((item) => {
  //     const brandMatch =
  //       selectedBrands.length === 0 || selectedBrands.includes(item.brand);

  //     const designerMatch =
  //       selectDesigner.length === 0 || selectDesigner.includes(item.designer);

  //     const priceMatch =
  //       item.price >= selectedPriceRange[0] &&
  //       item.price <= selectedPriceRange[1];

  //     return brandMatch && designerMatch && priceMatch;
  //   });

  //   // Update the state with the filtered items
  //   setFilterItems(filteredItems);
  // }, [selectedBrands, selectDesigner, selectedPriceRange]);

  // useEffect(() => {
  //   // Filter items based on selected brands
  //   const filteredItems = items.filter((item) => {
  //     // If no brands are selected, show all items
  //     if (selectDesigner.length === 0) {
  //       return true;
  //     }
  //     // Check if the item's brand is in the selected brands
  //     return selectDesigner.includes(item.designer);
  //   });

  //   // Update the state with the filtered items
  //   setFilterItems(filteredItems);
  // }, [selectDesigner]);

  useEffect(() => {
    // Filter items based on the active tab
    let filteredByTabItems = [];
    switch (activeTab) {
      case 'All':
        filteredByTabItems = items;
        break;
      case 'Clothing':
        filteredByTabItems = items.filter((i) => i.category === 'clothing');
        break;
      case 'Shoes':
        filteredByTabItems = items.filter((i) => i.category === 'shoes');
        break;
      case 'Bags':
        filteredByTabItems = items.filter((i) => i.category === 'bags');
        break;
      case 'Accessories':
        filteredByTabItems = items.filter((i) => i.category === 'accessories');
        break;
      default:
        filteredByTabItems = items;
        break;
    }

    // Filter items based on selected brands, designers, and price range
    const filteredItems = filteredByTabItems.filter((item) => {
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(item.brand);

      const designerMatch =
        selectDesigner.length === 0 || selectDesigner.includes(item.designer);

      const priceMatch =
        item.price >= selectedPriceRange[0] &&
        item.price <= selectedPriceRange[1];

      return brandMatch && designerMatch && priceMatch;
    });

    // Update the state with the filtered items
    setFilterItems(filteredItems);
  }, [activeTab, items, selectedBrands, selectDesigner, selectedPriceRange]);

  
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
            <AccordiansProduct
              items={items}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedPriceRange={selectedPriceRange}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectDesigner={selectDesigner}
              setSelectDesigner={setSelectDesigner}
            />
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
