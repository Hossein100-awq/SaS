"use client";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface ApplicationFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function ApplicationFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ApplicationFiltersProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "2fr 1fr",
        },
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search company or job title..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#64748B",
                  }}
                />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#111827",
            borderRadius: "10px",
            color: "#F8FAFC",

            "& fieldset": {
              borderColor: "#1E293B",
            },

            "&:hover fieldset": {
              borderColor: "#334155",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#2563EB",
            },
          },

          "& .MuiInputBase-input": {
            color: "#F8FAFC",
          },

          "& .MuiInputBase-input::placeholder": {
            color: "#64748B",
            opacity: 1,
          },
        }}
      />

      <FormControl fullWidth>
        <InputLabel
          sx={{
            color: "#64748B",

            "&.Mui-focused": {
              color: "#2563EB",
            },
          }}
        >
          Status
        </InputLabel>

        <Select
          value={status}
          label="Status"
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
          sx={{
            backgroundColor: "#111827",
            color: "#F8FAFC",
            borderRadius: "10px",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1E293B",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#334155",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563EB",
            },

            "& .MuiSelect-icon": {
              color: "#94A3B8",
            },
          }}
        >
          <MenuItem value="All">
            All Statuses
          </MenuItem>

          <MenuItem value="Saved">
            Saved
          </MenuItem>

          <MenuItem value="Applied">
            Applied
          </MenuItem>

          <MenuItem value="Screening">
            Screening
          </MenuItem>

          <MenuItem value="Interview">
            Interview
          </MenuItem>

          <MenuItem value="Offer">
            Offer
          </MenuItem>

          <MenuItem value="Rejected">
            Rejected
          </MenuItem>

          <MenuItem value="Withdrawn">
            Withdrawn
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}