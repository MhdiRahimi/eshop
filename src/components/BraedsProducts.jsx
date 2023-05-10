import React, { useState, useEffect } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  TabIndicator,
  Flex,
  Center,
  Text,
} from '@chakra-ui/react';

const BraedsProducts = ({ setActiveTab, activeTab }) => {
  const changeTab = (e) => {
    
    setActiveTab(e.target.innerText);
  };

  return (
    <>
      {/* <Breadcrumb>
        <BreadcrumbItem>
          <Button
            style={activeTab === 'All' ? activeLink : defaultStyle}
            variant="ghost"
            _hover={selectStyle}
            onClick={changeTab}
          >
            All
          </Button>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button
            style={activeTab === 'Clothing' ? activeLink : defaultStyle}
            variant="ghost"
            _hover={selectStyle}
            onClick={changeTab}
          >
            clothing
          </Button>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button
            style={activeTab === 'Bags' ? activeLink : defaultStyle}
            variant="ghost"
            _hover={selectStyle}
            onClick={changeTab}
          >
            bags
          </Button>
        </BreadcrumbItem>{' '}
        <BreadcrumbItem>
          <Button
            style={activeTab === 'Shoes' ? activeLink : defaultStyle}
            variant="ghost"
            _hover={selectStyle}
            onClick={changeTab}
          >
            shoes
          </Button>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button
            style={activeTab === 'Accessories' ? activeLink : defaultStyle}
            variant="ghost"
            _hover={selectStyle}
            onClick={changeTab}
          >
            Accessories
          </Button>
        </BreadcrumbItem>
      </Breadcrumb> */}
      <Flex justifyContent={'center'} mt="5rem">
        <Center>
          <Tabs
            position="relative"
            variant="unstyle"
            overflow={'hidden'}
            isManual
            lazyBehavior="LazyMode"
          >
            <TabList px="2rem" justifyContent={'center'} overflow={'hidden'}>
              <Tab
                _selected={selectStyle}
                onClick={changeTab}
                fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                fontWeight={'semibold'}
              >
                All
              </Tab>
              <Tab
                _selected={selectStyle}
                onClick={changeTab}
                fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                fontWeight={'semibold'}
              >
                Clothing
              </Tab>
              <Tab
                _selected={selectStyle}
                onClick={changeTab}
                fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                fontWeight={'semibold'}
              >
                Bags
              </Tab>
              <Tab
                _selected={selectStyle}
                onClick={changeTab}
                fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                fontWeight={'semibold'}
              >
                Shoes
              </Tab>
              <Tab
                _selected={selectStyle}
                onClick={changeTab}
                fontSize={{ sm: '15px', md: '20px', base: '10px' }}
                fontWeight={'semibold'}
              >
                Accessories
              </Tab>
            </TabList>
          
          </Tabs>
        </Center>
      </Flex>
    </>
  );
};

export default BraedsProducts;

const selectStyle = {
  color: 'white',
  backgroundColor: 'black',
  transition: ' all 0.3s linear',
  borderRadius: '3px',
};

const defaultStyle = {
  textTransform: 'capitalize ',
  overflow: 'hidden',
  borderRadius: '3px',
  padding: '1rem',
};

const activeLink = {
  color: 'white',
  backgroundColor: 'black',
  transition: ' all 0.1s linear',
  textTransform: 'capitalize ',
  padding: '1rem',
  borderRadius: '3px',
};
