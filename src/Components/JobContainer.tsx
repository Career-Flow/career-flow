import React, { forwardRef, useRef, useState } from "react";
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
import { useDisclosure } from "@chakra-ui/react";
import EditJobDetails from "./EditJobDetails";
import { DraggableProps } from "framer-motion";

type JobCondition = "notApplied" | "inProgress" | "done";

const JobContainer = forwardRef<HTMLDivElement>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const innerRef = useRef(null);
  //renders based off condition: not applied, inprogress, done
  const [jobCondition, setJobCondition] = useState<JobCondition>("notApplied");
  const handleDoubleClicked = (event) => {
    if (event.detail == 2) {
      onOpen();
    }
  };
  //if not applied: name of company, role
  //if inprogress: name of company, role, dropdown (state), date of last updated
  //done: name of company, role, accepted/rejected/ghosted - emoji
  return (
    <>
      <Box ref={ref} {...props} onDoubleClick={handleDoubleClicked} bg="white" w="100%" borderRadius="md" p="2.5" boxShadow="sm">
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
      <EditJobDetails isOpen={isOpen} onClose={onClose} />
    </>
  );
});

//- applied
// - interviewing
// - waiting
// - accepted
// - rejected

export default JobContainer;
