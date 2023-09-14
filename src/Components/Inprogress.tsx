import { Box, Text } from "@chakra-ui/react";
import JobContainer from "./JobContainer";
import { Droppable } from "@hello-pangea/dnd";
import { JobData } from "../App";
import { v4 as uuidv4 } from 'uuid';

const Inprogress = ({ jobs }: { jobs: JobData[] }) => {

  const jobList = jobs.map((job, index) => <JobContainer job={job} index = {index} key ={uuidv4()}/>)

  console.log('in progress joblist', jobList)

  return (
    <>
      <Box
        width="100%"
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
          🙌 In Progress
        </Text>
        <Droppable droppableId="inprogress">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {jobList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Box>
    </>
  );
};

export default Inprogress;
