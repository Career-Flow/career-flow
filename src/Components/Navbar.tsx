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

import { HamburgerIcon, BellIcon, InfoIcon} from '@chakra-ui/icons'

const Navbar = () => {
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
        <MenuItem icon={<BellIcon />} command='⌘L'>
          Login
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Navbar