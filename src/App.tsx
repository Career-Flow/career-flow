import { Grid, GridItem } from '@chakra-ui/react'
import './App.css'
import NotApplied from './Components/NotApplied'
import Inprogress from './Components/Inprogress'
import Done from './Components/Done'

function App() {
  return (
    <>
      <Grid
        templateAreas={`"tabs tabs tabs"
                        "reminders reminders reminders"
                        "notapplied inprogress done"`}
        gridTemplateRows={'50px 10vh 1fr'}
        gridTemplateColumns={'1fr 1fr 1fr'}
        h='100vh'
        gap='3'
        color='blackAlpha.700'
        fontWeight='bold'
        p='2'
      >
        <GridItem pl='2' bg='orange.300' area={'tabs'}>
          Tabs
        </GridItem>
        <GridItem pl='2' bg='orange.300' area={'reminders'}>
          Reminders
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
