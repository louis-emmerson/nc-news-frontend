import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"

import { Button } from "@mui/material"

function LikeCounter(props) {
  const { votes } = props

  return (
      <Button
        startIcon={votes >= 0 ? <ThumbUpIcon /> : <ThumbDownIcon />}
        variant="contained"
      >
        {votes}
      </Button>
  )
}

export default LikeCounter
