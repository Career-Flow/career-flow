import React,{useState} from "react";
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
  Input,
  Select,
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
  //Note: Need to add logic where we fetch the current job's existing info, set that as the initial state of jobData

  const [jobData, setJobData] = useState({
    company_name: '',
    position: '',
    listing_link: '',
    notes: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({...jobData, [name]: value});
    console.log(jobData)
  }

  //Patch
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await fetch('/api', {
        method: 'PATCH',
        body: JSON.stringify({ jobData }),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
        .then(() => console.log('edited job!'))
    } catch {
      console.log('edit job unsuccessful')
    }
  }
  
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
            defaultValue="ReactType"
          >
            <EditablePreview />
            <EditableInput name="company_name" value={jobData.company_name} onChange={handleChange}/>
          </ModalHeader>
          <Text textAlign="center" className="displayDate">
            09/12/23
          </Text>
          <ModalCloseButton />
          <ModalBody>
            <Box className="addJobContent">
              <Flex display="flex" alignItems="center">
                <Text fontWeight="550">Position: </Text>
                <Editable pl="3" defaultValue="Software Engineer">
                  <EditablePreview />
                  <EditableInput name="position" value={jobData.position} onChange={handleChange}/>
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
                  <EditableInput type="url" name="listing_link" value={jobData.listing_link} onChange={handleChange}/>
                </Editable>
              </Flex>
              <Box bg="#ede5e1" p="2" borderRadius="md" className="reminders">
                <Text fontWeight="550">Create a reminder: </Text>
                <Flex display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="space-between">
                      <Input bg="color"
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        />
                      <Select bg="color" pl="2" placeholder='Select option'>
                        <option value='option1'>Interview</option>
                        <option value='option2'>Write a follow up email</option>
                        <option value='option3'>Send a Thank You email</option>
                      </Select>
                    </Box>
                    <Button colorScheme="teal" m="1" alignSelf="flexEnd" size="md">Create</Button>
                </Flex>
              </Box>
              
              <Text fontWeight="550" textAlign="center">
                Notes:{" "}
              </Text>
              <Box>
                <Editable
                  pl="3"
                  size='small'
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                >
                  <EditablePreview />
                  <EditableTextarea name="notes" value={jobData.notes} onChange={handleChange}/>
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
            <Button onClick={handleSave} backgroundColor="#cf9c82" variant="ghost">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditJobDetails;
