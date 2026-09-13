"use client";

import { Box, Typography } from "@mui/material";

export interface ChartItem {
  month: number;
  year: number;
  label: string;
  count: number;
}

interface ChartCardProps {
  data: ChartItem[];
}

export default function ChartCard({
  data,
}: ChartCardProps) {
  const maxValue = Math.max(
    ...data.map((item) => item.count),
    1
  );

  return (
    <Box
      sx={{
        backgroundColor: "#111827",
        border: "1px solid #1E293B",
        borderRadius: "16px",
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      <Typography
        sx={{
          color: "#F8FAFC",
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        Application Activity
      </Typography>

      <Typography
        sx={{
          color: "#64748B",
          fontSize: "13px",
          mt: 0.5,
        }}
      >
        Applications submitted during the last 6 months
      </Typography>

      <Box
        sx={{
          mt: 4,
          height: 280,
          display: "flex",
          alignItems: "flex-end",
          gap: {
            xs: 1,
            sm: 2,
          },
          overflow: "hidden",
        }}
      >
        {data.map((item) => (
          <Box
            key={`${item.year}-${item.month}`}
            sx={{
              flex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                color: "#CBD5E1",
                fontSize: "12px",
                mb: 1,
              }}
            >
              {item.count}
            </Typography>

            <Box
              sx={{
                width: "100%",
                maxWidth: "55px",
                height: `${
                  item.count === 0
                    ? 4
                    : (item.count / maxValue) * 190
                }px`,
                minHeight: "4px",
                backgroundColor: "#2563EB",
                borderRadius: "8px 8px 2px 2px",
                transition: "height .4s ease",
              }}
            />

            <Typography
              sx={{
                color: "#64748B",
                fontSize: "12px",
                mt: 1.5,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}