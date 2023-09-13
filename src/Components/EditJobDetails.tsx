import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const EditJobDetails = ({ isOpen, onClose }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            as={Editable}
            color="#9C4221"
            alignSelf="center"
            size="lg"
            defaultValue="ReactType"
          >
            <EditablePreview />
            <EditableInput />
          </ModalHeader>
          <Text textAlign="center" className="displayDate">
            09/12/23
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <Box className="addJobContent">
              <Flex display="flex" alignItems="center">
                <Text fontWeight="550">Role: </Text>
                <Editable pl="3" defaultValue="Software Engineer">
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Flex>
              <Flex display="flex" alignItems="center">
                <Text fontWeight="550">Link to Job Posting: </Text>
                <Editable
                  pl="3"
                  color="#ED8936"
                  defaultValue="https://www.codesmith.io/"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Flex>
              <Text fontWeight="550" textAlign="center">
                Notes:{" "}
              </Text>
              <Box>
                <Editable
                  pl="3"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                >
                  <EditablePreview />
                  <EditableTextarea />
                </Editable>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Box className="jobStatus">
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Status
                </MenuButton>
                <MenuList>
                  <MenuItem>Applied</MenuItem>
                  <MenuItem>Interviewing</MenuItem>
                  <MenuItem>Waiting</MenuItem>
                  <MenuItem>Accepted</MenuItem>
                  <MenuItem>Rejected</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Button backgroundColor="#cf9c82" variant="ghost">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditJobDetails;
