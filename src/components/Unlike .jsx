import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ThumbDownIconOutlined from "@mui/icons-material/ThumbDownOutlined"

import { Button } from "@mui/material"
import { useState } from "react"
import { patchUpdateArticleVotes } from "../utils/api"
import Error from "./Alerts/Error"

function Unlike(props) {
  const { articleID, setArticleVotes } = props
  const [isArticleLiked, setIsArticleLiked] = useState(false)
  const [isArticleLikedError, setIsArticleLikedError] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setIsArticleLiked(true)
          setArticleVotes((current) => {
            const newLike = current - 1
            return newLike
          })
          patchUpdateArticleVotes(articleID, -1).catch(() => {
            setIsArticleLiked(false)
            setIsArticleLikedError(true)
            setArticleVotes((current) => {
              const newLike = current + 1
              return newLike
            })
          })
        }}
        disabled={isArticleLiked || isArticleLikedError}
        variant="contained"
        endIcon={isArticleLiked ? <ThumbDownIcon /> : <ThumbDownIconOutlined />}
      >
        Unlike
      </Button>
      {isArticleLikedError ? (
        <Error errorMsg={"There has been an error liking this article."} />
      ) : null}
    </>
  )
}

export default Unlike
