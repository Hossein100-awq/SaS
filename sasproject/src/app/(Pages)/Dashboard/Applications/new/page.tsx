"use client";

import { Box } from "@mui/material";

import ApplicationForm from "@/Component/Dash/Application/ApplicationForm";

export default function NewApplicationPage() {
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
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <ApplicationForm />
      </Box>
    </Box>
  );
}