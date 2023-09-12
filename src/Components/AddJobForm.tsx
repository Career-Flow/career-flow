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
} from "@chakra-ui/react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

const AddJobForm = ({ isOpen, onClose }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="addJobContent">
              <FormControl>
                <FormLabel>Company Name</FormLabel>
                <Input type="text" />
                <FormLabel>Position</FormLabel>
                <Input type="text" />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="#cf9c82" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add Job</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddJobForm;
