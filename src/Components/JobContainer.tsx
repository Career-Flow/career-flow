import React, {useState} from 'react'
import { Box } from '@chakra-ui/react'

type JobCondition = 'notApplied' | 'inProgress' | 'done';

const JobContainer = () => {
  //renders based off condition: not applied, inprogress, done
  const [jobCondition, setJobCondition] = useState<JobCondition>('notApplied')

  //if not applied: name of company, role
  //if inprogress: name of company, role, dropdown (state), date of last updated
  //done: name of company, role, accepted/rejected/ghosted - emoji
  return (
      <>
      <Box bg="white" w="100%" borderRadius="md" pl="2">
      {jobCondition==='notApplied' && <Box>
        <p>Company: ReactType</p>
        <p>Role: Software Engineer</p>
          </Box>}
      {jobCondition==='notApplied' && <Box>
        <p>Company: ReactType</p>
        <p>Role: Software Engineer</p>
          </Box>}
      </Box>
    </>
  )
}

export default JobContainer