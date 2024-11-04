import { useEffect, useState } from "react";
import CommentCard from "./CommentCard"
import List from '@mui/material/List';
import { getCommentsByArticleID } from "../../utils/api";
import Error from "../Alerts/Error";
import LinearProgress from '@mui/material/LinearProgress';


function CommentList(props){
    const {articleID} = props
    const [comments, setComments] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      setIsLoading(true)
      setIsError(false)
      getCommentsByArticleID(articleID).then((comments)=>{
        setIsLoading(false)  
        setComments(comments)
      })
      .catch(() =>{
        setIsLoading(false)  
        setIsError(true)
      })
  
    },[])
    if(isLoading) return <LinearProgress/>

    if(isError) return <Error errorMsg={"There has been an error fetching comments for this article"}/>

    return (
        <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
          {comments.map((comment)=>{
            return <CommentCard key={comment.comemnt_id} comment={comment}/>
          })}
        </List>
      );
}

export default CommentList
