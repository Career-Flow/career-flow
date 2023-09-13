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
  Textarea
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
                <FormLabel>Link to Job Posting</FormLabel>
                <Input type="url" />
                <FormLabel>Notes</FormLabel>
                <Textarea
                    placeholder='Enter job-related notes'
                    size='sm'
                />
                <FormHelperText>Add notes on the company, references, salary & benefits, interview details, and other information that will help you on your application process!</FormHelperText>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button backgroundColor="#cf9c82" variant="ghost">Add Job</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddJobForm;
