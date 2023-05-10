import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Center,

} from '@chakra-ui/react';

import { ArrowRight2, ArrowLeft2 } from 'iconsax-react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import CardItem from './CardItem';

// Settings for the slider
const settings = {
  infinite: true,
  lazyLoad: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  pauseOnHover: true,
  
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function CaptionCarousel({ mod }) {

  const [slider, setSlider] = useState();

  const menItems = useSelector((state) => state.menProducts.value);
  const womenItems = useSelector((state) => state.womenProducts.value);

  // const top = useBreakpointValue({ base: '50%', sm: '50%' });
  // const side = useBreakpointValue({ base: '8%', sm: '40px' });
  const top = useBreakpointValue({
    md: '60%',
    sm: '50%',
    lg: '50%',
    base: '60%',
  });
  const side = useBreakpointValue({
    md: '30px',
    sm: '30px',
    lg: '30px',
    base: '20px',
  });
  let menProducts = [];
  for (let i = 0; i < 7; i++) {
    menProducts.push(menItems[i]);
  }

  let womenProducts = [];
  for (let i = 0; i < 7; i++) {
    womenProducts.push(womenItems[i]);
  }

  return (
    <Center>
      <Box
        position={'relative'}
        height={'550px'}
        width={'full'}
        overflow={'hidden'}
        alignContent="center"
        justifyContent="center"
        mx={'2rem'}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -300%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <ArrowLeft2 size="32" color="#000000" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -300%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <ArrowRight2 size="32" color="#000000" />
        </IconButton>
        {/* Slider */}

        <Slider
          {...settings}
          ref={(slider) => setSlider(slider)}
          style={{ overflow: 'hidden' }}
        >
          {mod === true
            ? womenProducts.map((item) => {
                return (
                  <Center p={0} key={item?.id}>
                    <CardItem item={item} />
                  </Center>
                );
              })
            : menProducts.map((item) => {
                return (
                  <Center p={2} key={item?.id}>
                    <CardItem item={item} />
                  </Center>
                );
              })}
        </Slider>
      </Box>
    </Center>
  );
}

{
  /* {cards.map((card, index) => (
            <Box key={index} overflow="hidden" position="relative" px="2rem">
              <NavLink>
                <Center>
                   <Image src={card?.image} height={'300px'} />
                  <Button
                    mt="1rem"
                    variant="ghost"
                    colorScheme="blackAlpha.900"
                    _hover={{
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                    textTransform="uppercase"
                  >
                    25 dollars
                  </Button> 
                  <CardItem />
                </Center>
              </NavLink>
            </Box>
          ))} */
}
