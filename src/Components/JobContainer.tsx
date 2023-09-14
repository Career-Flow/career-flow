import { ReactEventHandler, useRef, useState } from "react";
import "../App.css";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import EditJobDetails from "./EditJobDetails";
import { Draggable } from "@hello-pangea/dnd";
import { JobData } from "../App";
import statuses from "./Statuses";

type JobCondition = "notApplied" | "inProgress" | "done";

const JobContainer = ({ job, index }: { job: JobData, index: number }) => {
  console.log('jobcontainer job.status', job.status)
  const { isOpen, onOpen, onClose } = useDisclosure();
  //const innerRef = useRef(null);
  //renders based off condition: not applied, inprogress, done
  const [jobCondition, setJobCondition] = useState<JobCondition>("inProgress");
  const [status, setStatus] = useState("Applied");

  const handleStatusChange = async (e) => {
    console.log(e.target.value);
    await setStatus(e.target.value);
    //newStatus will equal status string (d/t Chakra constraints -> need to update status on change)
    //post status to job
    try {
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => console.log("posted status to job"));
    } catch {
      console.log("job status post unsuccessful");
    }
  };

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
      <Draggable draggableId={job.app_id} index={index}>
        {(provided, snapshot) => (
          <>
            <Box
              bg={snapshot.isDragging ? "#ffc5a9" : "white"}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onDoubleClick={handleDoubleClicked}
              w="100%"
              borderRadius="md"
              p="2.5"
              boxShadow="sm"
            >
              {statuses[job.status] === "notapplied" && (
                <Box>
                  <p>Company: ReactType</p>
                  <p>Role: Software Engineer</p>
                </Box>
              )}
              {statuses[job.status] === "inprogress" && (
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
                      <Select
                        name="status"
                        onChange={handleStatusChange}
                        bg="color"
                        pl="2"
                        placeholder="Status"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Waiting">Accepted</option>
                        <option value="Waiting">Rejected</option>
                      </Select>
                    </div>
                  </div>
                </Box>
              )}
              {job.status === "done" && (
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
                  {/* <Text color="#c27465" alignSelf="center">
                REJECTED
              </Text> */}
                </Box>
              )}

            </Box>
            <EditJobDetails isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </Draggable>
    </>
  );
};
export default JobContainer;
