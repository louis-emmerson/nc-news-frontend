import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import React, { useContext} from "react"
import LikeCounter from "../LikeCounter"
import { tickle122 } from "../../context/loggedInUser"
import DeleteButton from "../DeleteButton"
import { deleteArticleComment } from "../../utils/api"




function CommentCard(props) {
  const { comment, setComments } = props
  
  function deleteComment(){
    deleteArticleComment(comment.comment_id).then(()=>{
      console.log("Comment Deleted")
      setComments((curentComments)=>{
        return curentComments.filter((currComment)=> comment.comment_id !== currComment.comment_id)
      })
      
    })
    
  }
 
  const loggedInUser = useContext(tickle122)

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

      <ListItem style={{display:"flex",justifyContent:"space-between"}}>
      <LikeCounter votes={comment.votes}/>
      {loggedInUser.username ===comment.author? <DeleteButton deleteFunction={deleteComment}/>:null}
      </ListItem>
      <Divider variant="inset" component="li" />

    </>
  )
}

export default CommentCard
