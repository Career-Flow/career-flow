/* eslint-disable react/jsx-props-no-spreading */
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
  Text,
  Flex,
  Select,
  UseDisclosureProps,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Link,
} from '@chakra-ui/react';
import { JobData } from '../Types';
import updateDB from '../HelperFunctions/apiCalls';
import EditableControls from '../HelperFunctions/editableFuncs';
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
    // f (formCheck(jobFormData, setJobFormError)) { return; }
    updateDB(setJobs, jobFormData);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            id="company_name"
            color="#9C4221"
            alignSelf="center"
          >
            <Editable defaultValue={job.company_name} isPreviewFocusable={false} style={{ display: 'flex' }}>
              <EditablePreview />
              <EditableInput
                name="company_name"
                value={jobFormData.company_name}
                onChange={handleChange}
                textAlign="center"
              />
              <EditableControls />
            </Editable>
          </ModalHeader>
          <Text textAlign="center" className="displayDate">
            09/12/23
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <Box className="addJobContent">
              <Flex display="flex" alignItems="center">
                <Text fontWeight="550">Position: </Text>
                <Editable pl="3" defaultValue={job.position} isPreviewFocusable={false} style={{ display: 'flex' }}>
                  <EditablePreview />
                  <EditableInput
                    name="position"
                    value={jobFormData.position}
                    onChange={handleChange}
                  />
                  <EditableControls />
                </Editable>
              </Flex>
              <Flex display="flex" alignItems="center">
                <Text fontWeight="550">Link to Job Posting: </Text>
                <Editable
                  pl="3"
                  color="#ED8936"
                  defaultValue={job.listing_link}
                  isPreviewFocusable={false}
                  style={{ display: 'flex' }}
                >
                  <Link href={job.listing_link} isExternal>
                    <EditablePreview />
                  </Link>
                  <EditableInput
                    type="url"
                    name="listing_link"
                    value={jobFormData.listing_link}
                    onChange={handleChange}
                  />
                  <EditableControls />
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

              <Text mt={2} fontWeight="550">
                Notes (Click Below to Edit):
                {' '}
              </Text>
              <Box>
                <Editable
                  pl="3"
                  defaultValue={job.notes}
                >
                  <EditablePreview
                    style={{
                      whiteSpace: 'pre-line',
                      width: '100%',
                      // This CSS style ensures line breaks are respected
                    }}
                    overflowY="auto"
                    h="3xs"
                  />
                  <EditableTextarea
                    name="notes"
                    value={jobFormData.notes}
                    onChange={handleChange}
                    h="3xs"
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
