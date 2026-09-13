import { z } from "zod";

export const applicationSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, "Company name is required"),

  job_title: z
    .string()
    .trim()
    .min(2, "Job title is required"),

  job_url: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .max(100, "Location is too long"),

  salary: z
    .string()
    .trim()
    .max(100, "Salary is too long"),

  status: z.enum([
    "Saved",
    "Applied",
    "Screening",
    "Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ]),

  applied_date: z.string(),

  notes: z
    .string()
    .trim()
    .max(2000, "Notes cannot exceed 2000 characters"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;