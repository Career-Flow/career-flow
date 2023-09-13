import React from "react";
import { Box, Text, Button, Container, Spacer } from "@chakra-ui/react";
import JobContainer from "./JobContainer";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { JobData } from "../App";
import AddJobForm from "./AddJobForm";

const NotApplied = ({ jobs }: { jobs: JobData[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
              <JobContainer />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button onClick={onOpen} m="2" colorScheme="teal" size="md">
          <AddIcon boxSize={4} />
        </Button>
        <AddJobForm isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default NotApplied;

{
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
        <Text textAlign="center">Not Applied</Text>
        <Droppable droppableId="notapplied">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId={"column55inprogress"} index={777}>
                {(provided, snapshot) => (

                  <JobContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}/>
                )}
              </Draggable>
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
}
