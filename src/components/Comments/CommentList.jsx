import CommentCard from "./CommentCard"
import List from "@mui/material/List"


function CommentList(props) {
  const {comments,setComments} = props


  return (
    <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
      {comments.map((comment,index) => {
        return <CommentCard key={index} comment={comment} setComments={setComments} />
      })}
    </List>
  )
}

export default CommentList
