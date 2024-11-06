import { Box, Typography } from "@mui/material"
import TopicsList from "../components/Topics/TopicsList"

function PageNotFound(props) {
    const {msg = "page"} = props
  return (
    <Box>
      <Typography sx={{marginBottom:2}} variant="h2">Whoops {msg} not found!</Typography>
      <Typography sx={{marginBottom:2}} variant="h5">Why not select an article topic to get started with?</Typography>
      <TopicsList/>
    </Box>
  )
}

export default PageNotFound
