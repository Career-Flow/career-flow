import React, { useState} from "react";
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
  const [jobData, setJobData] = useState({
    name: '',
    position: '',
    linkToJob: '',
    notes: '',
    status:'',
  })

  //didn't put in useEffect because I only want to POST when we click Submit -> NOT every change
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ jobData }),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
        .then(() => console.log('successfully posted job!'))
    } catch {
      console.log('job post unsuccessful')
    }
  };

  const handleChange=(event)=>{
    const { name, value} = event.target;
    setJobData({...jobData, [name]: value})
    // console.log('job Data', jobData)
  }

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
                <Input name="name" value={jobData.name} onChange={handleChange} type="text" />
                <FormLabel>Position</FormLabel>
                <Input name="position" value={jobData.position} onChange={handleChange} type="text" />
                <FormLabel>Link to Job Posting</FormLabel>
                <Input name="linkToJob" value={jobData.linkToJob} onChange={handleChange} type="url" />
                <FormLabel>Notes</FormLabel>
                <Textarea name="notes"
                  placeholder='Enter job-related notes'
                  value={jobData.notes} onChange={handleChange}
                  size='sm'
                />
                <FormHelperText>Add notes on the company, references, salary & benefits, interview details, and other information that will help you on your application process!</FormHelperText>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} backgroundColor="#cf9c82" variant="ghost">Add Job</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddJobForm;
