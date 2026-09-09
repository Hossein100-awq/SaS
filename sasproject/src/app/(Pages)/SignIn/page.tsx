"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";

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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  };

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
        background:
          "radial-gradient(circle at 20% 10%, rgba(106,58,166,.25), transparent 35%), radial-gradient(circle at 85% 20%, rgba(41,94,201,.2), transparent 35%), #05091a",
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
          }}
        >
          <svg width="44" height="44" viewBox="0 0 48 48">
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
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: 23,
            fontWeight: 700,
          }}
        >
          Welcome back
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
          Sign in to your account to continue
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#d8ddef",
                fontSize: 12,
                mb: 0.7,
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
                }}
              >
                <EmailIcon />
              </Box>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </Box>
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.7,
              }}
            >
              <Typography
                sx={{
                  color: "#d8ddef",
                  fontSize: 12,
                }}
              >
                Password
              </Typography>

              <Typography
                sx={{
                  color: "#7183ff",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  left: 9,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#77809d",
                }}
              >
                <LockIcon />
              </Box>

              <input
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />

              {password && (
                <IconButton
                  onClick={() => setPassword("")}
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8992ad",
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
            sx={{
              height: 39,
              borderRadius: "5px",
              textTransform: "none",
              background: "#5865f2",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Sign in
          </Button>

          <Button
            type="button"
            fullWidth
            onClick={() => signIn("google")}
            sx={{
              height: 39,
              borderRadius: "5px",
              textTransform: "none",
              background: "#fff",
              color: "#222",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Continue with Google
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
          Don't have an account?{" "}
          <Box
            component="a"
            href="/create-account"
            sx={{
              color: "#7183ff",
              textDecoration: "none",
            }}
          >
            Sign up
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}