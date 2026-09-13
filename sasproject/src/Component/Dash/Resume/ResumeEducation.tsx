"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { EducationItem } from "@/Lib/resumeTypes";

interface ResumeEducationProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

const fieldStyles = {
  "& .MuiInputLabel-root": {
    color: "#94A3B8",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#60A5FA",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#0F172A",
    color: "#F8FAFC",
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#334155",
    },
    "&:hover fieldset": {
      borderColor: "#475569",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
    },
  },
  "& .MuiInputBase-input": {
    color: "#F8FAFC",
  },
};

export default function ResumeEducation({
  items,
  onChange,
}: ResumeEducationProps) {
  const addEducation = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        start_date: "",
        end_date: "",
      },
    ]);
  };

  const updateItem = (
    id: string,
    field: keyof EducationItem,
    value: string
  ) => {
    onChange(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          sx={{
            color: "#F8FAFC",
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          Education
        </Typography>

        <Button
          startIcon={<AddIcon />}
          onClick={addEducation}
          sx={{
            color: "#60A5FA",
            textTransform: "none",
          }}
        >
          Add Education
        </Button>
      </Box>

      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            border: "1px solid #1E293B",
            backgroundColor: "#0F172A",
            borderRadius: "12px",
            p: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              onClick={() => removeItem(item.id)}
              sx={{
                color: "#94A3B8",
                "&:hover": {
                  color: "#F87171",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Institution"
                value={item.institution}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "institution",
                    e.target.value
                  )
                }
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Degree"
                value={item.degree}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "degree",
                    e.target.value
                  )
                }
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Field of Study"
                value={item.field}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "field",
                    e.target.value
                  )
                }
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="month"
                label="Start Date"
                value={item.start_date}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "start_date",
                    e.target.value
                  )
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="month"
                label="End Date"
                value={item.end_date}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "end_date",
                    e.target.value
                  )
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={fieldStyles}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}