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

import { ExperienceItem } from "@/Lib/resumeTypes";

interface ResumeExperienceProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
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

export default function ResumeExperience({
  items,
  onChange,
}: ResumeExperienceProps) {
  const addExperience = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    ]);
  };

  const updateItem = (
    id: string,
    field: keyof ExperienceItem,
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
          Experience
        </Typography>

        <Button
          startIcon={<AddIcon />}
          onClick={addExperience}
          sx={{
            color: "#60A5FA",
            textTransform: "none",
          }}
        >
          Add Experience
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
                label="Company"
                value={item.company}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "company",
                    e.target.value
                  )
                }
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Position"
                value={item.position}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "position",
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

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Description"
                value={item.description}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "description",
                    e.target.value
                  )
                }
                sx={fieldStyles}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}