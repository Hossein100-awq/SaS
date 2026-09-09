"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";

function UserIcon() {
  return (
    <SvgIcon sx={{ fontSize: 19 }}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" />
    </SvgIcon>
  );
}

function EmailIcon() {
  return (
    <SvgIcon sx={{ fontSize: 19 }}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </SvgIcon>
  );
}

function LockIcon() {
  return (
    <SvgIcon sx={{ fontSize: 19 }}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2Zm-6-5c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3Zm6 17H6V10h12v10Zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z" />
    </SvgIcon>
  );
}

function CloseIcon() {
  return (
    <SvgIcon sx={{ fontSize: 16 }}>
      <path d="m18.3 5.71-1.41-1.42L12 9.17 7.11 4.29 5.7 5.7 10.59 10.59 5.7 15.48l1.41 1.41L12 12l4.89 4.89 1.41-1.41L13.41 10.59Z" />
    </SvgIcon>
  );
}

export default function CreateAccount() {
  const [password, setPassword] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "40px",
    padding: "0 34px",
    border: "1px solid #30394f",
    borderRadius: "5px",
    outline: "none",
    background: "#101827",
    color: "#ffffff",
    fontSize: "13px",
    fontFamily: "inherit",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
       
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 390,
          p: "28px 22px 24px",
          border: "1px solid rgba(108,145,255,.17)",
          borderRadius: "8px",
          background:
            "linear-gradient(145deg, rgba(48,18,81,.95) 0%, rgba(12,31,71,.96) 100%)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.02)",
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            mx: "auto",
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <path
              d="M25.8 4.5c2.2 5.6-1.1 10.7-5.7 13.2-4.1 2.3-7.7 6.2-7.7 11.4 0 7.1 5.7 12.4 13.2 12.4 7.7 0 13.4-5.3 13.4-12.8 0-5.7-3.4-9.6-7.8-12.6-1.8-1.3-3.2-3.8-2.4-6.8-1.2.9-2.3 2.5-3 5-1.3-3.1-.7-6.4 0-9.8Z"
              fill="#5F6FFF"
            />
            <path
              d="M25.5 24.1c2.6 1.8 4 4.1 4 6.7 0 3.4-2.2 5.7-5.4 5.7-3 0-5.2-2.1-5.2-5.1 0-2.8 2.4-5 4.8-6.5.8-.5 1.4-1.3 1.8-2.3Z"
              fill="#B7C0FF"
            />
          </svg>
        </Box>

        <Typography
          component="h1"
          sx={{
            color: "#ffffff",
            textAlign: "center",
            fontSize: 23,
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          Create your account
        </Typography>

        <Typography
          sx={{
            mt: 0.7,
            mb: 2.8,
            color: "#8993aa",
            textAlign: "center",
            fontSize: 13,
          }}
        >
          Join thousands of job seekers
        </Typography>

        <Box
          component="form"
          onSubmit={(event) => event.preventDefault()}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box>
            <Typography
              component="label"
              htmlFor="full-name"
              sx={{
                display: "block",
                mb: 0.7,
                color: "#d8ddef",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              Full name
            </Typography>

            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  left: 9,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#77809d",
                  display: "flex",
                  pointerEvents: "none",
                }}
              >
                <UserIcon />
              </Box>

              <input
                id="full-name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                style={inputStyle}
              />
            </Box>
          </Box>

          <Box>
            <Typography
              component="label"
              htmlFor="email"
              sx={{
                display: "block",
                mb: 0.7,
                color: "#d8ddef",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              Email address
            </Typography>

            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  left: 9,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#77809d",
                  display: "flex",
                  pointerEvents: "none",
                }}
              >
                <EmailIcon />
              </Box>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                style={inputStyle}
              />
            </Box>
          </Box>

          <Box>
            <Typography
              component="label"
              htmlFor="password"
              sx={{
                display: "block",
                mb: 0.7,
                color: "#d8ddef",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              Password
            </Typography>

            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  left: 9,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#77809d",
                  display: "flex",
                  pointerEvents: "none",
                }}
              >
                <LockIcon />
              </Box>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{
                  ...inputStyle,
                  paddingRight: password ? "38px" : "34px",
                }}
              />

              {password && (
                <IconButton
                  type="button"
                  onClick={() => setPassword("")}
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8992ad",
                    p: 0.5,
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          </Box>

          <Button
            type="submit"
            fullWidth
            disableElevation
            sx={{
              height: 39,
              mt: 0.5,
              borderRadius: "5px",
              textTransform: "none",
              background: "#5865f2",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 600,
              "&:hover": {
                background: "#4f5be7",
              },
            }}
          >
            Create account
          </Button>
        </Box>

        <Typography
          sx={{
            mt: 2.5,
            textAlign: "center",
            color: "#7f899f",
            fontSize: 11,
          }}
        >
          Already have an account?{" "}
          <Box
            component="a"
            href="/signin"
            sx={{
              color: "#7183ff",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign in
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}