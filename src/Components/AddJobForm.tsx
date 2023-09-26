import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
} from "@chakra-ui/react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

const AddJobForm = ({ isOpen, onClose }) => {
  const [jobData, setJobData] = useState({
    company_name: "",
    position: "",
    listing_link: "",
    notes: "",
  });

  //didn't put in useEffect because I only want to POST when we click Submit -> NOT every change
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("/application", {
        method: "POST",
        body: JSON.stringify({ jobData }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => console.log("successfully posted job!"));
    } catch {
      console.log("job post unsuccessful");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData({ ...jobData, [name]: value });
    // console.log('job Data', jobData)
  };

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
                <Input
                  name="company_name"
                  value={jobData.company_name}
                  onChange={handleChange}
                  type="text"
                />
                <FormLabel>Position</FormLabel>
                <Input
                  name="position"
                  value={jobData.position}
                  onChange={handleChange}
                  type="text"
                />
                <FormLabel>Link to Job Posting</FormLabel>
                <Input
                  name="listing_link"
                  value={jobData.listing_link}
                  onChange={handleChange}
                  type="url"
                />
                <FormLabel>Notes</FormLabel>
                <Textarea
                  name="notes"
                  placeholder="Add notes on the company, references, salary & benefits, interview details, and other information that will help you on your application process!"
                  value={jobData.notes}
                  onChange={handleChange}
                  size="sm"
                />
                <FormHelperText>Add job-related notes.</FormHelperText>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="orange">
              Add Job
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddJobForm;
