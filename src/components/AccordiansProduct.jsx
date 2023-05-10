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
const AccordiansProduct = ({ items }) => {
  const [priceFilter, setPriceFilter] = useState([0, 1500]);

  let brands = [];
  items.forEach((item) => {
    if (!brands.includes(item.brand)) {
      brands.push(item.brand);
    }
    return brands;
  });

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
                      Manufacturer
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
                      <Checkbox iconColor="#000" defaultChecked>
                        All
                      </Checkbox>

                      {brands.map((brand, i) => {
                        return (
                          <Checkbox key={i} iconColor="#000">
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
                      defaultValue={[0, 1500]}
                      min={0}
                      max={1500}
                      step={30}
                      onChangeEnd={(val) => setPriceFilter(val)}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack bg="blackAlpha.900" />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Text>{priceFilter[0]}$</Text>
                    <Text>{priceFilter[1]}$</Text>
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
                      How to buy
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
                      <Checkbox iconColor="#000">USD</Checkbox>
                      <Checkbox iconColor="#000">Crypto</Checkbox>
                      <Checkbox iconColor="#000"> EUR</Checkbox>
                      <Checkbox iconColor="#000"> IRR</Checkbox>
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
