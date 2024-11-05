import { useEffect, useState } from "react"
import CommentCard from "./CommentCard"
import List from "@mui/material/List"
import { getCommentsByArticleID } from "../../utils/api"
import Error from "../Alerts/Error"
import LinearProgress from "@mui/material/LinearProgress"
import CommentAdder from "./CommentAdder"

function CommentList(props) {
  const {comments} = props


  return (
    <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
      {comments.map((comment,index) => {
        return <CommentCard key={index} comment={comment} />
      })}
    </List>
  )
}

export default CommentList
