import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  CheckboxGroup,
  Checkbox,
  Stack,
  AccordionPanel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';
import { Add, Minus } from 'iconsax-react';
const AccordiansProduct = ({
  items,
  setSelectedPriceRange,
  selectedPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectDesigner,
  setSelectDesigner,
}) => {
  // const [selectedBrands, setSelectedBrands] = useState([]);
  // const [priceFilter, setPriceFilter] = useState([0, 150]);

  let brands = [];
  items.forEach((item) => {
    if (!brands.includes(item.brand)) {
      brands.push(item.brand);
    }
    return brands;
  });
  let designers = [];
  items.forEach((item) => {
    if (!designers.includes(item.designer)) {
      designers.push(item.designer);
    }
    return designers;
  });

  console.log(items);

  const brandChange = (e) => {
    const { value, checked } = e.target;
    setSelectedBrands((prevSelectedBrands) =>
      checked
        ? [...prevSelectedBrands, value]
        : prevSelectedBrands.filter((brand) => brand !== value)
    );
  };

  const designerChange = (e) => {
    const { value, checked } = e.target;
    setSelectDesigner((prevSelectDesigner) =>
      checked
        ? [...prevSelectDesigner, value]
        : prevSelectDesigner.filter((designer) => designer !== value)
    );
  };
  return (
    <>
      <Box>
        <Accordion allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Brands
                    </Box>
                    {!isExpanded ? (
                      <Add size="22" color="#000" />
                    ) : (
                      <Minus size="22" color="#000" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <CheckboxGroup colorScheme="gray">
                    <Stack>
                      {brands.map((brand, i) => {
                        return (
                          <Checkbox
                            key={i}
                            iconColor="#000"
                            value={brand}
                            onChange={brandChange}
                          >
                            {brand}
                          </Checkbox>
                        );
                      })}
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Filter by price
                    </Box>
                    {!isExpanded ? (
                      <Add size="22" color="#000" />
                    ) : (
                      <Minus size="22" color="#000" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <RangeSlider
                      aria-label={['min', 'max']}
                      defaultValue={[0, 100]}
                      min={0}
                      max={150}
                      step={1}
                      onChangeEnd={(val) => setSelectedPriceRange(val)}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack bg="blackAlpha.900" />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Text>{selectedPriceRange[0]}$</Text>
                    <Text>{selectedPriceRange[1]}$</Text>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Designer
                    </Box>
                    {!isExpanded ? (
                      <Add size="22" color="#000" />
                    ) : (
                      <Minus size="22" color="#000" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <CheckboxGroup colorScheme="whiteAlpha">
                    <Stack>
                      {designers.map((designer, i) => {
                        return (
                          <Checkbox
                            key={i}
                            iconColor="#000"
                            value={designer}
                            onChange={designerChange}
                          >
                            {designer}
                          </Checkbox>
                        );
                      })}
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default AccordiansProduct;
