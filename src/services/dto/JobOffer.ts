export interface JobOfferDto {
  name: string;
  workday: string;
  creationDate: string;
  offerid: string;
  status: boolean;
  companyid: string;
  applicants: Applicants[]; // This indicates that 'applicants' can be an empty array
}

export interface Applicants {
  offerid: string,
  userid: string,
}