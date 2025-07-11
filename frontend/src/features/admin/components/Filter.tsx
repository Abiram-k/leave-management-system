import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

type FilterProp = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterRole: string;
  setFilterRole: (value: string) => void;
  isSearchNeed: boolean;
  isFilterNeed: boolean;
};
const Filter = ({
  filterRole,
  searchTerm,
  setFilterRole,
  setSearchTerm,
  isSearchNeed,
  isFilterNeed,
}: FilterProp) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      {isSearchNeed && (
        <TextField
          fullWidth
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
            sx: {
              color: "white",
              borderRadius: 2,
              borderColor: "rgba(255,255,255,0.2)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.4)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00d2ff",
                boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
              },
            },
          }}
        />
      )}
      {isFilterNeed && (
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
            Filter by Role
          </InputLabel>
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            sx={{
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.4)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00d2ff",
                boxShadow: "0 0 0 2px rgba(0,210,255,0.2)",
              },
              "& .MuiSelect-icon": {
                color: "rgba(255,255,255,0.7)",
              },
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <FilterIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            }
          >
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default Filter;
