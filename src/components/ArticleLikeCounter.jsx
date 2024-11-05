import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"

import { Button } from "@mui/material"

function ArticleLikeCounter(props) {
  const { articleVotes } = props

  return (
    <>
      <Button
        startIcon={articleVotes >= 0 ? <ThumbUpIcon /> : <ThumbDownIcon />}
        variant="contained"
      >
        {articleVotes}
      </Button>
    </>
  )
}

export default ArticleLikeCounter
