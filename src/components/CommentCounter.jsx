import CommentIcon from "@mui/icons-material/CommentOutlined"
import { Button } from "@mui/material"

function CommentCount(props) {
  const { comments=0 } = props
  return (
    <Button startIcon={<CommentIcon />} variant="contained">
      {comments}
    </Button>
  )
}

export default CommentCount
