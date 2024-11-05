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
import { useParams } from "react-router-dom"
import { getArticleByID } from "../../../utils/api"
import CommentList from "../../Comments/CommentList"
import Like from "../../Like"
import ArticleLikeCounter from "../../ArticleLikeCounter"

function ArticlePage() {
  const { articleID } = useParams()

  const [article, setArticle] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [articleVotes, setArticleVotes] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    getArticleByID(articleID).then((article) => {
      setArticle(article)
      setArticleVotes(article.votes)
      setIsLoading(false)
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
              height="10%"
              image={article.article_img_url}
              alt=""
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <ArticleLikeCounter articleVotes={articleVotes} />
          {isLoading ? null : (
            <Like
              articleID={articleID}
              setArticleVotes={setArticleVotes}
              articleVotes={articleVotes}
            />
          )}
        </CardActions>
        <CommentList articleID={articleID} />
      </Card>
    </>
  )
}

export default ArticlePage
