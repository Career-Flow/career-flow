import React from "react";
import { Box, Container, Text} from "@chakra-ui/react";
import {Droppable, Draggable} from '@hello-pangea/dnd'
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
        <Text textAlign="center">Done</Text>
      <Droppable droppableId="done">
        {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Draggable draggableId={"column55"} index={555}>
                {(provided) => (
                  <><Box borderColor="#c0b0a9" borderWidth='10px' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                    <div>
                    TEST DONE EELMENT

                    </div>
                  </Box></>
                )}
              </Draggable>
                    {provided.placeholder}
                  </div>
        )}
      </Droppable>

              {/* <Box h="70%">Result </Box>
              <Box h="25%">👻 Ghosted</Box> */}

 


      </Box>
    </>
  );
};

export default Done;

{/* <Box
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




</Box> */}
