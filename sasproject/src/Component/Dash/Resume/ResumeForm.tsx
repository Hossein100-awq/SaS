"use client";

import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { supabase } from "@/Lib/Supabase";
import {
  ResumeData,
} from "@/Lib/resumeTypes";

import ResumeEducation from "./ResumeEducation";
import ResumeExperience from "./ResumeExperience";
import ResumeSkills from "./ResumeSkills";

interface ResumeFormProps {
  resume: ResumeData;
  onChange: (resume: ResumeData) => void;
  onSaved: () => void;
}

const fieldStyles = {
  "& .MuiInputLabel-root": {
    color: "#94A3B8",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#60A5FA",
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
    },
  },
  "& .MuiInputBase-input": {
    color: "#F8FAFC",
  },
};

export default function ResumeForm({
  resume,
  onChange,
  onSaved,
}: ResumeFormProps) {
  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const updateField = (
    field: keyof ResumeData,
    value: string
  ) => {
    onChange({
      ...resume,
      [field]: value,
    });
  };

  const saveResume = async () => {
    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setError(userError.message);
        return;
      }

      if (!user) {
        setError(
          "You must be signed in to save your resume."
        );
        return;
      }

      const payload = {
        user_id: user.id,
        full_name: resume.full_name,
        professional_title:
          resume.professional_title,
        email: resume.email,
        phone: resume.phone,
        location: resume.location,
        linkedin: resume.linkedin,
        github: resume.github,
        summary: resume.summary,
        experience: resume.experience,
        education: resume.education,
        skills: resume.skills,
        projects: resume.projects,
        languages: resume.languages,
        updated_at:
          new Date().toISOString(),
      };

      const { data: existing } =
        await supabase
          .from("resumes")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

      let saveError;

      if (existing?.id) {
        const { error } =
          await supabase
            .from("resumes")
            .update(payload)
            .eq("id", existing.id)
            .eq("user_id", user.id);

        saveError = error;
      } else {
        const { error } =
          await supabase
            .from("resumes")
            .insert(payload);

        saveError = error;
      }

      if (saveError) {
        setError(saveError.message);
        return;
      }

      onSaved();
    } catch {
      setError(
        "Something went wrong while saving your resume."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <Box
        sx={{
          backgroundColor: "#111827",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          p: { xs: 2, md: 3 },
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#F8FAFC",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              Resume Builder
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                fontSize: "13px",
                mt: 0.5,
              }}
            >
              Build your professional resume
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveResume}
            disabled={saving}
            sx={{
              backgroundColor: "#2563EB",
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#1D4ED8",
              },
            }}
          >
            {saving ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#FFFFFF",
                }}
              />
            ) : (
              "Save Resume"
            )}
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={resume.full_name}
              onChange={(e) =>
                updateField(
                  "full_name",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Professional Title"
              value={resume.professional_title}
              onChange={(e) =>
                updateField(
                  "professional_title",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              value={resume.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              value={resume.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Location"
              value={resume.location}
              onChange={(e) =>
                updateField(
                  "location",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="LinkedIn"
              value={resume.linkedin}
              onChange={(e) =>
                updateField(
                  "linkedin",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="GitHub"
              value={resume.github}
              onChange={(e) =>
                updateField(
                  "github",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              minRows={5}
              label="Professional Summary"
              value={resume.summary}
              onChange={(e) =>
                updateField(
                  "summary",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          backgroundColor: "#111827",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          p: { xs: 2, md: 3 },
          mb: 3,
        }}
      >
        <ResumeExperience
          items={resume.experience}
          onChange={(items) =>
            onChange({
              ...resume,
              experience: items,
            })
          }
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "#111827",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          p: { xs: 2, md: 3 },
          mb: 3,
        }}
      >
        <ResumeEducation
          items={resume.education}
          onChange={(items) =>
            onChange({
              ...resume,
              education: items,
            })
          }
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "#111827",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          p: { xs: 2, md: 3 },
        }}
      >
        <ResumeSkills
          items={resume.skills}
          onChange={(items) =>
            onChange({
              ...resume,
              skills: items,
            })
          }
        />
      </Box>
    </Box>
  );
}