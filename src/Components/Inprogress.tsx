/* eslint-disable react/jsx-props-no-spreading */
import { Box, Text } from '@chakra-ui/react';
import { Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import JobContainer from './JobContainer';
import { JobData } from '../Types';

function Inprogress({ jobs, setDropDown }:
{ jobs: JobData[], setDropDown: React.Dispatch<React.SetStateAction<boolean>> }) {
  // eslint-disable-next-line max-len
  const jobList = jobs.map((job, index) => <JobContainer job={job} index={index} key={uuidv4()} setDropDown={setDropDown} />);

  // console.log('in progress joblist', jobList);

  return (
    <Droppable droppableId="inprogress">
      {(provided, snapshot) => (
        <Box
          width="100%"
          h="100%"
          bg={snapshot.isDraggingOver ? 'white' : '#ededed'}
          transition="background-color 200ms ease"
          color="black"
          borderRadius="md"
          boxShadow="lg"
          borderWidth="1px"
          borderColor="#c0b0a9"
          p="2"
          pb={10}
          display="flex"
          flexDir="column"
          ref={provided.innerRef}
          overflowY="auto"
          {...provided.droppableProps}
        >
          <Text fontWeight="700" color="#9C4221" textAlign="center" mb={2}>
            🙌 In Progress
          </Text>
          {jobList}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}

export default Inprogress;
