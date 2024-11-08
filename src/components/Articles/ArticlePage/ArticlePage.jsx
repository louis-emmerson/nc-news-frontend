import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArticleByID } from "../../../utils/api"
import Like from "../../Like"
import Unlike from "../../Unlike "
import CommentsSection from "../../Comments/CommentsSection"
import LikeCounter from "../../LikeCounter"

function ArticlePage() {
  const { articleID } = useParams()
  const navigate = useNavigate() 

  const [article, setArticle] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [articleVotes, setArticleVotes] = useState(0)
  
  let formattedDate = null

  if(article.created_at){
    const dateFormat = new Date(article.created_at)
    formattedDate = dateFormat.toISOString().substring(0, 10)
  }
  

  useEffect(() => {
    setIsLoading(true)
    getArticleByID(articleID).then((article) => {
      setArticle(article)
      setArticleVotes(article.votes)
      setIsLoading(false)
    }).catch(()=>{
      return navigate("/404NotFound")
    })
  }, [])
  
  

  return (
    <>
      <Card sx={{}}>
        <CardActionArea>
          {isLoading ? (
            <Skeleton
              sx={{ height: 200 }}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <CardMedia
              component="img"
              image={article.article_img_url}
              alt=""
              sx={{width:"100%",maxHeight:500}}
            />
          )}

          <CardContent>
            <Typography variant="caption">
              {isLoading ? <Skeleton /> : article.author}
            </Typography>

            <Typography gutterBottom variant="h5" component="div">
              {isLoading ? <Skeleton /> : article.title}
            </Typography>
            <Typography gutterBottom variant="body" component="div">
              {isLoading ? <Skeleton /> : article.body}
            </Typography>
            <Typography variant="caption">
              {isLoading ? <Skeleton /> :  formattedDate}
            </Typography>

          </CardContent>
        </CardActionArea>
        <CardActions>
          {isLoading ? null : (
            <>
            <LikeCounter votes={articleVotes} />
            <Like
              articleID={articleID}
              setArticleVotes={setArticleVotes}
              articleVotes={articleVotes}
              />
            <Unlike
              articleID={articleID}
              setArticleVotes={setArticleVotes}
              articleVotes={articleVotes}
              />
            </>

          )}
        </CardActions>
          <CommentsSection articleID={articleID} />
      </Card>
    </>
  )
}

export default ArticlePage
