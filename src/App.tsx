import { Grid, GridItem } from '@chakra-ui/react'
import './App.css'
import NotApplied from './Components/NotApplied'
import Inprogress from './Components/Inprogress'
import Done from './Components/Done'
import Reminder from './Components/Reminder'
import Navbar from './Components/Navbar'
import Logo from './assets/careerflow.png'
import {DragDropContext} from '@hello-pangea/dnd'

function App() {
  
  const onDragEnd = (result) =>{
    console.log(result)
    return;
  }

  return (
    <>
        <Grid
          templateAreas={`"tabs tabs tabs"
          "reminders reminders reminders"
          "notapplied inprogress done"`}
          gridTemplateRows={'0.1fr 0.5fr 3fr'}
          gridTemplateColumns={'1fr 2fr 1fr'}
          gap='3'
          color='blackAlpha.700'
          fontWeight='bold'
          backgroundColor='#ADD8E6'
          p='5'
          h='100vh'
        >
          <GridItem area={'tabs'} display="flex" justifyContent={"space-between"}>
          {/* <ButtonGroup spacing='6' m={2}>
              <Button style={{ width: '10vh' }} variant='unstyled'>
              <img src={Logo} alt="Logo" width='100vh'/>
              </Button>
              <Button colorScheme='blue' variant='outline'>Study Tab</Button>
            </ButtonGroup> */}
            <img src={Logo} alt="Logo" width='100vh'/>
            <Navbar/>
          </GridItem>
          <GridItem area={'reminders'}>
            <Reminder/>
          </GridItem>
          <DragDropContext onDragEnd={()=>console.log('test')}>
            <GridItem area={'notapplied'} maxW={'30vw'}>
              <NotApplied/>
            </GridItem>
            <GridItem area={'inprogress'}>
              <Inprogress/>
            </GridItem>
            <GridItem area={'done'} maxW={'30vw'}>
              <Done/>
            </GridItem>
          </DragDropContext>
        </Grid>
    </>
  )
}

export default App
