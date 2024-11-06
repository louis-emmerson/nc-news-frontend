import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

function TopicCard(props) {
  const { description, slug } = props.topic
  const formattedTitle = slug[0].toUpperCase() + slug.slice(1)
  return (
    <Box sx={{ minWidth: 275, maxWidth: 600 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {formattedTitle}
          </Typography>
          <Typography sx={{ color: "grey" }}>{description}</Typography>
        </CardContent>
        <CardActions>
        <Link to={`/articles?topic=${slug}`}>
          <Button size="small">View Articles</Button>
        </Link>
        </CardActions>
      </Card>
    </Box>
  )
}

export default TopicCard
