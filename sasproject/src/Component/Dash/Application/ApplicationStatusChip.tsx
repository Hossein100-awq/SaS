"use client";

import { Chip } from "@mui/material";

interface ApplicationStatusChipProps {
  status: string | null | undefined;
}

const statusConfig: Record<
  string,
  {
    label: string;
    color: "default" | "primary" | "success" | "warning" | "error";
  }
> = {
  Applied: {
    label: "Applied",
    color: "primary",
  },
  Screening: {
    label: "Screening",
    color: "warning",
  },
  Interview: {
    label: "Interview",
    color: "success",
  },
  Offer: {
    label: "Offer",
    color: "success",
  },
  Rejected: {
    label: "Rejected",
    color: "error",
  },
};

export default function ApplicationStatusChip({
  status,
}: ApplicationStatusChipProps) {
  const cleanStatus = (status ?? "")
    .trim()
    .replace(/[;'",]+$/g, "");

  const normalizedStatus =
    cleanStatus.charAt(0).toUpperCase() + cleanStatus.slice(1).toLowerCase();

  const current = statusConfig[normalizedStatus] ?? {
    label: normalizedStatus || "Unknown",
    color: "default" as const,
  };

  return (
    <Chip
      label={current.label}
      color={current.color}
      size="small"
      variant="outlined"
      sx={{
        fontWeight: 600,
      }}
    />
  );
}