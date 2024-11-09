import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import React, { useContext, useState} from "react"
import LikeCounter from "../LikeCounter"
import { tickle122 } from "../../context/loggedInUser"
import { deleteArticleComment } from "../../utils/api"
import DeleteCommentButton from "../Buttons/DeleteComment"
import Error from "../Alerts/Error"




function CommentCard(props) {
  const { comment, setComments } = props
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCommentDeleteError, setIsCommentDeleteError] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)

  
  function deleteComment(){
    setIsDeleting(true)
    deleteArticleComment(comment.comment_id).then(()=>{
      console.log("Comment Deleted")
      setIsDeleting(false)
      setComments((curentComments)=>{
        return curentComments.filter((currComment)=> comment.comment_id !== currComment.comment_id)
      })
      
    }).catch(()=>{
      setIsDeleting(false)
      setIsCommentDeleteError(true)
      setIsDeleteDisabled(true)
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
      {loggedInUser.username ===comment.author? <DeleteCommentButton isLoading={isDeleting} deleteFunction={deleteComment} isDeleteDisabled={isDeleteDisabled}/>:null}
      
      </ListItem>
      {isCommentDeleteError? <Error errorMsg={"There has been an error deleting your comment."}/>:null}
      <Divider variant="inset" component="li" />

    </>
  )
}

export default CommentCard
