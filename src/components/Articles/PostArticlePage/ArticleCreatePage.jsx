import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"

function ArticleCreatePage() {
  return (
    <Box
      width={"100%"}
      height={"80vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormControl
        sx={{ width: "70%", padding: 10, gap:1 }}
      >     
        <Typography textAlign={"center"} variant="h3">Create New Article</Typography>
        <TextField id="filled-basic" label="Title" variant="filled" />
        <TextField
          id="filled-multiline-static"
          label="Article Body"
          multiline
          rows={4}
          variant="filled"
        />
        <FormControl>
        <InputLabel id="topic-select-label">Topic</InputLabel>
        <Select
          labelId="topic-select-label"
          id="topic-select"
          value={"orderByInput"}
          label="Order By"
          onChange={(event) => {
            //   setOrderByInput(event.target.value)
          }}
        >
          <MenuItem value={"ASC"}>ASC</MenuItem>
          <MenuItem value={"DESC"}>DESC</MenuItem>
        </Select>
        </FormControl>
        <TextField
          id="filled-basic"
          label="Article Image Url"
          variant="filled"
        />
        <Button variant="contained">Submit</Button>

      </FormControl>
    </Box>
  )
}

export default ArticleCreatePage
