import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"

function ArticlesPageTopBar(props) {
  const { orderByInput, setOrderByInput, sortByInput, setSortByInput } = props
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Typography variant="h4">Articles</Typography>
      <Box sx={{ display: "flex" }}>
        <FormControl>
          <InputLabel id="sort-by-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-select-label"
            id="sort-by-select"
            value={sortByInput}
            label="Sort By"
            onChange={(event) => {
              setSortByInput(event.target.value)
            }}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"created_at"}>Date</MenuItem>
            <MenuItem value={"votes"}>Votes</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="order-by-select-label">Order By</InputLabel>
          <Select
            labelId="order-by-select-label"
            id="order-by-select"
            value={orderByInput}
            label="Order By"
            onChange={(event) => {
              setOrderByInput(event.target.value)
            }}
          >
            <MenuItem value={"ASC"}>ASC</MenuItem>
            <MenuItem value={"DESC"}>DESC</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default ArticlesPageTopBar
