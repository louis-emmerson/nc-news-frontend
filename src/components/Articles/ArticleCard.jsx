import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';


function ArticleCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="/"
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Article Title
          </Typography>
          <Typography variant='caption'>
            Author Name
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, nisi autem harum iste suscipit tempore modi officiis consequuntur at similique! Labore tempore debitis sunt dolores nisi distinctio cumque minima soluta?
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ThumbUpIcon/>
      </CardActions>
    </Card>
  );
}


export default ArticleCard