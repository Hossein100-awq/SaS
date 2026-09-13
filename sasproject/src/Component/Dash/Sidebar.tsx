"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";

import { useRouter } from "next/navigation";

const menu = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Applications",
    icon: <WorkIcon />,
  },
  {
    title: "Resume",
    icon: <DescriptionIcon />,
  },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        background: "#0B1120",
        borderRight: "1px solid rgba(255,255,255,.08)",
        p: 3,
        pl: 1.5,
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          mb: 5,
        }}
      >
        Nexora
      </Typography>

      <Box>
        {menu.map((item, index) => (
          <Box
            key={item.title}
            onClick={() => {
              if (item.title === "Dashboard") {
                router.push("/Dashboard");
              }

              if (item.title === "Applications") {
                router.push("/Dashboard/Applications");
              }

              if (item.title === "Resume") {
                router.push("/Dashboard/Resume");
              }
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 1,
              py: 1.5,
              mb: 1,
              borderRadius: 2,

              cursor: "pointer",

              color: index === 0 ? "#fff" : "#94a3b8",

              background:
                index === 0
                  ? "rgba(88,101,242,.15)"
                  : "transparent",

              transition: "all .3s",

              "&:hover": {
                background: "rgba(88,101,242,.15)",
                color: "#fff",
              },

              "& svg": {
                fontSize: 21,
              },
            }}
          >
            {item.icon}

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}