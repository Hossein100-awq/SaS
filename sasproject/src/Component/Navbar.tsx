"use client";

import React, { useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="relative z-50 w-full py-4 sm:py-5">
      <div className="flex w-full items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-6 md:gap-10">

          {/* LOGO */}
          <a
            href="/"
            aria-label="Nexora Home"
            className="flex items-center"
          >
            <Image
              src="/ChatGPT Image Sep 9, 2026, 02_43_59 AM.png"
              alt="Nexora"
              width={52}
              height={52}
              priority
              className="
                h-11
                w-11
                object-contain
                transition-transform
                duration-300
                hover:scale-105
                sm:h-12
                sm:w-12
              "
            />
          </a>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-1 md:flex">

            <a
              href="#features"
              className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              Features
            </a>

            <a
              href="#pricing"
              className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              Pricing
            </a>

            <a
              href="#testimonials"
              className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              Testimonials
            </a>

            <a
              href="#faq"
              className="
                rounded-lg
                px-4
                py-2
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              FAQ
            </a>

          </div>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 sm:flex">

          {/* LOGIN */}
          <button
            type="button"
            className="
              rounded-xl
              border
              border-white/15
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:border-blue-400/60
              hover:text-blue-400
            "
          >
            Login
          </button>

          {/* GET STARTED */}
          <button
            type="button"
            className="
              rounded-xl
              bg-blue-600
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/25
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-blue-500
              hover:shadow-xl
              hover:shadow-blue-500/30
              active:translate-y-0
            "
          >
            Get Started
          </button>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/15
            text-white
            transition-colors
            duration-300
            hover:border-blue-400/60
            hover:text-blue-400
            sm:hidden
          "
        >
          {open ? (
            <CloseIcon fontSize="small" />
          ) : (
            <MenuIcon fontSize="small" />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-3
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#080b2a]/95
            p-4
            shadow-2xl
            backdrop-blur-xl
            sm:hidden
          "
        >

          {/* LINKS */}
          <div className="flex flex-col">

            <a
              href="#features"
              onClick={closeMenu}
              className="
                px-3
                py-3
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              Features
            </a>

            <a
              href="#pricing"
              onClick={closeMenu}
              className="
                px-3
                py-3
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              Pricing
            </a>

            <a
              href="#testimonials"
              onClick={closeMenu}
              className="
                px-3
                py-3
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              Testimonials
            </a>

            <a
              href="#faq"
              onClick={closeMenu}
              className="
                px-3
                py-3
                text-sm
                font-medium
                text-white/75
                transition-colors
                duration-300
                hover:text-blue-400
              "
            >
              FAQ
            </a>

          </div>

          {/* MOBILE ACTIONS */}
          <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">

            <button
              type="button"
              onClick={closeMenu}
              className="
                flex-1
                rounded-xl
                border
                border-white/15
                py-2.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:border-blue-400/60
                hover:text-blue-400
              "
            >
              Login
            </button>

            <button
              type="button"
              onClick={closeMenu}
              className="
                flex-1
                rounded-xl
                bg-blue-600
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition-all
                duration-300
                hover:bg-blue-500
              "
            >
              Get Started
            </button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;