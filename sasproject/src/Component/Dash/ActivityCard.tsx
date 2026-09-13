"use client";

import { Box, Typography } from "@mui/material";

interface ActivityCardProps {
  totalApplications: number;
  interviewCount: number;
  offerCount: number;
  activeApplications: number;
  interviewRate: number;
}

export default function ActivityCard({
  totalApplications,
  interviewCount,
  offerCount,
  activeApplications,
  interviewRate,
}: ActivityCardProps) {
  let title = "Keep building momentum";
  let text = `You've added ${totalApplications} application${
    totalApplications !== 1 ? "s" : ""
  }. Continue applying consistently and tracking your progress.`;

  if (totalApplications === 0) {
    title = "Start your job search";

    text =
      "You don't have any applications yet. Add your first application to start tracking your progress.";
  } else if (offerCount > 0) {
    title = "Great progress";

    text = `You currently have ${offerCount} offer${
      offerCount > 1 ? "s" : ""
    }. Keep following up on your active applications.`;
  } else if (interviewCount > 0) {
    title = "Your applications are moving";

    text = `${interviewCount} application${
      interviewCount > 1 ? "s are" : " is"
    } currently at the screening or interview stage.`;
  } else if (totalApplications >= 10) {
    title = "Keep the momentum";

    text = `You've submitted ${totalApplications} applications. Consider reviewing your targeting and follow-up strategy.`;
  }

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
          color: "#F8FAFC",
          fontSize: "18px",
          fontWeight: 700,
        }}
      >
        Job Search Insights
      </Typography>

      <Typography
        sx={{
          color: "#60A5FA",
          fontSize: "15px",
          fontWeight: 600,
          mt: 3,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#94A3B8",
          fontSize: "14px",
          lineHeight: 1.8,
          mt: 1,
        }}
      >
        {text}
      </Typography>

      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "#0F172A",
          borderRadius: "12px",
        }}
      >
        <Typography
          sx={{
            color: "#64748B",
            fontSize: "12px",
          }}
        >
          Interview rate
        </Typography>

        <Typography
          sx={{
            color: "#F8FAFC",
            fontSize: "24px",
            fontWeight: 700,
            mt: 0.5,
          }}
        >
          {interviewRate}%
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: "#0F172A",
          borderRadius: "12px",
        }}
      >
        <Typography
          sx={{
            color: "#64748B",
            fontSize: "12px",
          }}
        >
          Active applications
        </Typography>

        <Typography
          sx={{
            color: "#F8FAFC",
            fontSize: "24px",
            fontWeight: 700,
            mt: 0.5,
          }}
        >
          {activeApplications}
        </Typography>
      </Box>
    </Box>
  );
}