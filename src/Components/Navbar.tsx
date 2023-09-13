import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton
} from '@chakra-ui/react'
import { useNavigate} from "react-router-dom";

import { HamburgerIcon, BellIcon, InfoIcon} from '@chakra-ui/icons'



const Navbar = () => {
  
  const navigate = useNavigate();
  const handleLoginOut = () => {

    navigate('/login');
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
        m={2}
      />
      <MenuList>
        <MenuItem icon={<InfoIcon />} command='⌘P'>
          Profile
        </MenuItem>
        <MenuItem icon={<BellIcon />} command='⌘L' onClick={handleLoginOut}>
          Login
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Navbar