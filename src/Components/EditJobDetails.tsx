import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Input,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UseDisclosureProps,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { JobData } from '../Types';
import CreateReminder from './CreateReminder';

function EditJobDetails({
  isOpen, onClose, setJobs, job,
} : UseDisclosureProps &
{ isOpen: boolean, onClose: () => void, setJobs: React.Dispatch<React.SetStateAction<JobData[]>>, job: JobData }) {
  // Note: Need to add logic where we fetch the current job's existing info, set that as the initial state of jobData
  const [jobFormData, setJobFormData] = useState({
    company_name: '',
    position: '',
    listing_link: '',
    notes: '',
    last_updated: new Date().toISOString(),
  });

  const handleChange = (e) => {
    console.log(e.target);
    // const { name, value } = e.target;
    // setJobData({...job, [name]: value });
    // console.log(jobData)
  };

  const handleStatusChange = async (e) => {
    // console.log(e);
    await setStatus(e.target.value);
    // newStatus will equal status string (d/t Chakra constraints -> need to update status on change)
    // post status to job
    // try {
    //   await fetch('/api', {
    //     method: 'POST',
    //     body: JSON.stringify({ status }),
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //     .then((res) => res.json())
    //     .then(() => console.log('posted status to job'));
    // } catch {
    //   console.log('job status post unsuccessful');
    // }
  };

  // useEffect(() => {
  //   console.log(status); // Log the updated reminder immediately after it changes
  // }, [jobData, status]);

  // Patch
  const handleSave = async () => {
    event.preventDefault();
    try {
      await fetch('/api', {
        method: 'PATCH',
        body: JSON.stringify({ jobFormData }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then(() => console.log('edited job!'));
    } catch {
      console.log('edit job unsuccessful');
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            id="company_name"
            as={Editable}
            color="#9C4221"
            alignSelf="center"
            size="lg"
            defaultValue={job.company_name}
          >
            <EditablePreview />
            <EditableInput
              name="company_name"
              value={jobFormData.company_name}
              onChange={handleChange}
            />
          </ModalHeader>
          <Text textAlign="center" className="displayDate">
            09/12/23
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <Box className="addJobContent">
              <Flex display="flex" alignItems="center">
                <Text fontWeight="550">Position: </Text>
                <Editable pl="3" defaultValue={job.position}>
                  <EditablePreview />
                  <EditableInput
                    name="position"
                    value={jobFormData.position}
                    onChange={handleChange}
                  />
                </Editable>
              </Flex>
              <Flex display="flex" alignItems="center">
                <Text fontWeight="550">Link to Job Posting: </Text>
                <Editable
                  pl="3"
                  color="#ED8936"
                  defaultValue={job.listing_link}
                >
                  <EditablePreview />
                  <EditableInput
                    type="url"
                    name="listing_link"
                    value={jobFormData.listing_link}
                    onChange={handleChange}
                  />
                </Editable>
              </Flex>
              {/* <Box bg="#ede5e1" p="2" borderRadius="md" className="reminders">
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <h1>Create a reminder: </h1>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <CreateReminder propData={job.company_name} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box> */}

              <Text fontWeight="550" textAlign="center">
                Notes:
                {' '}
              </Text>
              <Box>
                <Editable
                  pl="3"
                  size="small"
                  defaultValue={job.notes}
                >
                  <EditablePreview />
                  <EditableTextarea
                    name="notes"
                    value={jobFormData.notes}
                    onChange={handleChange}
                  />
                </Editable>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Box className="jobStatus">
              <Select
                name="status"
                onChange={handleStatusChange}
                bg="color"
                pl="2"
                value={job.status}
                placeholder="Select A Status"
              >
                <option value="Not Applied">Not Applied</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Waiting">Waiting</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </Box>
            <Button
              onClick={handleSave}
              colorScheme="orange"
              // backgroundColor="#cf9c82"
              // variant="ghost"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default EditJobDetails;
