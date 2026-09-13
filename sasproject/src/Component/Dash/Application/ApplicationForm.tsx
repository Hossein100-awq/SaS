"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { supabase } from "@/Lib/Supabase";
import {
  applicationSchema,
  ApplicationFormData,
} from "@/Lib/applicationSchema";
import { Application } from "@/Lib/applicationTypes";

interface ApplicationFormProps {
  application?: Application;
}

const FORM_STORAGE_KEY = "nexora_application_form";

const fieldStyles = {
  "& .MuiInputLabel-root": {
    color: "#94A3B8",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#60A5FA",
  },

  "& .MuiInputLabel-root.Mui-error": {
    color: "#F87171",
  },

  "& .MuiOutlinedInput-root": {
    backgroundColor: "#0F172A",
    color: "#F8FAFC",
    borderRadius: "10px",

    "& fieldset": {
      borderColor: "#334155",
    },

    "&:hover fieldset": {
      borderColor: "#475569",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
      borderWidth: "1px",
    },

    "&.Mui-error fieldset": {
      borderColor: "#EF4444",
    },
  },

  "& .MuiInputBase-input": {
    color: "#F8FAFC",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#64748B",
    opacity: 1,
  },

  "& .MuiFormHelperText-root": {
    color: "#64748B",
    marginLeft: 0,
  },

  "& .MuiFormHelperText-root.Mui-error": {
    color: "#F87171",
  },

  "& .MuiSelect-select": {
    color: "#F8FAFC",
  },

  "& .MuiSelect-icon": {
    color: "#94A3B8",
  },
};

export default function ApplicationForm({
  application,
}: ApplicationFormProps) {
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: application?.company ?? "",
      job_title: application?.job_title ?? "",
      job_url: application?.job_url ?? "",
      location: application?.location ?? "",
      salary: application?.salary ?? "",
      status: application?.status ?? "Applied",
      applied_date: application?.applied_date ?? "",
      notes: application?.notes ?? "",
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (application) {
      return;
    }

    const savedForm = localStorage.getItem(FORM_STORAGE_KEY);

    if (!savedForm) {
      return;
    }

    try {
      const parsedForm = JSON.parse(savedForm);

      reset({
        company: parsedForm.company ?? "",
        job_title: parsedForm.job_title ?? "",
        job_url: parsedForm.job_url ?? "",
        location: parsedForm.location ?? "",
        salary: parsedForm.salary ?? "",
        status: parsedForm.status ?? "Applied",
        applied_date: parsedForm.applied_date ?? "",
        notes: parsedForm.notes ?? "",
      });
    } catch {
      localStorage.removeItem(FORM_STORAGE_KEY);
    }
  }, [application, reset]);

  useEffect(() => {
    if (application) {
      return;
    }

    localStorage.setItem(
      FORM_STORAGE_KEY,
      JSON.stringify({
        company: formValues.company,
        job_title: formValues.job_title,
        job_url: formValues.job_url,
        location: formValues.location,
        salary: formValues.salary,
        status: formValues.status,
        applied_date: formValues.applied_date,
        notes: formValues.notes,
      })
    );
  }, [application, formValues]);

  const onSubmit = async (values: ApplicationFormData) => {
    setLoading(true);
    setSubmitError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setSubmitError(userError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        setSubmitError("You must be signed in to save the application.");
        setLoading(false);
        return;
      }

      const cleanSalary = values.salary
        .replace(/\D/g, "")
        .trim();

      const applicationData = {
        company: values.company.trim(),
        job_title: values.job_title.trim(),
        job_url: values.job_url.trim() || null,
        location: values.location.trim() || null,
        salary: cleanSalary || null,
        status: values.status,
        applied_date: values.applied_date || null,
        notes: values.notes.trim() || null,
      };

      if (application) {
        const { error } = await supabase
          .from("applications")
          .update({
            ...applicationData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", application.id)
          .eq("user_id", user.id);

        if (error) {
          setSubmitError(error.message);
          setLoading(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from("applications")
          .insert({
            user_id: user.id,
            ...applicationData,
          });

        if (error) {
          setSubmitError(error.message);
          setLoading(false);
          return;
        }
      }

      localStorage.removeItem(FORM_STORAGE_KEY);

      router.push("/Dashboard/Applications");
      router.refresh();
    } catch (error) {
      console.error("Application submit error:", error);
      setSubmitError(
        "Something went wrong while saving the application."
      );
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        backgroundColor: "#111827",
        border: "1px solid #1E293B",
        borderRadius: "16px",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: "#F8FAFC",
            fontSize: { xs: "20px", md: "22px" },
            fontWeight: 700,
          }}
        >
          {application ? "Edit Application" : "Add Application"}
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: "14px",
            mt: 0.8,
          }}
        >
          {application
            ? "Update the information for this application."
            : "Add a new job application to your tracker."}
        </Typography>
      </Box>

      {submitError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: "10px",
            backgroundColor: "rgba(239,68,68,0.1)",
            color: "#FCA5A5",
            border: "1px solid rgba(239,68,68,0.25)",
            "& .MuiAlert-icon": {
              color: "#F87171",
            },
          }}
        >
          {submitError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Company"
                  placeholder="e.g. Google"
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  sx={fieldStyles}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="job_title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Job Title"
                  placeholder="e.g. Frontend Developer"
                  error={!!errors.job_title}
                  helperText={errors.job_title?.message}
                  sx={fieldStyles}
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="job_url"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Job URL"
                  placeholder="https://example.com/jobs/123"
                  error={!!errors.job_url}
                  helperText={errors.job_url?.message}
                  sx={fieldStyles}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Location"
                  placeholder="e.g. Berlin, Germany"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  sx={fieldStyles}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Salary"
                  placeholder="e.g. 55000"
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                  onChange={(e) => {
                    const numericValue =
                      e.target.value.replace(/\D/g, "");

                    field.onChange(numericValue);
                  }}
                  slotProps={{
                    htmlInput: {
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    },
                  }}
                  sx={fieldStyles}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  sx={fieldStyles}
                >
                  <MenuItem value="Saved">Saved</MenuItem>
                  <MenuItem value="Applied">Applied</MenuItem>
                  <MenuItem value="Screening">Screening</MenuItem>
                  <MenuItem value="Interview">Interview</MenuItem>
                  <MenuItem value="Offer">Offer</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Withdrawn">Withdrawn</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="applied_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Applied Date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  error={!!errors.applied_date}
                  helperText={errors.applied_date?.message}
                  sx={{
                    ...fieldStyles,
                    "& input[type='date']::-webkit-calendar-picker-indicator": {
                      filter: "invert(1)",
                      cursor: "pointer",
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  minRows={5}
                  label="Notes"
                  placeholder="Add notes about the application..."
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                  sx={fieldStyles}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
            flexWrap: "wrap",
          }}
        >
          <Button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            sx={{
              color: "#CBD5E1",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 2.5,
              "&:hover": {
                backgroundColor: "#1E293B",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              px: 3,
              minWidth: "150px",
              "&:hover": {
                backgroundColor: "#1D4ED8",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={22}
                sx={{ color: "#FFFFFF" }}
              />
            ) : application ? (
              "Save Changes"
            ) : (
              "Add Application"
            )}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}