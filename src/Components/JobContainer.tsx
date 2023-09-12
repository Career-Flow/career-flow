import React, { useState } from "react";
import "../App.css";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type JobCondition = "notApplied" | "inProgress" | "done";

const JobContainer = () => {
  //renders based off condition: not applied, inprogress, done
  const [jobCondition, setJobCondition] = useState<JobCondition>("notApplied");

  //if not applied: name of company, role
  //if inprogress: name of company, role, dropdown (state), date of last updated
  //done: name of company, role, accepted/rejected/ghosted - emoji
  return (
    <>
      <Box bg="white" w="100%" borderRadius="md" p="2.5" boxShadow="sm">
        {jobCondition === "notApplied" && (
          <Box>
            <p>Company: ReactType</p>
            <p>Role: Software Engineer</p>
          </Box>
        )}
        {jobCondition === "inProgress" && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <div className="jobInfo">
              <Flex justifyContent="space-between">
                <p>Company: ReactType</p>
              </Flex>
              <p>Role: Software Engineer</p>
              <p className="displayDate">09/12/23</p>
            </div>
            <div className="jobFooterContainer">
              <div className="jobMenu">
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Applied
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Applied</MenuItem>
                    <MenuItem>Interviewing</MenuItem>
                    <MenuItem>Waiting</MenuItem>
                    <MenuItem>Accepted</MenuItem>
                    <MenuItem>Rejected</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          </Box>
        )}
        {jobCondition === "done" && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <div className="jobInfo">
              <Flex justifyContent="space-between">
                <p>Company: ReactType</p>
              </Flex>
              <p>Role: Software Engineer</p>
            </div>
            {/* <Text color="#65c268" alignSelf="center">
              ACCEPTED!
            </Text> */}
            <Text color="#c27465" alignSelf="center">
              REJECTED
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};

//- applied
// - interviewing
// - waiting
// - accepted
// - rejected

export default JobContainer;
