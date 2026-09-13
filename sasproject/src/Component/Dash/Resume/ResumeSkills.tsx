"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { SkillItem } from "@/Lib/resumeTypes";

interface ResumeSkillsProps {
  items: SkillItem[];
  onChange: (items: SkillItem[]) => void;
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

export default function ResumeSkills({
  items,
  onChange,
}: ResumeSkillsProps) {
  const addSkill = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        name: "",
        level: "Intermediate",
      },
    ]);
  };

  const updateItem = (
    id: string,
    field: keyof SkillItem,
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
          Skills
        </Typography>

        <Button
          startIcon={<AddIcon />}
          onClick={addSkill}
          sx={{
            color: "#60A5FA",
            textTransform: "none",
          }}
        >
          Add Skill
        </Button>
      </Box>

      {items.map((item) => (
        <Grid
          container
          spacing={2}
          key={item.id}
          sx={{
            mb: 1.5,
            alignItems: "center",
          }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Skill"
              value={item.name}
              onChange={(e) =>
                updateItem(
                  item.id,
                  "name",
                  e.target.value
                )
              }
              sx={fieldStyles}
            />
          </Grid>

          <Grid size={{ xs: 10, md: 5 }}>
            <TextField
              fullWidth
              select
              label="Level"
              value={item.level}
              onChange={(e) =>
                updateItem(
                  item.id,
                  "level",
                  e.target.value
                )
              }
              sx={fieldStyles}
            >
              <MenuItem value="Beginner">
                Beginner
              </MenuItem>

              <MenuItem value="Intermediate">
                Intermediate
              </MenuItem>

              <MenuItem value="Advanced">
                Advanced
              </MenuItem>

              <MenuItem value="Expert">
                Expert
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 2, md: 1 }}>
            <IconButton
              onClick={() =>
                removeItem(item.id)
              }
              sx={{
                color: "#94A3B8",
                "&:hover": {
                  color: "#F87171",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}