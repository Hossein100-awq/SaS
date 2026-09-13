"use client";

import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ApplicationFilters from "@/Component/Dash/Application/ApplicationFilters";
import ApplicationList from "@/Component/Dash/Application/ApplicationList";

export default function ApplicationsPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

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
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/Dashboard/Applications/new")}
          sx={{
            backgroundColor: "#2563EB",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            px: 2.5,
            py: 1.2,
            "&:hover": {
              backgroundColor: "#1D4ED8",
            },
          }}
        >
          Add Application
        </Button>
      </Box>

      <ApplicationFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <ApplicationList
        search={search}
        status={status}
      />
    </Box>
  );
}