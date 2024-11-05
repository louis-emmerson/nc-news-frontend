import ThumbUpIconOutlined from "@mui/icons-material/ThumbUpOutlined"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import { Button } from "@mui/material"
import { useState } from "react"
import { patchUpdateArticleVotes } from "../utils/api"
import Error from "./Alerts/Error"

function Like(props) {
  const { articleID, setArticleVotes } = props
  const [isArticleLiked, setIsArticleLiked] = useState(false)
  const [isArticleLikedError, setIsArticleLikedError] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setIsArticleLiked(true)
          setArticleVotes((current) => {
            const newLike = current + 1
            return newLike
          })
          patchUpdateArticleVotes(articleID).catch(() => {
            setIsArticleLiked(false)
            setIsArticleLikedError(true)
            setArticleVotes((current) => {
              const newLike = current - 1
              return newLike
            })
          })
        }}
        disabled={isArticleLiked || isArticleLikedError}
        variant="contained"
        endIcon={isArticleLiked ? <ThumbUpIcon /> : <ThumbUpIconOutlined />}
      >
        Like
      </Button>
      {isArticleLikedError ? (
        <Error errorMsg={"There has been an error liking this article."} />
      ) : null}
    </>
  )
}

export default Like
