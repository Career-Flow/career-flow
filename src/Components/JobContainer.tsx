/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
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

function JobContainer({ job, index, setDropDown }:
{ job: JobData, index: number, setDropDown: React.Dispatch<React.SetStateAction<boolean>> }) {
  console.log('jobcontainer job', job);
  const { isOpen, onOpen, onClose } : UseDisclosureReturn = useDisclosure();
  // const innerRef = useRef(null);
  // renders based off condition: not applied, inprogress, done
  const [jobCondition, setJobCondition] = useState<JobCondition>('inProgress');
  const [status, setStatus] = useState('Not Applied');

  const handleStatusChange = async (e) => {
    console.log(e.target.value);
    await setStatus(e.target.value);
  };

  useEffect(() => {
    const updateDB = async () => {
      try {
        const response = await fetch('/api', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...job, status }),
        });
        // pass new job object to back

        const data = await response.json();
        setDropDown(true);
        console.log(data, 'updateDB successful-----------');
      } catch (err) {
        console.log(`updateDB unsuccessful ${err}`);
      }
    };

    if (status !== 'Not Applied') {
      console.log('changed status', { ...job, status });
      updateDB();
    }
  }, [status]);
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
            bg={snapshot.isDragging ? '#ffc5a9' : '#faf9f6'}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onDoubleClick={handleDoubleClicked}
            borderRadius="md"
            p="2.5"
            boxShadow="md"
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
                    value={job.status}
                    placeholder="Select A Status"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
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
