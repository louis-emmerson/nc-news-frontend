import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteArticle, getArticleByID } from "../../../utils/api"
import Like from "../../Like"
import Unlike from "../../Unlike "
import CommentsSection from "../../Comments/CommentsSection"
import LikeCounter from "../../LikeCounter"
import DeleteArticleButton from "../../Buttons/DeleteArticleButton"
import Error from "../../Alerts/Error"
import Success from "../../Alerts/Success"
import { AuthContext } from "../../../context/auth"

function ArticlePage() {
  const { articleID } = useParams()
  const navigate = useNavigate()

  const { token } = useContext(AuthContext)

  const [article, setArticle] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [articleVotes, setArticleVotes] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
  const [deleteArticleError, setDeleteArticleError] = useState(false)

  let formattedDate = null

  if (article.created_at) {
    const dateFormat = new Date(article.created_at)
    formattedDate = dateFormat.toISOString().substring(0, 10)
  }

  useEffect(() => {
    setIsLoading(true)
    getArticleByID(articleID)
      .then((article) => {
        setArticle(article)
        setArticleVotes(article.votes)
        setIsLoading(false)
      })
      .catch(() => {
        return navigate("/404NotFound")
      })
  }, [])

  function deleteArticleButtonPress() {
    setIsDeleting(true)
    setDeleteArticleError(false)
    setIsDeleteDisabled(true)
    deleteArticle(article.article_id)
      .then(() => {
        setIsDeleted(true)
        setIsDeleteDisabled(false)
        setIsDeleting(false)
      })
      .catch(() => {
        setDeleteArticleError(true)
        setIsDeleteDisabled(false)
      })
  }

  if (isDeleted)
    return <Success successMsg={"Article has been deleted"}></Success>

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
              sx={{ width: "100%", maxHeight: 500 }}
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
              {isLoading ? <Skeleton /> : formattedDate}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {isLoading ? null : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
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
              </Box>
              <Box>
                
                {token && token.user.user_metadata.full_name === article.author &&
                !deleteArticleError ? (
                  <DeleteArticleButton
                    isLoading={isDeleting}
                    isDeleteDisabled={isDeleteDisabled}
                    deleteFunction={deleteArticleButtonPress}
                  />
                ) : null}
              </Box>
            </Box>
          )}
          {deleteArticleError ? (
            <Error errorMsg="There has been an error deleting this article. Please try again later"></Error>
          ) : null}
        </CardActions>
        <CommentsSection articleID={articleID} />
      </Card>
    </>
  )
}

export default ArticlePage
