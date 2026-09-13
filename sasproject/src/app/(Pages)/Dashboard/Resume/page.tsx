"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/Component/Dash/Sidebar";
import ResumeForm from "@/Component/Dash/Resume/ResumeForm";
import ResumePreview from "@/Component/Dash/Resume/ResumePreview";
import ResumeExport from "@/Component/Dash/Resume/ResumeExport";

import { supabase } from "@/Lib/Supabase";
import { ResumeData } from "@/Lib/resumeTypes";

const emptyResume: ResumeData = {
  full_name: "",
  professional_title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
};

export default function ResumePage() {
  const router = useRouter();

  const [resume, setResume] =
    useState<ResumeData>(emptyResume);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [savedMessage, setSavedMessage] =
    useState("");

  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/SignIn");
          return;
        }

        const {
          data,
          error: fetchError,
        } = await supabase
          .from("resumes")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (fetchError) {
          setError(fetchError.message);
          return;
        }

        if (data) {
          setResume({
            id: data.id,
            full_name:
              data.full_name ?? "",
            professional_title:
              data.professional_title ??
              "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            location:
              data.location ?? "",
            linkedin:
              data.linkedin ?? "",
            github:
              data.github ?? "",
            summary:
              data.summary ?? "",
            experience:
              data.experience ?? [],
            education:
              data.education ?? [],
            skills:
              data.skills ?? [],
            projects:
              data.projects ?? [],
            languages:
              data.languages ?? [],
          });
        }
      } catch {
        setError(
          "Something went wrong while loading your resume."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [router]);

  const handleSaved = () => {
    setSavedMessage(
      "Resume saved successfully."
    );

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0B1120",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: "#2563EB",
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0B1120",
          p: 4,
        }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0B1120",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: "#F8FAFC",
              fontSize: {
                xs: "24px",
                md: "30px",
              },
              fontWeight: 700,
            }}
          >
            Resume
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: "14px",
              mt: 0.8,
            }}
          >
            Create, save and export your professional resume.
          </Typography>
        </Box>

        {savedMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: "10px",
            }}
          >
            {savedMessage}
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "minmax(0, 1fr) minmax(500px, 0.9fr)",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          <ResumeForm
            resume={resume}
            onChange={setResume}
            onSaved={handleSaved}
          />

          <Box
            sx={{
              position: {
                xl: "sticky",
              },
              top: {
                xl: 24,
              },
            }}
          >
            <Typography
              sx={{
                color: "#F8FAFC",
                fontSize: "18px",
                fontWeight: 700,
                mb: 2,
              }}
            >
              Live Preview
            </Typography>

            <ResumePreview
              resume={resume}
            />

            <ResumeExport
              resume={resume}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}