import React, { useEffect } from "react";
import { Checkbox, Box } from "@chakra-ui/react";

const Reminder = () => {
  //props passed down will have
  return (
    <Box p="2" bg="#ffffff" borderRadius="md" size="md" boxShadow="sm">
      <Checkbox colorScheme="orange">Overvue: Interview @ 10 AM</Checkbox>
    </Box>
  );
};

export default Reminder;
