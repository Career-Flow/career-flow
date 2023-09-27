import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import NotApplied from "./Components/NotApplied";
import Inprogress from "./Components/Inprogress";
import Done from "./Components/Done";
import Reminders from "./Components/Reminders";
import Navbar from "./Components/Navbar";
import careerflowLogo from "./assets/careerflow.svg";
import statuses, { statusSwitch } from "./Statuses";
import { JobData } from "./Types";

const dummyData = [
  {
    user_id: "123456",
    app_id: "1234567",
    company_name: "test1",
    position: "some job",
    listing_link: "some link",
    notes: "got money?",
    applied_date: new Date(),
    last_updated: new Date(),
    status: "Not Applied",
    reminders: [
      {
        reminderDate: new Date(),
        reminderType: "",
      },
    ],
  },
  {
    user_id: "234567",
    app_id: "2345678",
    company_name: "test1",
    position: "some job",
    listing_link: "some link",
    notes: "got money?",
    applied_date: new Date(),
    last_updated: new Date(),
    status: "Interviewing",
    reminders: [
      {
        reminderDate: new Date(),
        reminderType: "",
      },
    ],
  },
  {
    user_id: "345678",
    app_id: "3456789",
    company_name: "test1",
    position: "some job",
    listing_link: "some link",
    notes: "got money?",
    applied_date: new Date(),
    last_updated: new Date(),
    status: "Applied",
    reminders: [
      {
        reminderDate: new Date(),
        reminderType: "",
      },
    ],
  },
];

function App() {
  // Use this for the state of the jobs, we expect an array of JobData objects
  const [jobs, setJobs] = useState<JobData[]>(dummyData);
  // this.state.jobs = [{}, {},{}]
  const [nAJobs, setnAJobs] = useState<JobData[]>([dummyData[0]]);
  const [iPJobs, setIPJobs] = useState<JobData[]>([dummyData[1], dummyData[2]]);
  const [resultJobs, setResultJobs] = useState<JobData[]>([]);
  const [ghostedJobs, setGhostedJobs] = useState<JobData[]>([]);

  useEffect(() => {
    // fetch jobs from server
    fetch("/application")
      .then((res) => res.json())
      .then((res) => {
        // res.forEach((newJob:JobData) => {
        //   setJobs([...jobs, newJob]);
        //   if(newJob.status === 'Not Applied')

        // })
        setJobs(res);

        setnAJobs(() =>
          res.filter((job: JobData) => job.status === "Not Applied")
        );

        setIPJobs(() =>
          res.filter(
            (job: JobData) =>
              job.status === "Applied" ||
              job.status === "Interviewing" ||
              job.status === "Waiting"
          )
        );

        setResultJobs(() =>
          res.filter(
            (job: JobData) =>
              job.status === "Rejected" ||
              job.status === "Ghosted" ||
              job.status === "Accepted"
          )
        );
      })
      .catch(() => {
        console.log("no jobs yet");
      });
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

  useEffect(() => {
    console.log("nAJobs", nAJobs);
    console.log("iPJobs", iPJobs);
    console.log("doneJobs", resultJobs);
  }, [nAJobs, iPJobs, resultJobs]);

  // type for the source and destination objects from the dnd result
  type SourceOrDest = {
    droppableId: string;
    index: number;
  };

  const updateStateAndSet = (
    job: JobData,
    source: SourceOrDest,
    destination: SourceOrDest
  ) => {
    // make a copy of the job
    // switch the status from the source status to the destination column status
    const temp = { ...job };
    temp.status = statusSwitch(destination.droppableId);
    console.log("after switch temp.status", temp.status);
    // make copies of all the states
    const copynAJobs = [...nAJobs];
    const copyiPJobs = [...iPJobs];
    const copyResultJobs = [...resultJobs];
    const copyGhostedJobs = [...ghostedJobs];

    // alter the state of the destination columns for the moved job
    switch (destination.droppableId) {
      case "notapplied":
        copynAJobs.splice(destination.index, 0, temp);
        setnAJobs(copynAJobs);
        break;
      case "inprogress":
        copyiPJobs.splice(destination.index, 0, temp);
        setIPJobs(copyiPJobs);
        break;
      case "result":
        copyResultJobs.splice(destination.index, 0, temp);
        setResultJobs(copyResultJobs);
        break;
      case "ghosted":
        copyGhostedJobs.splice(destination.index, 0, temp);
        setGhostedJobs(copyGhostedJobs);
        break;
      default:
        break;
    }

    // remove the moved job from the originating column
    switch (source.droppableId) {
      case "notapplied":
        copynAJobs.splice(source.index, 1);
        setnAJobs(copynAJobs);
        break;
      case "inprogress":
        copyiPJobs.splice(source.index, 1);
        setIPJobs(copyiPJobs);
        break;
      case "result":
        copyResultJobs.splice(source.index, 1);
        setResultJobs(copyResultJobs);
        break;
      case "ghosted":
        copyGhostedJobs.splice(source.index, 1);
        setGhostedJobs(copyGhostedJobs);
        break;
      default:
        break;
    }
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result; // drag info for the active job
    console.log("dest", destination);
    console.log("source", source);
    console.log("draggableId", draggableId);
    // if dragged outside of the droppable areas or if dragged back to the same spot, just return
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      console.log("returned out of onDragEnd");
      return;
    }
    // after dropping we need to change the status of the item that was dragged
    // Also rearrange the order in the respective array

    if (source.droppableId === "notapplied") {
      console.log("source was notapplied");
      nAJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (job.app_id === result.draggableId) {
          // source -> destination
          updateStateAndSet(job, source, destination);
        }
      });
    } else if (source.droppableId === "inprogress") {
      console.log("source was inprogress");
      iPJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (job.app_id === result.draggableId) {
          // source -> destination
          updateStateAndSet(job, source, destination);
        }
      });
    } else if (source.droppableId === "result") {
      console.log("source was result");
      resultJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (job.app_id === result.draggableId) {
          // source -> destination
          updateStateAndSet(job, source, destination);
        }
      });
    } else if (source.droppableId === "ghosted") {
      console.log("source was ghosted");
      ghostedJobs.forEach((job) => {
        // find the id of the thing being dragged
        if (job.app_id === result.draggableId) {
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
      <GridItem area="tabs" display="flex" justifyContent="space-between">
        {/* <ButtonGroup spacing='6' m={2}>
              <Button style={{ width: '10vh' }} variant='unstyled'>
              <img src={Logo} alt="Logo" width='100vh'/>
              </Button>
              <Button colorScheme='blue' variant='outline'>Study Tab</Button>
            </ButtonGroup> */}
        <img src={careerflowLogo} alt="logo" width="120vh" />
        <Navbar />
      </GridItem>
      <GridItem area="reminders">
        <Reminders />
      </GridItem>
      <DragDropContext onDragEnd={onDragEnd}>
        <GridItem area="notapplied" maxW="30vw">
          <NotApplied jobs={nAJobs} />
        </GridItem>
        <GridItem area="inprogress">
          <Inprogress jobs={iPJobs} />
        </GridItem>
        <GridItem area="done" maxW="30vw">
          <Done resultJobs={resultJobs} ghostedJobs={ghostedJobs} />
        </GridItem>
      </DragDropContext>
    </Grid>
  );
}

export default App;
