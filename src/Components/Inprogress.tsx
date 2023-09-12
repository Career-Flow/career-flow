import React from 'react'
import { Box} from '@chakra-ui/react'
import JobContainer from './JobContainer'

const Inprogress = () => {
  return (
    <>
      <Box width="100%" height="100%" bg="#fff8f2"color="black" borderRadius="md" boxShadow='lg' borderWidth="1px" borderColor="#c0b0a9" p="2" display="flex" flexDir="column">
        Hello I am in progress
      </Box>
    </>
  )
}

export default Inprogress