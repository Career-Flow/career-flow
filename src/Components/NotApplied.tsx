import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import JobContainer from './JobContainer'
import { AddIcon} from '@chakra-ui/icons'

const NotApplied = () => {
  return (
    <>
      <Box w="100%" h="100%" bg="#ededed" color="black" borderRadius="md" boxShadow='lg' borderWidth="1px" borderColor="#c0b0a9" p="2" display="flex" flexDir="column">
        <h2>Not Applied</h2>
        <JobContainer/>
        <Button m="2" colorScheme='teal' size='md'>
          <AddIcon boxSize={4} />
        </Button>
      </Box>
    </>
  )
}

export default NotApplied;