/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import './App.css';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import NotApplied from './Components/NotApplied';
import Inprogress from './Components/Inprogress';
import Done from './Components/Done';
import Reminders from './Components/Reminders';
import Navbar from './Components/Navbar';
import careerflowLogo from './assets/careerflow.svg';
import statuses, { statusSwitch } from './Statuses';
import { JobData } from './Types';

function App() {
  // Use this for the state of the jobs, we expect an array of JobData objects
  const [jobs, setJobs] = useState<JobData[]>([]);
  // this.state.jobs = [{}, {},{}]
  const [nAJobs, setNAJobs] = useState<JobData[]>([]);
  const [iPJobs, setIPJobs] = useState<JobData[]>([]);
  const [resultJobs, setResultJobs] = useState<JobData[]>([]);
  const [ghostedJobs, setGhostedJobs] = useState<JobData[]>([]);
  const [dropdown, setDropDown] = useState(false);
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);

  // useRef values do not get reset between rerenders
  const isFetchDataInvoked = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isFetchDataInvoked.current || dropdown) {
        // console.log(isFetchDataInvoked.current);
        try {
          const response = await fetch('/api', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          /* data received in an array with jobData with this format:
          _id,
          user_id,
          company_name,
          position,
          listing_link,
          notes,
          applied_date,
          last_updated,
          status */
          setJobs(data);

          // setJobs(data);

          // Set loggedIn based on whether data is an array or not
          setLoggedIn(Array.isArray(data));

          console.log(data, '-----------');
        } catch (err) {
          setLoggedIn(false);
          console.log(`no jobs yet ${err}`);
        }
      }
    };

    fetchData();
    // set it to true, so the fetch only happens once.
    isFetchDataInvoked.current = true;
    setDropDown(false);
  }, [dropdown]);

  useEffect(() => {
    // setting all the column jobs
    const newNAJobs:JobData[] = [];
    const newIPJobs:JobData[] = [];
    const newResultJobs:JobData[] = [];
    const newGhostedJobs:JobData[] = [];

    jobs.forEach((newJob: JobData) => {
      if (statuses[newJob.status] === 'notapplied') {
        newNAJobs.push(newJob);
      } else if (statuses[newJob.status] === 'inprogress') {
        newIPJobs.push(newJob);
      } else if (statuses[newJob.status] === 'result') {
        newResultJobs.push(newJob);
      } else if (statuses[newJob.status] === 'ghosted') {
        newGhostedJobs.push(newJob);
      }
    });

    setNAJobs(newNAJobs);
    setIPJobs(newIPJobs);
    setResultJobs(newResultJobs);
    setGhostedJobs(newGhostedJobs);
  }, [jobs]);

  /*
  what comes out of the result object in onDragEnd?
  draggableId: 'name we gave the draggable'
  type: 'TYPE'
  reason: 'DROP' | 'CANCEL';
  source: {
    droppableId: 'string we assigned' For us this should be the status (the columns in the demo)
    index: number which we assigned
  },
  destination: {
    droppableId: 'string we assigned' For us this should be the status (the columns in the demo)
    index: number which we assigned
  }

  */

  // useEffect(() => {
  //   console.log('state jobs', jobs);
  //   console.log('nAJobs', nAJobs);
  //   console.log('iPJobs', iPJobs);
  //   console.log('doneJobs', resultJobs);
  //   console.log(loggedIn);
  // }, [nAJobs, iPJobs, resultJobs, jobs, loggedIn]);

  // type for the source and destination objects from the dnd result
  type SourceOrDest = {
    droppableId: string;
    index: number;
  };

  const updateStateAndSet = (
    job: JobData,
    source: SourceOrDest,
    destination: SourceOrDest,
  ) => {
    // make a copy of the job
    // switch the status from the source status to the destination column status
    const temp = { ...job };
    // change to default statuses only if dragging to different columns
    if (source.droppableId !== destination.droppableId) { temp.status = statusSwitch(destination.droppableId); }
    console.log('after switch temp.status', temp.status);
    // make copies of all the states
    const copynAJobs = [...nAJobs];
    const copyiPJobs = [...iPJobs];
    const copyResultJobs = [...resultJobs];
    const copyGhostedJobs = [...ghostedJobs];

    // remove the moved job from the originating column
    switch (source.droppableId) {
      case 'notapplied':
        copynAJobs.splice(source.index, 1);
        setNAJobs(copynAJobs);
        break;
      case 'inprogress':
        copyiPJobs.splice(source.index, 1);
        setIPJobs(copyiPJobs);
        break;
      case 'result':
        copyResultJobs.splice(source.index, 1);
        setResultJobs(copyResultJobs);
        break;
      case 'ghosted':
        copyGhostedJobs.splice(source.index, 1);
        setGhostedJobs(copyGhostedJobs);
        break;
      default:
        break;
    }

    // alter the state of the destination columns for the moved job
    switch (destination.droppableId) {
      case 'notapplied':
        copynAJobs.splice(destination.index, 0, temp);
        setNAJobs(copynAJobs);
        break;
      case 'inprogress':
        console.log('copyiPJobs in the switch before ', JSON.stringify(copyiPJobs));
        copyiPJobs.splice(destination.index, 0, temp);
        console.log('copyiPJobs in the switch', JSON.stringify(copyiPJobs));
        setIPJobs(copyiPJobs);
        break;
      case 'result':
        copyResultJobs.splice(destination.index, 0, temp);
        setResultJobs(copyResultJobs);
        break;
      case 'ghosted':
        copyGhostedJobs.splice(destination.index, 0, temp);
        setGhostedJobs(copyGhostedJobs);
        break;
      default:
        break;
    }

    const updateDB = async () => {
      try {
        const response = await fetch('/api', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...temp, last_updated: new Date().toISOString() }),
        });
        // pass new job object to back

        const data = await response.json();

        console.log(data, 'updateDB successful-----------');
      } catch (err) {
        console.log(`updateDB unsuccessful ${err}`);
      }
    };
    updateDB();
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result; // drag info for the active job
    console.log('dest', destination);
    console.log('source', source);
    console.log('draggableId', draggableId);
    // if dragged outside of the droppable areas or if dragged back to the same spot, just return
    if (
      !destination
      || (destination.droppableId === source.droppableId
        && destination.index === source.index)
    ) {
      console.log('returned out of onDragEnd');
      return;
    }
    // after dropping we need to change the status of the item that was dragged
    // Also rearrange the order in the respective array

    if (source.droppableId === 'notapplied') {
      console.log('source was notapplied');
      nAJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (String(job._id) === result.draggableId) {
          // source -> destination
          updateStateAndSet(job, source, destination);
        }
      });
    } else if (source.droppableId === 'inprogress') {
      console.log('source was inprogress');
      iPJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (String(job._id) === result.draggableId) {
          // source -> destination
          updateStateAndSet(job, source, destination);
        }
      });
    } else if (source.droppableId === 'result') {
      console.log('source was result');
      resultJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (String(job._id) === result.draggableId) {
          // source -> destination
          updateStateAndSet(job, source, destination);
        }
      });
    } else if (source.droppableId === 'ghosted') {
      console.log('source was ghosted');
      ghostedJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (String(job._id) === result.draggableId) {
          // source -> destination
          updateStateAndSet(job, source, destination);
        }
      });
    }
  };
  // Auth should go here
  // const loggedIn = window.localStorage.getItem("ssid");
  // console.log(loggedIn);

  // if (loggedIn == "guest") {
  //   // Redirect to the login page or show an access denied message
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <Grid
      templateAreas={`"tabs tabs tabs"
          "reminders reminders reminders"
          "notapplied inprogress done"`}
      gridTemplateRows="0.1fr 0.5fr 3fr"
      gridTemplateColumns="1fr 1.5fr 1fr"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
      p="5"
      h="100vh"
    >
      { loggedIn ? (
        <>
          <GridItem area="tabs" display="flex" justifyContent="space-between">
            {/* <ButtonGroup spacing='6' m={2}>
              <Button style={{ width: '10vh' }} variant='unstyled'>
              <img src={Logo} alt="Logo" width='100vh'/>
              </Button>
              <Button colorScheme='blue' variant='outline'>Study Tab</Button>
            </ButtonGroup> */}
            <img src={careerflowLogo} alt="logo" width="120vw" />
            <Navbar />
          </GridItem>
          <GridItem area="reminders">
            <Reminders />
          </GridItem>
          <DragDropContext onDragEnd={onDragEnd}>
            <GridItem area="notapplied" maxW="30vw" style={{ overflow: 'hidden' }}>
              <NotApplied jobs={nAJobs} setNAJobs={setNAJobs} setJobs={setJobs} />
            </GridItem>
            <GridItem area="inprogress" style={{ overflow: 'hidden' }}>
              <Inprogress jobs={iPJobs} setJobs={setJobs} />
            </GridItem>
            <GridItem area="done" maxW="30vw" style={{ overflow: 'hidden' }}>
              <Done resultJobs={resultJobs} ghostedJobs={ghostedJobs} setJobs={setJobs} />
            </GridItem>
          </DragDropContext>

        </>
      ) : loggedIn === false ? (
        <Navigate to="/login" replace />
      ) : null}
    </Grid>
  );
}

export default App;
