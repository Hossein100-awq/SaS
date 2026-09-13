"use client";

import { Box, Divider, Typography } from "@mui/material";

import { ResumeData } from "@/Lib/resumeTypes";

interface ResumePreviewProps {
  resume: ResumeData;
}

export default function ResumePreview({
  resume,
}: ResumePreviewProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#111827",
        width: "100%",
        maxWidth: "800px",
        minHeight: "1050px",
        mx: "auto",
        p: {
          xs: 3,
          md: 5,
        },
        boxShadow:
          "0 20px 50px rgba(0,0,0,.35)",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "28px",
            md: "34px",
          },
          fontWeight: 800,
          color: "#111827",
        }}
      >
        {resume.full_name ||
          "Your Name"}
      </Typography>

      <Typography
        sx={{
          color: "#2563EB",
          fontSize: "16px",
          fontWeight: 600,
          mt: 0.5,
        }}
      >
        {resume.professional_title ||
          "Professional Title"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mt: 2,
          color: "#475569",
          fontSize: "12px",
        }}
      >
        {resume.email && (
          <span>{resume.email}</span>
        )}

        {resume.phone && (
          <span>{resume.phone}</span>
        )}

        {resume.location && (
          <span>{resume.location}</span>
        )}

        {resume.linkedin && (
          <span>{resume.linkedin}</span>
        )}

        {resume.github && (
          <span>{resume.github}</span>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {resume.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "14px",
              mb: 1,
              color: "#111827",
            }}
          >
            SUMMARY
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: 1.8,
              color: "#475569",
            }}
          >
            {resume.summary}
          </Typography>
        </Box>
      )}

      {resume.experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "14px",
              mb: 2,
            }}
          >
            EXPERIENCE
          </Typography>

          {resume.experience.map(
            (experience) => (
              <Box
                key={experience.id}
                sx={{ mb: 2.5 }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {experience.position}
                </Typography>

                <Typography
                  sx={{
                    color: "#2563EB",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {experience.company}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "11px",
                    mt: 0.3,
                  }}
                >
                  {experience.start_date}{" "}
                  —{" "}
                  {experience.end_date ||
                    "Present"}
                </Typography>

                {experience.description && (
                  <Typography
                    sx={{
                      color: "#475569",
                      fontSize: "12px",
                      lineHeight: 1.7,
                      mt: 0.8,
                    }}
                  >
                    {experience.description}
                  </Typography>
                )}
              </Box>
            )
          )}
        </Box>
      )}

      {resume.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "14px",
              mb: 2,
            }}
          >
            EDUCATION
          </Typography>

          {resume.education.map(
            (education) => (
              <Box
                key={education.id}
                sx={{ mb: 2 }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {education.degree}
                  {education.field
                    ? ` — ${education.field}`
                    : ""}
                </Typography>

                <Typography
                  sx={{
                    color: "#2563EB",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {education.institution}
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "11px",
                    mt: 0.3,
                  }}
                >
                  {education.start_date}{" "}
                  —{" "}
                  {education.end_date}
                </Typography>
              </Box>
            )
          )}
        </Box>
      )}

      {resume.skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "14px",
              mb: 2,
            }}
          >
            SKILLS
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {resume.skills.map((skill) => (
              <Box
                key={skill.id}
                sx={{
                  backgroundColor: "#EFF6FF",
                  color: "#1D4ED8",
                  borderRadius: "6px",
                  px: 1.2,
                  py: 0.7,
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {skill.name}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {resume.projects.length > 0 && (
        <Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "14px",
              mb: 2,
            }}
          >
            PROJECTS
          </Typography>

          {resume.projects.map(
            (project) => (
              <Box
                key={project.id}
                sx={{ mb: 2 }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {project.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#475569",
                    lineHeight: 1.7,
                    mt: 0.5,
                  }}
                >
                  {project.description}
                </Typography>

                {project.technologies && (
                  <Typography
                    sx={{
                      color: "#2563EB",
                      fontSize: "11px",
                      mt: 0.5,
                    }}
                  >
                    {project.technologies}
                  </Typography>
                )}
              </Box>
            )
          )}
        </Box>
      )}

      {resume.languages.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "14px",
              mb: 1.5,
            }}
          >
            LANGUAGES
          </Typography>

          {resume.languages.map(
            (language) => (
              <Typography
                key={language.id}
                sx={{
                  fontSize: "12px",
                  color: "#475569",
                  mb: 0.5,
                }}
              >
                {language.name} —{" "}
                {language.level}
              </Typography>
            )
          )}
        </Box>
      )}
    </Box>
  );
}