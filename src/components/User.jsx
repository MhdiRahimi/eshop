import React, { useState, useEffect } from 'react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  Tooltip,
  IconButton,
  Button,
  useMediaQuery,
  Text,
  Center,
  Grid,
  Heading,
} from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RiUserLine, RiSearchLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../config/supabaseClient';

const User = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [user, setUser] = useState(null);
  async function getToken() {
    const { data, error } = await supabase.auth.getSession();
    try {
      setUser(data.session.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, [location]);
  async function logOut(e) {
    e.preventDefault();
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  }

  const [matches] = useMediaQuery('(min-width: 920px)');
  return (
    <>
      {!matches ? (
        <Grid>
          <NavLink to={user ? 'myaccount' : 'login'}>
            <Center>
              <IconButton
                ml="0.5rem"
                variant="unstyle"
                icon={<RiUserLine size="32" />}
              />
            </Center>
            {user ? (
              <Heading mt="1rem" overflow="hidden" size={'sm'}>
                {' '}
                {user.email}
              </Heading>
            ) : (
              <Text>Sigin in</Text>
            )}
          </NavLink>
        </Grid>
      ) : (
        <Box overflow="hidden">
          {user ? (
            <Menu>
              <MenuButton colorScheme="pink">
                <Tooltip label="Sign in">
                  <NavLink>
                    <IconButton
                      variant="unstyle"
                      icon={<RiUserLine size="28" />}
                    />
                  </NavLink>
                </Tooltip>
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <NavLink to="myaccount">
                    <MenuItem value="myAccount">My Account</MenuItem>
                  </NavLink>
                  <NavLink to="orders">
                    <MenuItem value="Orders">Orders</MenuItem>
                  </NavLink>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Contact us</MenuItem>
                  <MenuItem onClick={logOut} color="red.500">
                    LogOut
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <NavLink to="login">
              <IconButton variant="unstyle" icon={<RiUserLine size="28" />} />
            </NavLink>
          )}
        </Box>
      )}
    </>
  );
};

export default User;

const linkStyle = {
  backgroundColor: 'white',
  color: 'black',
};
const activeLink = {
  backgroundColor: 'yellow',
  color: 'white',

  justifyContent: 'center',
};

// sb-rbaomvdckrmiwqyvkrfl-auth-token

//sb-rbaomvdckrmiwqyvkrfl-auth-token
