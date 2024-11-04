import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined"
import { Skeleton } from "@mui/material"
import { Link } from "react-router-dom"

function ArticleCard(props) {
  const { article, isLoading } = props
  const { article_id,title, author, article_img_url } = article
  return (
    <Card sx={{ width: 375, minHeight:300}}>
      <Link to={`/article/${article_id}`}>
        <CardActionArea>
          
        {isLoading ? (
          <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
          component="img"
          height="200"
          image={article_img_url}
          alt=""
          />
        )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {isLoading ? <Skeleton /> : title}
            </Typography>
            <Typography variant="caption">{isLoading ? <Skeleton /> : author}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        {isLoading ? null : <ThumbUpIcon /> }
      </CardActions>
    </Card>
  )
}

export default ArticleCard
