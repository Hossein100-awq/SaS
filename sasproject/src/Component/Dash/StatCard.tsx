"use client";

import { Box, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  subtitleColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  subtitleColor = "#64748B",
}: StatCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#111827",
        border: "1px solid #1E293B",
        borderRadius: "16px",
        p: 3,
      }}
    >
      <Typography
        sx={{
          color: "#94A3B8",
          fontSize: "14px",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#F8FAFC",
          fontSize: "32px",
          fontWeight: 700,
          mt: 1,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          color: subtitleColor,
          fontSize: "13px",
          mt: 1,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}