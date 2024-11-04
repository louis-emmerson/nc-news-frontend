import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import ThumbUpIcon from "@mui/icons-material/ThumbUpOutlined"
import { Skeleton } from "@mui/material"

function ArticleCard(props) {
  const { article, isLoading } = props
  const { title, author, body, article_img_url } = article
  return (
    <Card sx={{ width: 375, minHeight:300}}>
      <CardActionArea>
        
      {isLoading ? (
        <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={article_img_url}
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {isLoading ? <Skeleton /> : title}
          </Typography>
          <Typography variant="caption">{isLoading ? <Skeleton /> : author}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isLoading ? null : <ThumbUpIcon /> }
      </CardActions>
    </Card>
  )
}

export default ArticleCard
