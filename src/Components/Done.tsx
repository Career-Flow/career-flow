import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import JobContainer from "./JobContainer";

const Done = () => {
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
      >
        <Text fontWeight="700" color="#9C4221" textAlign="center">
          👏 Done
        </Text>
        <Droppable droppableId="Result">
          {(provided) => (
            <Box h="70%">
              Result
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <JobContainer />
                {provided.placeholder}
              </div>
            </Box>
          )}
        </Droppable>
        <Droppable droppableId="Ghosted">
          {(provided) => (
            <Box h="25%">
              👻 Ghosted
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <JobContainer />
                {provided.placeholder}
              </div>
            </Box>
          )}
        </Droppable>

        {/* <Box h="70%">Result </Box>
              <Box h="25%">👻 Ghosted</Box> */}
      </Box>
    </>
  );
};

export default Done;

{
  /* <Box
w="100%"
h="100%"
bg="#ededed"
color="black"
borderRadius="md"
boxShadow="lg"
borderWidth="1px"
borderColor="#c0b0a9"
p="2"
>
<Text textAlign="center">In Progress</Text>

      <Box h="70%">Result


      </Box>
      <Box h="25%">👻 Ghosted</Box>




</Box> */
}
