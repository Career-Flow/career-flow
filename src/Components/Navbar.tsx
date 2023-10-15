import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { HamburgerIcon, BellIcon, InfoIcon } from '@chakra-ui/icons';

function Navbar() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // pass new job object to back

      const data = await response.json();
      if (data) { console.log('Logged out Successfully!'); }
    } catch (err) {
      console.log(`updateDB unsuccessful ${err}`);
    }
    navigate('/login');
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        m={2}
      />
      <MenuList>
        <MenuItem icon={<InfoIcon />} command="⌘P">
          Profile
        </MenuItem>
        <MenuItem icon={<BellIcon />} command="⌘L" onClick={handleLogOut}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Navbar;
