import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import NotApplied from "./Components/NotApplied";
import Inprogress from "./Components/Inprogress";
import Done from "./Components/Done";
import Reminders from "./Components/Reminders";
import Navbar from "./Components/Navbar";
import careerflowLogo from "./assets/careerflow.svg";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import {Navigate} from 'react-router-dom'

export interface JobData {
  user_id: string,
  app_id: string,
  company_name: string,
  position: string,
  listing_link: string,
  notes: string,
  applied_date: Date,
  last_updated: Date,
  status: string,
  reminders: {
    reminderDate: Date,
    reminderType: string
  }[]
}

function App() {
  const [jobs, setJobs] = useState<JobData[]>([]);//Use this for the state of the jobs, we expect an array of JobData objects
  //this.state.jobs = [{}, {},{}]
  const [nAJobs, setnAJobs] = useState<JobData[]>([]);
  const [iPJobs, setIPJobs] = useState<JobData[]>([]);
  const [doneJobs, setDoneJobs] = useState<JobData[]>([]);

  useEffect(() => {
    //fetch jobs from server
    fetch("/application")
      .then((res) => res.json())
      .then((res) =>{
        // res.forEach((newJob:JobData) => {
        //   setJobs([...jobs, newJob]);
        //   if(newJob.status === 'Not Applied')
        
        // })
        setJobs(res);

        setnAJobs(() => res.filter((job: JobData) => job.status === 'Not Applied'));

        setIPJobs(() => res.filter((job: JobData) => job.status === 'Applied' || job.status === 'Interviewing' || job.status === 'Waiting'));

        setDoneJobs(() => res.filter((job: JobData) => job.status === 'Rejected' || job.status === 'Ghosted'));
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
  
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result; //drag info for the active job
    console.log("dest", destination);
    console.log("source", source);
    console.log("draggableId", draggableId);
    //if dragged outside of the droppable areas or if dragged back to the same spot, just return
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    //after dropping we need to change the status of the item that was dragged
    //Also rearrange the order in the respective array
    let temp:JobData;
    if(source.droppableId === 'Not Applied'){
      //get the destination.id, 
      nAJobs.map((job)=> {
        if (job.app_id === result.draggableId) {
          //source -> destination
          temp = Object.assign({}, job);
          temp.status = destination.droppableId;
          //we need to copy the nAJobs array, remove the job from it, and reset the nAJobs array
          const copynAJobs = [...nAJobs]
          if(destination.droppableId === 'Applied' || destination.droppableId ==='Interviewing' || destination.droppableId === 'Waiting'){
            setIPJobs(iPJobs.splice(destination.index, 0, temp)) //add to destination
            copynAJobs.splice(source.index, 1); 
            setnAJobs(copynAJobs)
          } else if(destination.droppableId === 'Rejected' || destination.droppableId === 'Ghosted'){
            setDoneJobs(doneJobs.splice(destination.index, 0, temp))
            copynAJobs.splice(source.index, 1); 
            setnAJobs(copynAJobs)
          } else if(destination.droppableId === 'Not Applied'){
            copynAJobs.splice(destination.index, 0, temp);
            copynAJobs.splice(source.index, 1); 
            setnAJobs(copynAJobs)
          }
        }
      })
    }
    else if(source.droppableId === 'Applied' || source.droppableId ==='Interviewing' || source.droppableId === 'Waiting'){
      //get the destination.id, 
      iPJobs.map((job)=> {
        if (job.app_id === result.draggableId) {
          //source -> destination
          temp = Object.assign({}, job);
          temp.status = destination.droppableId;
          //we need to copy the nAJobs array, remove the job from it, and reset the nAJobs array
          const copyiPJobs = [...iPJobs]
          if(destination.droppableId === 'Not Applied'){
            setnAJobs(nAJobs.splice(destination.index, 0, temp)) //add to destination
            copyiPJobs.splice(source.index, 1); 
            setIPJobs(copyiPJobs)
          } else if(destination.droppableId === 'Rejected' || destination.droppableId === 'Ghosted'){
            setDoneJobs(doneJobs.splice(destination.index, 0, temp))
            copyiPJobs.splice(source.index, 1); 
            setIPJobs(copyiPJobs)
          } else if(destination.droppableId === 'Applied' || destination.droppableId ==='Interviewing' || destination.droppableId === 'Waiting'){
            copyiPJobs.splice(destination.index, 0, temp);
            copyiPJobs.splice(source.index, 1); 
            setIPJobs(copyiPJobs)
          }
        }
      })
    }
    else if(source.droppableId === 'Rejected' || source.droppableId === 'Ghosted'){
      //get the destination.id, 
      doneJobs.map((job)=> {
        if (job.app_id === result.draggableId) {
          //source -> destination
          temp = Object.assign({}, job);
          temp.status = destination.droppableId;
          //we need to copy the nAJobs array, remove the job from it, and reset the nAJobs array
          const copyDoneJobs = [...doneJobs]
          if(destination.droppableId === 'Applied' || destination.droppableId ==='Interviewing' || destination.droppableId === 'Waiting'){
            setIPJobs(iPJobs.splice(destination.index, 0, temp)) //add to destination
            copyDoneJobs.splice(source.index, 1); 
            setDoneJobs(copyDoneJobs)
          } else if(destination.droppableId === 'Not Applied'){
            setDoneJobs(nAJobs.splice(destination.index, 0, temp))
            copyDoneJobs.splice(source.index, 1); 
            setDoneJobs(copyDoneJobs)
          } else if(destination.droppableId === 'Rejected' || destination.droppableId === 'Ghosted'){
            copyDoneJobs.splice(destination.index, 0, temp);
            copyDoneJobs.splice(source.index, 1); 
            setDoneJobs(copyDoneJobs)
          }
        }
      })
    }
    
        //in state of the app, there should be the columns: notApplied, inProgress, Done
      //get the position of the job (where the job was initially)
      //create a new jobsId array Array.from(notApplied.job)
  };

  const loggedIn = window.localStorage.getItem("ssid");
  console.log(loggedIn);

  if (loggedIn == "guest") {
    // Redirect to the login page or show an access denied message
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Grid
        templateAreas={`"tabs tabs tabs"
          "reminders reminders reminders"
          "notapplied inprogress done"`}
        gridTemplateRows={"0.1fr 0.5fr 3fr"}
        gridTemplateColumns={"1fr 1.5fr 1fr"}
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
        p="5"
        h="100vh"
      >
        <GridItem area={"tabs"} display="flex" justifyContent={"space-between"}>
          {/* <ButtonGroup spacing='6' m={2}>
              <Button style={{ width: '10vh' }} variant='unstyled'>
              <img src={Logo} alt="Logo" width='100vh'/>
              </Button>
              <Button colorScheme='blue' variant='outline'>Study Tab</Button>
            </ButtonGroup> */}
          <img src={careerflowLogo} alt="logo" width="120vh" />
          <Navbar />
        </GridItem>
        <GridItem area={"reminders"}>
          <Reminders />
        </GridItem>
        <DragDropContext onDragEnd={onDragEnd}>
          <GridItem area={"notapplied"} maxW={"30vw"}>
            <NotApplied jobs ={nAJobs} />
          </GridItem>
          <GridItem area={"inprogress"}>
            <Inprogress jobs = {iPJobs}/>
          </GridItem>
          <GridItem area={"done"} maxW={"30vw"}>
            <Done jobs = {doneJobs}/>
          </GridItem>
        </DragDropContext>
      </Grid>
    </>
  );
}

export default App;
