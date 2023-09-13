import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import NotApplied from "./Components/NotApplied";
import Inprogress from "./Components/Inprogress";
import Done from "./Components/Done";
import Reminders from "./Components/Reminders";
import Navbar from "./Components/Navbar";
// import Logo from "./assets/careerflow.png";
import careerflowLogo from "./assets/careerflow.svg";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useState } from "react";

function App() {
  const [apps, setApps] = useState([]); //Use this for the state of the app
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;
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
    //reset state
  };

  const loggedIn = window.localStorage.getItem('ssid');
  console.log(loggedIn)

  if (loggedIn=='guest') {
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
        gridTemplateColumns={"1fr 2fr 1fr"}
        gap="3"
        color="blackAlpha.700"
        fontWeight="bold"
        // backgroundColor="#ADD8E6"
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
          <img src={careerflowLogo} alt="logo" width="100vh" />
          {/* <img src={Logo} alt="Logo" width="100vh" /> */}
          <Navbar />
        </GridItem>
        <GridItem area={"reminders"}>
          <Reminders />
        </GridItem>
        <DragDropContext onDragEnd={onDragEnd}>
          <GridItem area={"notapplied"} maxW={"30vw"}>
            <NotApplied />
          </GridItem>
          <GridItem area={"inprogress"}>
            <Inprogress />
          </GridItem>
          <GridItem area={"done"} maxW={"30vw"}>
            <Done />
          </GridItem>
        </DragDropContext>
      </Grid>
    </>
  );
}

export default App;
