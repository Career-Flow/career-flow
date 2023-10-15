import { JobFormData, JobFormError } from '../Types';

const formCheck = (jobFormData: JobFormData, setJobFormError: React.Dispatch<React.SetStateAction<JobFormError>>) => {
  let shouldReturn = false;
  const lowerListingLink = jobFormData.listing_link.toLowerCase();
  if (jobFormData.company_name.length === 0) {
    setJobFormError((prev) => ({ ...prev, company_name: true }));
    shouldReturn = true;
  } else {
    setJobFormError((prev) => ({ ...prev, company_name: false }));
  }
  if (jobFormData.position.length === 0) {
    setJobFormError((prev) => ({ ...prev, position: true }));
    shouldReturn = true;
  } else {
    setJobFormError((prev) => ({ ...prev, position: false }));
  }
  if (jobFormData.listing_link.length === 0 || (!lowerListingLink.startsWith('http://') && !lowerListingLink.startsWith('https://'))) {
    setJobFormError((prev) => ({ ...prev, listing_link: true }));
    shouldReturn = true;
  } else {
    setJobFormError((prev) => ({ ...prev, listing_link: false }));
  }
  // if (jobFormData.notes.length === 0) {
  //   setJobFormError((prev) => ({ ...prev, notes: true }));
  //   shouldReturn = true;
  // } else {
  //   setJobFormError((prev) => ({ ...prev, notes: false }));
  // }
  return shouldReturn;
};

export default formCheck;
