"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const faqs = [
  {
    question: "What is Nexora?",
    answer:
      "Nexora is a career workspace that helps you organize job applications, build professional resumes, and keep track of your job search progress in one place.",
  },
  {
    question: "Can I save my job applications?",
    answer:
      "Yes. You can add company, job title, job URL, location, salary, status, application date, and notes. Your applications are stored in your account and remain available when you return.",
  },
  {
    question: "Can I edit or delete an application?",
    answer:
      "Yes. Every application can be edited or deleted directly from your Applications dashboard. You can also open the original job posting when a URL is available.",
  },
  {
    question: "Can I create my resume with Nexora?",
    answer:
      "Yes. The Resume Builder lets you create a professional resume with personal information, experience, education, skills, projects, and languages.",
  },
  {
    question: "Can I export my resume?",
    answer:
      "Yes. Your completed resume can be exported as both PDF and Word documents.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your applications and resume data are associated with your authenticated account. Nexora uses user-based access policies so users can only access their own records.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(
      activeIndex === index ? null : index
    );
  };

  return (
    <section className="relative min-h-screen bg-[#0B1120] px-5 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[900px]">
        <Box
          sx={{
            textAlign: "center",
            mb: 7,
          }}
        >
          <Typography
            sx={{
              color: "#60A5FA",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            FAQ
          </Typography>

          <Typography
            sx={{
              color: "#F8FAFC",
              fontSize: {
                xs: "30px",
                md: "42px",
              },
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Frequently asked questions
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: "15px",
              mt: 2,
              lineHeight: 1.8,
            }}
          >
            Everything you need to know about using Nexora.
          </Typography>
        </Box>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition duration-300 ${
                  isOpen
                    ? "border-blue-500/25 bg-white/[0.035]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-white/90 sm:text-[15px]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                      isOpen
                        ? "border-blue-400/20 bg-blue-500/10 text-blue-400"
                        : "border-white/10 bg-white/[0.02] text-white/50"
                    }`}
                  >
                    {isOpen ? (
                      <RemoveIcon fontSize="small" />
                    ) : (
                      <AddIcon fontSize="small" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="h-px bg-white/[0.06]" />

                    <p className="pt-4 text-sm leading-7 text-white/50">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}