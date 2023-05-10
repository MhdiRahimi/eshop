import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Center,
  Image,
  Badge,
  Stack,
  Text,
  Heading,
  Card,
  CardBody,
} from '@chakra-ui/react';

import { ArrowRight2, ArrowLeft2 } from 'iconsax-react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { BiImageAlt } from 'react-icons/bi';

// Settings for the slider
const settings = {
  arrows: false,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function CarouselItemDetails({ images, items }) {
  const [slider, setSlider] = useState();

  const top = useBreakpointValue({ md: '50%', sm: '80%',lg:'70%' ,base:'50%'});
  const side = useBreakpointValue({ md: '10%', sm: '10px',lg:'10px' ,base:'10px'});

  let imgs = [];
  for (let key in images) imgs.push(images[key]);


  return (
    <Center overflow={'hidden'}>
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
        <Badge
          display={items.off > 0 ? 'block' : 'none'}
          zIndex={2}
          position={'absolute'}
          colorScheme={'red'}
          variant="solid"
          top="10"
          right={5}
          textAlign="end"
        >
          <Text fontWeight={'semibold'} fontSize="medium">
            {items.off}% OFF
          </Text>
        </Badge>
        <Slider
          {...settings}
          ref={(slider) => setSlider(slider)}
          style={{ overflow: 'hidden' }}
        >
          {imgs.map((img,i) => {
            return (
              <>
                <Image key={i} zIndex={1} src={img} />
              </>
            );
          })}
        </Slider>
      </Box>
    </Center>
  );
}

export default CarouselItemDetails;
