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
import statuses from "./Components/Statuses";

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

let dummyData = [
  {
    user_id: '123456',
    app_id: '1234567',
    company_name: 'test1',
    position: 'some job',
    listing_link: 'some link',
    notes: 'got money?',
    applied_date: new Date(),
    last_updated: new Date(),
    status: 'Not Applied',
    reminders: [{
      reminderDate: new Date(),
      reminderType: ''
    }]
  },
  {
    user_id: '234567',
    app_id: '2345678',
    company_name: 'test1',
    position: 'some job',
    listing_link: 'some link',
    notes: 'got money?',
    applied_date: new Date(),
    last_updated: new Date(),
    status: 'Interviewing',
    reminders: [{
      reminderDate: new Date(),
      reminderType: ''
    }]
  },
  {
    user_id: '345678',
    app_id: '3456789',
    company_name: 'test1',
    position: 'some job',
    listing_link: 'some link',
    notes: 'got money?',
    applied_date: new Date(),
    last_updated: new Date(),
    status: 'Applied',
    reminders: [{
      reminderDate: new Date(),
      reminderType: ''
    }]
  }
]

function App() {
  const [jobs, setJobs] = useState<JobData[]>(dummyData);//Use this for the state of the jobs, we expect an array of JobData objects
  //this.state.jobs = [{}, {},{}]
  const [nAJobs, setnAJobs] = useState<JobData[]>([dummyData[0]]);
  const [iPJobs, setIPJobs] = useState<JobData[]>([dummyData[1], dummyData[2]]);
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

  useEffect(()=>{
    console.log('nAJobs', nAJobs)
    console.log('iPJobs', iPJobs)

  }, [nAJobs, iPJobs])
  
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
      console.log('returned out of onDragEnd')
      return;
    }
    //after dropping we need to change the status of the item that was dragged
    //Also rearrange the order in the respective array
    let temp:JobData;
        
    if(source.droppableId === 'notapplied'){
      console.log('source was notapplied')
      //get the destination.id, 
      nAJobs.map((job)=> {
        if (job.app_id === result.draggableId) {
          //source -> destination
          temp = Object.assign({}, job);
          switch(destination.droppableId){
            case 'inprogress':
              temp.status = 'Applied';
              break;
            case 'notapplied':
              temp.status = 'Not Applied';
              break;
          }
          console.log('after switch temp.status', temp.status)
          //we need to copy the nAJobs array, remove the job from it, and reset the nAJobs array
          const copynAJobs = [...nAJobs]
          const copyiPJobs = [...iPJobs]
          if(destination.droppableId === 'inprogress'){
            copyiPJobs.splice(destination.index, 0, temp)
            setIPJobs(copyiPJobs)
            copynAJobs.splice(source.index, 1); 
            setnAJobs(copynAJobs)
          } else if(destination.droppableId === 'Rejected' || destination.droppableId === 'Ghosted'){
            setDoneJobs(doneJobs.splice(destination.index, 0, temp))
            copynAJobs.splice(source.index, 1); 
            setnAJobs(copynAJobs)
          } else if(destination.droppableId === 'notapplied'){
            copynAJobs.splice(destination.index, 0, temp);
            copynAJobs.splice(source.index, 1); 
            setnAJobs(copynAJobs)
          }
        }
      })
    }
    else if(source.droppableId === 'inprogress'){
      console.log('source was inprogress')
      //get the destination.id, 
      iPJobs.map((job)=> {
        if (job.app_id === result.draggableId) {
          //source -> destination
          temp = Object.assign({}, job);
          switch(destination.droppableId){
            case 'inprogress':
              temp.status = 'Applied';
              break;
            case 'notapplied':
              temp.status = 'Not Applied';
              break;
          }
          console.log('after switch temp.status', temp.status)
          //we need to copy the nAJobs array, remove the job from it, and reset the nAJobs array
          const copynAJobs = [...nAJobs]
          const copyiPJobs = [...iPJobs]
          if(destination.droppableId === 'notapplied'){
            copynAJobs.splice(destination.index, 0, temp)
            setnAJobs(copynAJobs) //add to destination
            copyiPJobs.splice(source.index, 1); 
            setIPJobs(copyiPJobs)
          } else if(destination.droppableId === 'Rejected' || destination.droppableId === 'Ghosted'){
            setDoneJobs(doneJobs.splice(destination.index, 0, temp))
            copyiPJobs.splice(source.index, 1); 
            setIPJobs(copyiPJobs)
          } else if(destination.droppableId === 'inprogress'){
            copyiPJobs.splice(destination.index, 0, temp);
            copyiPJobs.splice(source.index, 1); 
            setIPJobs(copyiPJobs)
          }
        }
      })
    }
    //not yet flushed out the logic for this special double column
    //same for the other options involving the Done column above
    else if(source.droppableId === 'Rejected' || source.droppableId === 'Ghosted'){
      //get the destination.id, 
      doneJobs.map((job)=> {
        if (job.app_id === result.draggableId) {
          //source -> destination
          temp = Object.assign({}, job);
          temp.status = destination.droppableId;
          //we need to copy the nAJobs array, remove the job from it, and reset the nAJobs array
          const copyDoneJobs = [...doneJobs]
          if(statusConvert[destination.droppableId] === 'inprogress'){
            setIPJobs(iPJobs.splice(destination.index, 0, temp)) //add to destination
            copyDoneJobs.splice(source.index, 1); 
            setDoneJobs(copyDoneJobs)
          } else if(statusConvert[destination.droppableId] === 'notapplied'){
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
//Auth should go here
  // const loggedIn = window.localStorage.getItem("ssid");
  // console.log(loggedIn);

  // if (loggedIn == "guest") {
  //   // Redirect to the login page or show an access denied message
  //   return <Navigate to="/login" replace />;
  // }

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
