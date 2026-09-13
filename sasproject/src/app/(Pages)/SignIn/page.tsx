"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/Lib/Supabase";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/Dashboard");
    router.refresh();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          p: "30px 22px",
          borderRadius: 2,
          background:
            "linear-gradient(145deg,rgba(48,18,81,.95),rgba(12,31,71,.96))",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: 23,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Welcome back
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 3,
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
            required
            autoComplete="current-password"
          />

          {error && (
            <Typography
              sx={{
                color: "#ff6b6b",
                fontSize: 12,
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            disabled={loading}
            sx={{
              height: 40,
              background: "#5865f2",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                background: "#4752c4",
              },
            }}
          >
            {loading ? "Signing..." : "Sign in"}
          </Button>
        </Box>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "#aaa",
            fontSize: 13,
          }}
        >
          Don't have account?

          <a
            href="/CreateAccount"
            style={{
              color: "#7183ff",
              marginLeft: 5,
            }}
          >
            Sign up
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

const inputStyle = {
  height: "40px",
  background: "#101827",
  border: "1px solid #30394f",
  borderRadius: "5px",
  color: "#fff",
  padding: "0 12px",
  outline: "none",
};