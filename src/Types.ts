export interface JobData {
  user_id: number,
  _id: number,
  company_name: string,
  position: string,
  listing_link: string,
  notes: string,
  applied_date: Date,
  last_updated: Date,
  status: string,
  // reminders: {
  //   reminderDate: Date,
  //   reminderType: string
  // }[]
}
