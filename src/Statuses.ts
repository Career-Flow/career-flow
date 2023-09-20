import { DroppableId } from '@hello-pangea/dnd';

const statuses: { [key: string]: string } = {
  'Not Applied': 'notapplied',
  Applied: 'inprogress',
  Interviewing: 'inprogress',
  Waiting: 'inprogress',
  Rejected: 'result',
  Accepted: 'result',
  Ghosted: 'ghosted',
};

// translates back from the column droppableId back to the status found in DB
// defaults to Not Applied
export const statusSwitch = (droppableId: DroppableId) => {
  switch (droppableId) {
    case 'inprogress':
      return 'Applied';
    case 'result':
      return 'Rejected';
    case 'ghosted':
      return 'Ghosted';
    default:// assume it is Not Applied otherwise
      return 'Not Applied';
  }
};

export default statuses;
