import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material"
import React from "react"
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined"
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined"

function CommentCard(props) {
  const { comment } = props
  const dateFormat = new Date(comment.created_at);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "orange" }}>{comment.author[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment.author}
          secondary={
            <>
              <React.Fragment>{comment.body}</React.Fragment>
              <br/>
              <React.Fragment>{  dateFormat.toISOString().substring(0, 10)
              }</React.Fragment>
            </>
          }
        />
      </ListItem>

      <ListItem>
        {comment.votes >= 0 ? <ThumbUpIcon /> : <ThumbDownIcon />}
        <Typography variant="body">{comment.votes}</Typography>
      </ListItem>
      <Divider variant="inset" component="li" />

    </>
  )
}

export default CommentCard
