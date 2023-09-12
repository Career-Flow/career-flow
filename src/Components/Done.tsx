import React from "react";
import { Box } from "@chakra-ui/react";

const Done = () => {
  return (
    <>
      <Box
        w="100%"
        h="100%"
        bg="#fff8f2"
        color="black"
        borderRadius="md"
        boxShadow="lg"
        borderWidth="1px"
        borderColor="#c0b0a9"
        p="2"
      >
        <h2>Done</h2>
        <>
          <Box h="50vh">Result</Box>
          <Box h="50vh">👻 Ghosted</Box>
        </>
      </Box>
    </>
  );
};

export default Done;
