import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material"
import React from "react"
import AvatarIcon from "@mui/icons-material/AccountCircle"
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined"
import ThumbDownIcon from "@mui/icons-material/ThumbDownOutlined"


function CommentCard(props) {
  const { comment } = props
  console.log(comment)
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AvatarIcon fontSize="large"></AvatarIcon>
        </ListItemAvatar>
        <ListItemText
          primary={comment.author}
          secondary={
            <>
              <React.Fragment>{comment.body}</React.Fragment>
              <React.Fragment>{comment.created_at}</React.Fragment>
            </>
          }
        />
      </ListItem>
      <ListItem>
        {comment.votes >= 0 ? <ThumbUpIcon/>:<ThumbDownIcon/>}
        <Typography variant="body">{comment.votes}</Typography>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default CommentCard
