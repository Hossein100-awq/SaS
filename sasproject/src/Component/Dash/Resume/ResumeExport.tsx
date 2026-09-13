"use client";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box, Button } from "@mui/material";

import {
  Document as PdfDocument,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

import {
  Document as WordDocument,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from "docx";

import { ResumeData } from "@/Lib/resumeTypes";

interface ResumeExportProps {
  resume: ResumeData;
}

const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: "#111827",
  },

  name: {
    fontSize: 24,
    fontWeight: 700,
  },

  title: {
    fontSize: 12,
    color: "#2563EB",
    marginTop: 4,
  },

  contact: {
    fontSize: 8,
    color: "#64748B",
    marginTop: 8,
  },

  section: {
    marginTop: 18,
  },

  heading: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 7,
  },

  itemTitle: {
    fontSize: 10,
    fontWeight: 700,
  },

  blue: {
    color: "#2563EB",
  },

  text: {
    fontSize: 9,
    lineHeight: 1.5,
    marginTop: 3,
  },
});

function ResumePdf({
  resume,
}: {
  resume: ResumeData;
}) {
  return (
    <PdfDocument>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.name}>
          {resume.full_name || "Your Name"}
        </Text>

        <Text style={pdfStyles.title}>
          {resume.professional_title ||
            "Professional Title"}
        </Text>

        <Text style={pdfStyles.contact}>
          {[
            resume.email,
            resume.phone,
            resume.location,
            resume.linkedin,
            resume.github,
          ]
            .filter(Boolean)
            .join(" • ")}
        </Text>

        {resume.summary && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.heading}>
              SUMMARY
            </Text>

            <Text style={pdfStyles.text}>
              {resume.summary}
            </Text>
          </View>
        )}

        {resume.experience.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.heading}>
              EXPERIENCE
            </Text>

            {resume.experience.map((item) => (
              <View
                key={item.id}
                style={{
                  marginBottom: 10,
                }}
              >
                <Text style={pdfStyles.itemTitle}>
                  {item.position}
                </Text>

                <Text
                  style={[
                    pdfStyles.text,
                    pdfStyles.blue,
                  ]}
                >
                  {item.company}
                </Text>

                <Text style={pdfStyles.text}>
                  {item.start_date} —{" "}
                  {item.end_date || "Present"}
                </Text>

                {item.description && (
                  <Text style={pdfStyles.text}>
                    {item.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {resume.education.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.heading}>
              EDUCATION
            </Text>

            {resume.education.map((item) => (
              <View
                key={item.id}
                style={{
                  marginBottom: 9,
                }}
              >
                <Text style={pdfStyles.itemTitle}>
                  {item.degree}
                  {item.field
                    ? ` — ${item.field}`
                    : ""}
                </Text>

                <Text
                  style={[
                    pdfStyles.text,
                    pdfStyles.blue,
                  ]}
                >
                  {item.institution}
                </Text>

                <Text style={pdfStyles.text}>
                  {item.start_date} —{" "}
                  {item.end_date}
                </Text>
              </View>
            ))}
          </View>
        )}

        {resume.skills.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.heading}>
              SKILLS
            </Text>

            <Text style={pdfStyles.text}>
              {resume.skills
                .map(
                  (skill) =>
                    `${skill.name} (${skill.level})`
                )
                .join(" • ")}
            </Text>
          </View>
        )}

        {resume.projects.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.heading}>
              PROJECTS
            </Text>

            {resume.projects.map((project) => (
              <View
                key={project.id}
                style={{
                  marginBottom: 8,
                }}
              >
                <Text style={pdfStyles.itemTitle}>
                  {project.name}
                </Text>

                <Text style={pdfStyles.text}>
                  {project.description}
                </Text>

                {project.technologies && (
                  <Text
                    style={[
                      pdfStyles.text,
                      pdfStyles.blue,
                    ]}
                  >
                    {project.technologies}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {resume.languages.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.heading}>
              LANGUAGES
            </Text>

            <Text style={pdfStyles.text}>
              {resume.languages
                .map(
                  (language) =>
                    `${language.name} — ${language.level}`
                )
                .join(" • ")}
            </Text>
          </View>
        )}
      </Page>
    </PdfDocument>
  );
}

export default function ResumeExport({
  resume,
}: ResumeExportProps) {
  const downloadPdf = async () => {
    const blob = await pdf(
      <ResumePdf resume={resume} />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${
      resume.full_name || "resume"
    }.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const downloadWord = async () => {
    const children: Paragraph[] = [];

    children.push(
      new Paragraph({
        text:
          resume.full_name || "Your Name",
        heading: HeadingLevel.TITLE,
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text:
              resume.professional_title ||
              "Professional Title",
            bold: true,
            color: "2563EB",
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        text: [
          resume.email,
          resume.phone,
          resume.location,
          resume.linkedin,
          resume.github,
        ]
          .filter(Boolean)
          .join(" • "),
      })
    );

    if (resume.summary) {
      children.push(
        new Paragraph({
          text: "SUMMARY",
          heading: HeadingLevel.HEADING_1,
        })
      );

      children.push(
        new Paragraph({
          text: resume.summary,
        })
      );
    }

    if (resume.experience.length > 0) {
      children.push(
        new Paragraph({
          text: "EXPERIENCE",
          heading: HeadingLevel.HEADING_1,
        })
      );

      resume.experience.forEach((item) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: item.position,
                bold: true,
              }),
            ],
          })
        );

        children.push(
          new Paragraph({
            text: `${item.company} | ${item.start_date} — ${
              item.end_date || "Present"
            }`,
          })
        );

        if (item.description) {
          children.push(
            new Paragraph({
              text: item.description,
            })
          );
        }
      });
    }

    if (resume.education.length > 0) {
      children.push(
        new Paragraph({
          text: "EDUCATION",
          heading: HeadingLevel.HEADING_1,
        })
      );

      resume.education.forEach((item) => {
        children.push(
          new Paragraph({
            text: `${item.degree}${
              item.field
                ? ` — ${item.field}`
                : ""
            }`,
          })
        );

        children.push(
          new Paragraph({
            text: `${item.institution} | ${item.start_date} — ${item.end_date}`,
          })
        );
      });
    }

    if (resume.skills.length > 0) {
      children.push(
        new Paragraph({
          text: "SKILLS",
          heading: HeadingLevel.HEADING_1,
        })
      );

      children.push(
        new Paragraph({
          text: resume.skills
            .map(
              (skill) =>
                `${skill.name} (${skill.level})`
            )
            .join(" • "),
        })
      );
    }

    if (resume.projects.length > 0) {
      children.push(
        new Paragraph({
          text: "PROJECTS",
          heading: HeadingLevel.HEADING_1,
        })
      );

      resume.projects.forEach((project) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: project.name,
                bold: true,
              }),
            ],
          })
        );

        if (project.description) {
          children.push(
            new Paragraph({
              text: project.description,
            })
          );
        }

        if (project.technologies) {
          children.push(
            new Paragraph({
              text: `Technologies: ${project.technologies}`,
            })
          );
        }

        if (project.url) {
          children.push(
            new Paragraph({
              text: `URL: ${project.url}`,
            })
          );
        }
      });
    }

    if (resume.languages.length > 0) {
      children.push(
        new Paragraph({
          text: "LANGUAGES",
          heading: HeadingLevel.HEADING_1,
        })
      );

      children.push(
        new Paragraph({
          text: resume.languages
            .map(
              (language) =>
                `${language.name} — ${language.level}`
            )
            .join(" • "),
        })
      );
    }

    const wordDocument = new WordDocument({
      sections: [
        {
          children,
        },
      ],
    });

    const blob =
      await Packer.toBlob(wordDocument);

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${
      resume.full_name || "resume"
    }.docx`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mt: 3,
      }}
    >
      <Button
        variant="contained"
        startIcon={<PictureAsPdfIcon />}
        onClick={downloadPdf}
        sx={{
          backgroundColor: "#DC2626",
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#B91C1C",
          },
        }}
      >
        Download PDF
      </Button>

      <Button
        variant="outlined"
        startIcon={<DescriptionIcon />}
        onClick={downloadWord}
        sx={{
          color: "#60A5FA",
          borderColor: "#2563EB",
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 600,
          "&:hover": {
            borderColor: "#60A5FA",
            backgroundColor:
              "rgba(37,99,235,.08)",
          },
        }}
      >
        Download Word
      </Button>
    </Box>
  );
}