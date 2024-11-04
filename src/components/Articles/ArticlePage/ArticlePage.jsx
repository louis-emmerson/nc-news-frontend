import { Card, CardActionArea, CardActions, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import { useEffect,  useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleByID, getCommentsByArticleID } from "../../../utils/api"
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined"
import CommentList from "../../Comments/CommentList"

function ArticlePage() {
  const { articleID } = useParams()

  const [article, setArticle] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    setIsLoading(true)
    getArticleByID(articleID).then((article)=>{
        setArticle(article)
        setIsLoading(false)
    })
  },[])

  return (<>
    <Card sx={{ }}>
        <CardActionArea>
          
        {isLoading ? (
          <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
          component="img"
          height="10%"
          image={article.article_img_url}
          alt=""
          />
        )}

          <CardContent>
          <Typography variant="caption">{isLoading ? <Skeleton /> : article.author}</Typography>

            <Typography gutterBottom variant="h5" component="div">
              {isLoading ? <Skeleton /> : article.title}
            </Typography>
            <Typography gutterBottom variant="body" component="div">
              {isLoading ? <Skeleton /> : article.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      <CardActions>
        {isLoading ? null : <ThumbUpIcon /> }
      </CardActions>
      <CommentList articleID={articleID}/>
    </Card>
  </>

  )
}

export default ArticlePage
