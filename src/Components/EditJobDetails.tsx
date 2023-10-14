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
import updateDB from '../HelperFunctions/apiCalls';
import formCheck from '../HelperFunctions/formCheck';

function EditJobDetails({
  isOpen, onClose, setJobs, job,
} : UseDisclosureProps &
{ isOpen: boolean, onClose: () => void, setJobs: React.Dispatch<React.SetStateAction<JobData[]>>, job: JobData }) {
  // Note: Need to add logic where we fetch the current job's existing info, set that as the initial state of jobData
  const [jobFormData, setJobFormData] = useState(job);
  const [jobFormError, setJobFormError] = useState({
    company_name: false,
    position: false,
    listing_link: false,
    notes: false,
  });

  // last_updated: new Date().toISOString(),

  const handleChange = (event: React.ChangeEvent & { target: { name: string, value: string } }) => {
    const { name, value } = event.target;
    setJobFormData((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(jobFormData);
  // }, [jobFormData]);

  // Patch
  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    // formCheck(jobFormData, setJobFormError);
    updateDB(setJobs, jobFormData);
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
                onChange={handleChange}
                bg="color"
                pl="2"
                value={jobFormData.status}
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
              onClick={handleSubmit}
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
