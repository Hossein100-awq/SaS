"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ApplicationForm from "@/Component/Dash/Application/ApplicationForm";
import { supabase } from "@/Lib/Supabase";
import { Application } from "./../../../../../Lib/applicationTypes";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/SignIn");
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("applications")
          .select("*")
          .eq("id", params.id)
          .eq("user_id", user.id)
          .single();

        if (fetchError) {
          setError(fetchError.message);
          setLoading(false);
          return;
        }

        setApplication(data as Application);
      } catch {
        setError("Something went wrong while loading the application.");
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [params.id, router]);

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
        <CircularProgress sx={{ color: "#2563EB" }} />
      </Box>
    );
  }

  if (error || !application) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0B1120",
          color: "#F8FAFC",
          p: { xs: 2, md: 4 },
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            color: "#CBD5E1",
            border: "1px solid #1E293B",
            borderRadius: "10px",
            mb: 3,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          sx={{
            color: "#F87171",
            fontSize: "16px",
          }}
        >
          {error || "Application not found."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0B1120",
        color: "#F8FAFC",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            color: "#CBD5E1",
            border: "1px solid #1E293B",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#111827",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box>
          <Typography
            sx={{
              color: "#F8FAFC",
              fontSize: { xs: "24px", md: "30px" },
              fontWeight: 700,
            }}
          >
            Edit Application
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: "14px",
              mt: 0.5,
            }}
          >
            Update your job application details
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <ApplicationForm application={application} />
      </Box>
    </Box>
  );
}