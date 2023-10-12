/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Text, Button,
  useDisclosure,
  Container,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import AddJobForm from './AddJobForm';
import JobContainer from './JobContainer';
import { JobData } from '../Types';

function NotApplied({ jobs, setNAJobs, setJobs }:
{ jobs: JobData[], setNAJobs: React.Dispatch<React.SetStateAction<JobData[]>>, setJobs: React.Dispatch<React.SetStateAction<JobData[]>> }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const jobList = jobs.map((job, index) => <JobContainer job={job} index={index} key={uuidv4()} setJobs={setJobs} />);

  // console.log('not applied joblist', jobList);

  return (
    <Droppable droppableId="notapplied">
      {(provided, snapshot) => (
        <Box
          w="100%"
          h="100%"
          bg={snapshot.isDraggingOver ? 'white' : '#ededed'}
          transition="background-color 200ms ease"
          color="black"
          borderRadius="md"
          boxShadow="lg"
          borderWidth="1px"
          borderColor="#c0b0a9"
          p="2"
 
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Text fontWeight="700" color="#9C4221" textAlign="center" mb={2}>
            👋 Not Applied
          </Text>
          <Container overflowY="auto" px="1">

            {jobList}
            {provided.placeholder}

            <Button onClick={onOpen} my={2} colorScheme="teal" size="md" width="100%">
              <AddIcon boxSize={4} />
            </Button>
            <AddJobForm isOpen={isOpen} onClose={onClose} setNAJobs={setNAJobs} />
          </Container>
        </Box>
      )}
    </Droppable>
  );
}

export default NotApplied;

/* <>
      <Box
        w="100%"
        h="100%"
        bg="#ededed"
        color="black"
        borderRadius="md"
        boxShadow="lg"
        borderWidth="1px"
        borderColor="#c0b0a9"
        p="2"
        display="flex"
        flexDir="column"
      >
        <Text fontWeight="700" color="#9C4221" textAlign="center">
          👋 Not Applied
        </Text>
        <Droppable droppableId="notapplied">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
             {jobList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button onClick={onOpen} m="2" colorScheme="teal" size="md">
          <AddIcon boxSize={4} />
        </Button>
        <AddJobForm isOpen={isOpen} onClose={onClose} />
      </Box>
    </> */
