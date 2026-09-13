"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/Component/Dash/Sidebar";
import StatCard from "@/Component/Dash/StatCard";
import ChartCard, {
  ChartItem,
} from "@/Component/Dash/ChartCard";
import ApplicationsCard, {
  RecentApplication,
  ApplicationStatus,
} from "@/Component/Dash/ApplicationsCard";
import ActivityCard from "@/Component/Dash/ActivityCard";
import { supabase } from "@/Lib/Supabase";

interface DashboardApplication
  extends RecentApplication {
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [applications, setApplications] =
    useState<DashboardApplication[]>([]);

  const [userName, setUserName] =
    useState("there");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          setError(userError.message);
          setLoading(false);
          return;
        }

        if (!user) {
          router.push("/SignIn");
          return;
        }

        const fullName =
          user.user_metadata?.full_name;

        if (fullName) {
          setUserName(
            fullName.split(" ")[0]
          );
        }

        const {
          data,
          error: applicationsError,
        } = await supabase
          .from("applications")
          .select(
            "id, company, job_title, status, applied_date, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (applicationsError) {
          setError(
            applicationsError.message
          );
          setLoading(false);
          return;
        }

        setApplications(
          (data as DashboardApplication[]) ??
            []
        );
      } catch {
        setError(
          "Something went wrong while loading your dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const totalApplications =
    applications.length;

  const interviewCount =
    applications.filter(
      (application) =>
        application.status ===
          "Screening" ||
        application.status === "Interview"
    ).length;

  const offerCount =
    applications.filter(
      (application) =>
        application.status === "Offer"
    ).length;

  const activeApplications =
    applications.filter(
      (application) =>
        application.status !==
          "Rejected" &&
        application.status !==
          "Withdrawn" &&
        application.status !== "Offer"
    ).length;

  const interviewRate =
    totalApplications > 0
      ? Math.round(
          (interviewCount /
            totalApplications) *
            100
        )
      : 0;

  const recentApplications =
    applications.slice(0, 5);

  const chartData: ChartItem[] =
    useMemo(() => {
      const now = new Date();

      const months = Array.from(
        { length: 6 },
        (_, index) => {
          const date = new Date(
            now.getFullYear(),
            now.getMonth() -
              (5 - index),
            1
          );

          return {
            month: date.getMonth(),
            year: date.getFullYear(),
            label:
              date.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                }
              ),
            count: 0,
          };
        }
      );

      applications.forEach(
        (application) => {
          const date =
            application.applied_date
              ? new Date(
                  `${application.applied_date}T00:00:00`
                )
              : new Date(
                  application.created_at
                );

          const matchingMonth =
            months.find(
              (item) =>
                item.month ===
                  date.getMonth() &&
                item.year ===
                  date.getFullYear()
            );

          if (matchingMonth) {
            matchingMonth.count += 1;
          }
        }
      );

      return months;
    }, [applications]);

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
            sm: 3,
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
            Welcome back, {userName}
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: "14px",
              mt: 0.8,
            }}
          >
            Here is an overview of your job
            search activity.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          <StatCard
            title="Applications"
            value={totalApplications}
            subtitle="Total tracked"
          />

          <StatCard
            title="Interviews"
            value={interviewCount}
            subtitle={`${interviewRate}% interview rate`}
            subtitleColor="#60A5FA"
          />

          <StatCard
            title="Offers"
            value={offerCount}
            subtitle="Current offers"
            subtitleColor="#4ADE80"
          />

          <StatCard
            title="Active Applications"
            value={activeApplications}
            subtitle="Still in progress"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "2fr 1fr",
            },
            gap: 3,
            mt: 3,
          }}
        >
          <ChartCard data={chartData} />

          <ActivityCard
            totalApplications={
              totalApplications
            }
            interviewCount={
              interviewCount
            }
            offerCount={offerCount}
            activeApplications={
              activeApplications
            }
            interviewRate={
              interviewRate
            }
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <ApplicationsCard
            applications={
              recentApplications
            }
          />
        </Box>
      </Box>
    </Box>
  );
}