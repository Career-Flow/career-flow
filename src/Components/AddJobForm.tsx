/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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

  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { JobData } from '../Types';

function AddJobForm({ isOpen, onClose, setNAJobs } : UseDisclosureProps &
{ isOpen: boolean, onClose: () => void, setNAJobs: React.Dispatch<React.SetStateAction<JobData[]>> }) {
  const [jobData, setJobData] = useState({
    company_name: '',
    position: '',
    listing_link: '',
    notes: '',
    applied_date: new Date().toISOString(),
  });

  // didn't put in useEffect because I only want to POST when we click Submit -> NOT every change
  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ jobData }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data: JobData) => {
          setNAJobs((prev) => [...prev, data]);
          onClose();// closes modal
          console.log('successfully posted job!', data);
        });
    } catch (err) {
      console.log('job post unsuccessful', err);
    }
  };

  const handleChange = (event: React.ChangeEvent & { target: { name: string, value: string } }) => {
    // type doing an intersection between the React.ChangeEvent and our custom target key-value
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
}

export default AddJobForm;
