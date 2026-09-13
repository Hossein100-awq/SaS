"use client";

import { Box, Chip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export interface RecentApplication {
  id: string;
  company: string;
  job_title: string;
  status: ApplicationStatus | string;
  applied_date: string | null;
}

interface ApplicationsCardProps {
  applications: RecentApplication[];
}

const statusConfig: Record<
  string,
  {
    color: string;
    background: string;
  }
> = {
  Saved: {
    color: "#CBD5E1",
    background: "#334155",
  },
  Applied: {
    color: "#60A5FA",
    background: "#1E3A8A",
  },
  Screening: {
    color: "#38BDF8",
    background: "#164E63",
  },
  Interview: {
    color: "#FBBF24",
    background: "#78350F",
  },
  Offer: {
    color: "#4ADE80",
    background: "#14532D",
  },
  Rejected: {
    color: "#F87171",
    background: "#7F1D1D",
  },
  Withdrawn: {
    color: "#94A3B8",
    background: "#334155",
  },
};

const defaultStatusStyle = {
  color: "#CBD5E1",
  background: "#334155",
};

export default function ApplicationsCard({
  applications,
}: ApplicationsCardProps) {
  const router = useRouter();

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#F8FAFC",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Recent Applications
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: "13px",
              mt: 0.5,
            }}
          >
            Your latest tracked opportunities
          </Typography>
        </Box>

        <Box
          onClick={() => router.push("/Dashboard/Applications")}
          sx={{
            color: "#60A5FA",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            "&:hover": {
              color: "#93C5FD",
            },
          }}
        >
          View all
        </Box>
      </Box>

      {applications.length === 0 ? (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#F8FAFC",
              fontWeight: 600,
            }}
          >
            No applications yet
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: "14px",
              mt: 1,
            }}
          >
            Add your first application to see it here.
          </Typography>
        </Box>
      ) : (
        <Box>
          {applications.map((application) => {
            const style =
              statusConfig[application.status] ??
              defaultStatusStyle;

            return (
              <Box
                key={application.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1.2fr 1.5fr 1fr auto",
                  },
                  gap: 2,
                  alignItems: "center",
                  py: 2,
                  borderBottom: "1px solid #1E293B",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "#F8FAFC",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {application.company}
                </Typography>

                <Typography
                  sx={{
                    color: "#CBD5E1",
                    fontSize: "14px",
                  }}
                >
                  {application.job_title}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "13px",
                  }}
                >
                  {application.applied_date || "No date"}
                </Typography>

                <Chip
                  label={application.status || "Unknown"}
                  size="small"
                  sx={{
                    width: "fit-content",
                    color: style.color,
                    backgroundColor: style.background,
                    fontWeight: 600,
                    borderRadius: "8px",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}