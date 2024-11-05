import { useEffect, useState } from "react"
import CommentAdder from "./CommentAdder"
import CommentList from "./CommentList"
import { getCommentsByArticleID } from "../../utils/api"

function CommentsSection(props){
    const {articleID} = props

    const [comments, setComments] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newComments, setNewComments] = useState([])

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        getCommentsByArticleID(articleID)
          .then((comments) => {
            setIsLoading(false)
            setComments(comments)
          })
          .catch(() => {
            setIsLoading(false)
            setIsError(true)
          })
      }, [newComments])

    if(isLoading) return <></>

    return(<>
    <CommentAdder  articleID={articleID} setNewComments={setNewComments} />
    <CommentList articleID={articleID} comments={comments}/>
    </>)

}

export default CommentsSection