/* eslint-disable no-underscore-dangle */
import { JobData } from '../Types';

const updateDB = async (setJobs: React.Dispatch<React.SetStateAction<JobData[]>>, job: JobData, status = job.status) => {
  try {
    const response = await fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...job, last_updated: new Date().toISOString(), status }),
    });
    // pass new job object to back

    const data = await response.json();
    setJobs((prev) => prev.map((ele) => {
      if (ele._id === job._id) {
        return data;
      }
      return ele;
    }));
    console.log(data, 'updateDB successful-----------');
    // can we get the full job list then set the state? or somehow find the job in the state then change it
  } catch (err) {
    console.log(`updateDB unsuccessful ${err}`);
  }
};

export default updateDB;
