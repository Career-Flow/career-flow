import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Reminder from "./Reminder";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    //get reminders data
    fetch("/api")
      .then((res) => res.json())
      .then((res) =>
        res.forEach((newReminder) => {
          setReminders([...reminders, newReminder]);
        })
      )
      .catch((err) => {
        console.log("no reminders yet");
      });
  }, [reminders]);

  return (
    <>
      <Box
        width="100%"
        height="100%"
        bg="#ffc5a9"
        color="black"
        borderRadius="md"
        boxShadow="md"
        borderWidth="1px"
        borderColor="#E8AA42"
        p="2"
      >
        <h1>Reminders</h1>
        <Reminder />
        {/* {reminders.map((reminder) => {
          <Reminder />;
        })} */}
      </Box>
    </>
  );
};

export default Reminders;
