export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export interface Application {
  id: string;
  user_id: string;
  company: string;
  job_title: string;
  job_url: string | null;
  location: string | null;
  salary: string | null;
  status: ApplicationStatus;
  applied_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}