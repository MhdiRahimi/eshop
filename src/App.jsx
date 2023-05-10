import { ChakraProvider } from '@chakra-ui/react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './app.css';
import RouterAnimate from './components/RouterAnimate';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    nav: `'PT Serif', serif`,
    body: `'Raleway', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="app">
        <Navbar />
        <RouterAnimate />
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
