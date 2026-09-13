"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { supabase } from "@/Lib/Supabase";

const Navbar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUserName(
          data.user.user_metadata?.full_name ||
            data.user.email ||
            "User"
        );
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUserName(
            session.user.user_metadata?.full_name ||
              session.user.email ||
              "User"
          );
        } else {
          setUserName("");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserName("");
    setOpen(false);
    router.push("/");
  };

  return (
    <nav className="relative z-50 w-full py-4 sm:py-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center"
          >
            <Image
              src="/ChatGPT Image Sep 9, 2026, 02_43_59 AM.png"
              alt="Nexora"
              width={52}
              height={52}
              priority
              className="h-11 w-11 object-contain transition-transform duration-300 hover:scale-105 sm:h-12 sm:w-12"
            />
          </button>

          <div className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              onClick={() => router.push("/Dashboard")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => router.push("/Testimonials")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
            >
              Testimonials
            </button>

            <button
              type="button"
              onClick={() => router.push("/FAQ")}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
            >
              FAQ
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          {userName ? (
            <button
              type="button"
              onClick={() => router.push("/Dashboard")}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.08] hover:text-blue-400"
            >
              {userName}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/SignIn")}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.08] hover:text-blue-400"
            >
              Login
            </button>
          )}

          {userName && (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition duration-300 hover:bg-white/[0.05] hover:text-red-400"
            >
              Logout
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white transition duration-300 hover:border-blue-500/20 hover:text-blue-400 sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <CloseIcon fontSize="small" />
          ) : (
            <MenuIcon fontSize="small" />
          )}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-white/[0.08] bg-[#0B1120] p-3 shadow-2xl sm:hidden">
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => {
                router.push("/Dashboard");
                closeMenu();
              }}
              className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                router.push("/Testimonials");
                closeMenu();
              }}
              className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
            >
              Testimonials
            </button>

            <button
              type="button"
              onClick={() => {
                router.push("/FAQ");
                closeMenu();
              }}
              className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
            >
              FAQ
            </button>

            <div className="my-2 h-px bg-white/[0.06]" />

            {userName ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/Dashboard");
                    closeMenu();
                  }}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
                >
                  {userName}
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition duration-300 hover:bg-red-500/[0.08] hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  router.push("/SignIn");
                  closeMenu();
                }}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white transition duration-300 hover:bg-white/[0.05] hover:text-blue-400"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;