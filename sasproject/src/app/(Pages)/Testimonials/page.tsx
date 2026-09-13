"use client";

import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Frontend Developer",
    text: "Nexora made it much easier to keep track of every application and know exactly where I stood with each opportunity.",
    initials: "SM",
  },
  {
    name: "Daniel Carter",
    role: "Product Designer",
    text: "The resume builder and application tracking workflow helped me keep my job search organized without using multiple tools.",
    initials: "DC",
  },
  {
    name: "Michael Anderson",
    role: "Software Engineer",
    text: "Clean, simple and focused. Nexora gives me a clear overview of my applications and keeps everything in one place.",
    initials: "MA",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-[#0B1120] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1200px]">
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
            Testimonials
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
            Built for a better job search
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: "15px",
              maxWidth: "650px",
              mx: "auto",
              mt: 2,
              lineHeight: 1.8,
            }}
          >
            A focused workspace designed to help job seekers stay
            organized and move forward with confidence.
          </Typography>
        </Box>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white">
                  {testimonial.initials}
                </div>

                <FormatQuoteIcon
                  sx={{
                    color: "#2563EB",
                    fontSize: 28,
                    opacity: 0.5,
                  }}
                />
              </div>

              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    sx={{
                      color: "#FBBF24",
                      fontSize: 16,
                    }}
                  />
                ))}
              </div>

              <Typography
                sx={{
                  color: "#CBD5E1",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  minHeight: {
                    md: "105px",
                  },
                }}
              >
                “{testimonial.text}”
              </Typography>

              <Box
                sx={{
                  borderTop: "1px solid #1E293B",
                  mt: 4,
                  pt: 3,
                }}
              >
                <Typography
                  sx={{
                    color: "#F8FAFC",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {testimonial.name}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "12px",
                    mt: 0.5,
                  }}
                >
                  {testimonial.role}
                </Typography>
              </Box>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}