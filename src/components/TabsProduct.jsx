import React from 'react';
import { Tabs, TabList, Tab, Grid, Text } from '@chakra-ui/react';
const TabsProduct = ({ setActiveTab, activeTab }) => {
  const changeTab = (e) => {
    setActiveTab(e.target.innerText);
  };
  return (
    <>
      <Tabs
        isManual
        lazyBehavior="LazyMode"
        variant={'unstyled'}
        align="center"
        overflow={'hidden'}
        size={'lg'}
      >
        <TabList overflow={'hidden'}>
          <Grid
            justifyContent="center"
            overflow="hidden"
            templateColumns="repeat(1, 12fr)"
          >
            <Tab
              rounded="sm"
              _selected={selectStyle}
              style={defaultStyleMob}
              onClick={changeTab}
            >
              <Text>All</Text>
            </Tab>
            <Tab
              rounded="sm"
              _selected={selectStyle}
              style={defaultStyleMob}
              onClick={changeTab}
            >
              <Text>clothing</Text>
            </Tab>
            <Tab
              rounded="sm"
              _selected={selectStyle}
              style={defaultStyleMob}
              onClick={changeTab}
            >
              <Text>bags</Text>
            </Tab>{' '}
            <Tab
              rounded="sm"
              _selected={selectStyle}
              style={defaultStyleMob}
              onClick={changeTab}
            >
              <Text>shoes</Text>
            </Tab>
            <Tab
              rounded="sm"
              _selected={selectStyle}
              style={defaultStyleMob}
              onClick={changeTab}
            >
              <Text>Accessories</Text>
            </Tab>
          </Grid>
        </TabList>
      </Tabs>
    </>
  );
};

export default TabsProduct;

const selectStyle = {
  color: 'white',
  backgroundColor: 'black',
  transition: ' all 0.3s linear',
  borderRadius: '3px',
};

const defaultStyleMob = {
  textTransform: 'capitalize ',
  overflow: 'hidden',

  padding: '0.5rem',
};
