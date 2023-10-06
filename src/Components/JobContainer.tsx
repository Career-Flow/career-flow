/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import '../App.css';
import {
  Box,
  Select,
  Flex,
  useDisclosure,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import EditJobDetails from './EditJobDetails';
import { JobData } from '../Types';
import statuses from '../Statuses';

type JobCondition = 'notApplied' | 'inProgress' | 'done';

function JobContainer({ job, index }: { job: JobData, index: number }) {
  console.log('jobcontainer job.status', job);
  const { isOpen, onOpen, onClose } : UseDisclosureReturn = useDisclosure();
  // const innerRef = useRef(null);
  // renders based off condition: not applied, inprogress, done
  const [jobCondition, setJobCondition] = useState<JobCondition>('inProgress');
  const [status, setStatus] = useState('Applied');

  const handleStatusChange = async (e) => {
    console.log(e.target.value);
    await setStatus(e.target.value);
    // eslint-disable-next-line max-len
    // newStatus will equal status string (d/t Chakra constraints -> need to update status on change)
    // post status to job
    // try {
    //   await fetch('/api', {
    //     method: 'POST',
    //     body: JSON.stringify({ status }),
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //     .then((res) => res.json())
    //     .then(() => console.log('posted status to job'));
    // } catch {
    //   console.log('job status post unsuccessful');
    // }
  };

  const handleDoubleClicked = (event) => {
    if (event.detail === 2) {
      onOpen();
    }
  };
  // if not applied: name of company, role
  // if inprogress: name of company, role, dropdown (state), date of last updated
  // done: name of company, role, accepted/rejected/ghosted - emoji
  return (
    <Draggable draggableId={String(job._id)} index={index}>
      {(provided, snapshot) => (
        <>
          <Box
            bg={snapshot.isDragging ? '#ffc5a9' : 'white'}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onDoubleClick={handleDoubleClicked}
            borderRadius="md"
            p="2.5"
            boxShadow="sm"
          >
            {statuses[job.status] === 'notapplied' && (
            <Box>
              <p>{`Company Name: ${job.company_name}`}</p>
              <p>{`Role: ${job.position}`}</p>
            </Box>
            )}
            {statuses[job.status] === 'inprogress' && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <div className="jobInfo">
                <Flex justifyContent="space-between">
                  <p>{`Company Name: ${job.company_name}`}</p>
                </Flex>
                <p>{`Role: ${job.position}`}</p>
                <p className="displayDate">{`${new Date(job.applied_date).toDateString()}`}</p>
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
            {statuses[job.status] === 'result' && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <div className="jobInfo">
                <Flex justifyContent="space-between">
                  <p>{`Company Name: ${job.company_name}`}</p>
                </Flex>
                <p>{`Role: ${job.position}`}</p>
              </div>
              {/* <Text color="#65c268" alignSelf="center">
                    ACCEPTED!
                  </Text> */}
              {/* <Text color="#c27465" alignSelf="center">
                REJECTED
              </Text> */}
            </Box>
            )}
            {statuses[job.status] === 'ghosted' && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <div className="jobInfo">
                <Flex justifyContent="space-between">
                  <p>{`Company Name: ${job.company_name}`}</p>
                </Flex>
                <p>{`Role: ${job.position}`}</p>
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
  );
}
export default JobContainer;
