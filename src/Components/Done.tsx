/* eslint-disable react/jsx-props-no-spreading */
import { Box, Text } from '@chakra-ui/react';
import { Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import JobContainer from './JobContainer';
import { JobData } from '../Types';
import statuses from '../Statuses';

function Done({ resultJobs, ghostedJobs }: { resultJobs: JobData[], ghostedJobs: JobData[] }) {
  const resultJobList = resultJobs.map((job, index) => (
    <JobContainer job={job} index={index} key={uuidv4()} />
  ));
  const ghostedJobList = ghostedJobs.map((job, index) => (
    <JobContainer job={job} index={index} key={uuidv4()} />
  ));

  console.log('Done joblist result', resultJobList);
  console.log('Done joblist ghosted', ghostedJobList);

  return (
    <Box
      w="100%"
      h="78vh"
      bg="#ededed"
      color="black"
      borderRadius="md"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="#c0b0a9"
      p="2"
    >
      <Text fontWeight="700" color="#9C4221" textAlign="center" mb={2}>
        👏 Done
      </Text>
      <Droppable droppableId="result">
        {(provided) => (
          <>
            <p style={{ margin: '5px 0' }}>Result</p>
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ height: '55%', overflowY: 'auto' }}>
              {resultJobList}
              {provided.placeholder}
            </div>

          </>
        )}
      </Droppable>
      <Droppable droppableId="ghosted">
        {(provided) => (
          <>
            <p style={{ margin: '5px 0' }}>👻 Ghosted</p>
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ height: '30%', overflowY: 'auto' }}>
              {ghostedJobList}
              {provided.placeholder}
            </div>

          </>
        )}
      </Droppable>

      {/* <Box h="70%">Result </Box>
              <Box h="25%">👻 Ghosted</Box> */}
    </Box>
  );
}

export default Done;
