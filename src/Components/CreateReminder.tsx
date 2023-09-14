import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Select, Input } from "@chakra-ui/react";

const CreateReminder = (props) => {
  const [reminder, setReminder] = useState({
    reminderDate: "",
    reminderType: "",
  });

  const updateReminder = (e) => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
    console.log(reminder);
  };

  useEffect(() => {
    console.log(reminder); // Log the updated reminder immediately after it changes
  }, [reminder]);

  const handleReminder = async (e) => {
    console.log(reminder);
    e.preventDefault();
    try {
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ reminder }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => console.log("successfully posted reminder!"));
    } catch {
      console.log("reminder post unsuccessful");
    }
  };

  return (
    <div>
      <Flex display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Input
            name="reminderDate"
            onChange={updateReminder}
            theme="orange"
            bg="color"
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
          />
          <Select
            name="reminderType"
            onChange={updateReminder}
            bg="color"
            pl="2"
            placeholder="Select option"
          >
            <option value={`${props.company_name}: Interview`}>
              Interview
            </option>
            <option value={`${props.company_name}: Write a follow up email`}>
              Write a follow up email
            </option>
            <option value={`${props.company_name}: Send a Thank You email`}>
              Send a Thank You email
            </option>
          </Select>
        </Box>
        <Button
          onClick={handleReminder}
          colorScheme="orange"
          mt="2"
          alignSelf="flexEnd"
          size="md"
        >
          Create
        </Button>
      </Flex>
    </div>
  );
};

export default CreateReminder;
