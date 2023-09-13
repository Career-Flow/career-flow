import { Box, Text} from '@chakra-ui/react'
import JobContainer from './JobContainer'
import {Droppable, Draggable} from '@hello-pangea/dnd'

const Inprogress = () => {
  return (
    <>
      <Box width="100%" h="100%" bg="#ededed" color="black" borderRadius="md" boxShadow='lg' borderWidth="1px" borderColor="#c0b0a9" p="2" display="flex" flexDir="column">
      <Text textAlign="center">In Progress</Text>
      <Droppable droppableId="inprogress">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId={"column55notapplied"} index={555666}>
                {(provided) => (

                  <JobContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}/>
                )}
                </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Box>
    </>
  )
}

export default Inprogress