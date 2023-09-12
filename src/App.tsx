import { Grid, GridItem, Button, ButtonGroup } from '@chakra-ui/react'
import './App.css'
import NotApplied from './Components/NotApplied'
import Inprogress from './Components/Inprogress'
import Done from './Components/Done'
import Reminder from './Components/Reminder'
import Navbar from './Components/Navbar'

function App() {
  return (
    <>
      <Grid
        templateAreas={`"tabs tabs tabs"
                        "reminders reminders reminders"
                        "notapplied inprogress done"`}
        gridTemplateRows={'50px 1fr 4fr'}
        gridTemplateColumns={'1fr 1fr 1fr'}
        h='100vh'
        gap='3'
        color='blackAlpha.700'
        fontWeight='bold'
        p='2'
      >
        <GridItem area={'tabs'} display="flex" justifyContent={"space-between"}>
        <ButtonGroup variant='outline' spacing='6' m={2}>
            <Button>Logo</Button>
            <Button colorScheme='blue' variant='outline'>Study Tab</Button>
        </ButtonGroup>
          <Navbar/>
        </GridItem>
        <GridItem area={'reminders'}>
          <Reminder/>
        </GridItem>
        <GridItem area={'notapplied'}>
          <NotApplied/>
        </GridItem>
        <GridItem area={'inprogress'}>
          <Inprogress/>
        </GridItem>
        <GridItem area={'done'}>
          <Done/>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
