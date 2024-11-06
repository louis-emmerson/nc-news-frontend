import { Box, Typography } from "@mui/material"
import TopicsList from "../components/Topics/TopicsList"

function PageNotFound() {
  return (
    <Box>
      <Typography variant="h2">Whoops Page Not Found!</Typography>
      <Typography variant="h5">Why Not select an article topic to get started with?</Typography>
      <TopicsList/>
    </Box>
  )
}

export default PageNotFound
