/* eslint-disable react/jsx-props-no-spreading */
import { Box, Text } from '@chakra-ui/react';
import { Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import JobContainer from './JobContainer';
import { JobData } from '../Types';
import statuses from '../Statuses';

function Done({ resultJobs, ghostedJobs }: { resultJobs: JobData[], ghostedJobs: JobData[] }) {
  const [draggingOverResult, setDraggingOverResult] = useState(false);
  // const [draggingOverGhosted, setDraggingOverGhosted] = useState(false);
  const resultJobList = resultJobs.map((job, index) => (
    <JobContainer job={job} index={index} key={uuidv4()} />
  ));
  const ghostedJobList = ghostedJobs.map((job, index) => (
    <JobContainer job={job} index={index} key={uuidv4()} />
  ));

  // console.log('Done joblist result', resultJobList);
  // console.log('Done joblist ghosted', ghostedJobList);
  const dragOver = false;
  useEffect(() => {
    setDraggingOverResult(dragOver);
  }, [dragOver]);

  return (
    <Box
      w="100%"
      h="100%"
      bg={(draggingOverResult) ? 'white' : '#ededed'}
      transition="background-color 200ms ease"
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
        {(provided, snapshot) => (
          <>
            <p style={{ margin: '5px 0' }}>Result</p>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: snapshot.isDraggingOver ? 'white' : '#ededed', height: '55%', overflowY: 'auto', overflowX: 'hidden',
              }}
            >
              {resultJobList}
              {provided.placeholder}
            </div>
          </>
        )}
      </Droppable>
      <Droppable droppableId="ghosted">
        {(provided, snapshot) => (
          <>
            {/* {setDraggingOverGhosted(snapshot.isDraggingOver)} */}
            <p style={{ margin: '5px 0' }}>👻 Ghosted</p>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: snapshot.isDraggingOver ? 'white' : '#ededed', height: '30%', overflowY: 'auto', overflowX: 'hidden',
              }}
            >
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
