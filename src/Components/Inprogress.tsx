import { Box, Text } from "@chakra-ui/react";
import JobContainer from "./JobContainer";
import { Droppable } from "@hello-pangea/dnd";

const Inprogress = () => {
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
              <JobContainer />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Box>
    </>
  );
};

export default Inprogress;
