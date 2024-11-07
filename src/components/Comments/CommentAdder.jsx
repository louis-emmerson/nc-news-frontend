import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material"
import { useContext, useState } from "react"
import Warning from "../Alerts/Warning"
import { postNewArticleComment } from "../../utils/api"
import Error from "../Alerts/Error"
import Success from "../Alerts/Success"
import { tickle122 } from "../../context/loggedInUser"

function CommentAdder(props) {
  const { articleID, setComments } = props
  const [newCommentInput, setNewCommentInput] = useState("")
  const [isWarning, setIsWarning] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const user = useContext(tickle122)

  function addNewComment() {
    setIsError(false)
    setIsWarning(false)
    setIsLoading(true)
    setIsSuccess(false)
    if (newCommentInput === "") {
      setIsWarning(true)
      setIsLoading(false)
    } else {
      const newCommentBody = {
        body: newCommentInput,
        username: user.username,
      }

      postNewArticleComment(articleID, newCommentBody)
        .then((newComment) => {
          setComments((current) => {
            return [newComment, ...current]
          })
          setIsSuccess(true)
          setIsLoading(false)
          setNewCommentInput("")
        })
        .catch((err) => {
          setIsLoading(false)
          setIsError(true)
        })
    }
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "orange" }}>
            {user.username[0].toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={user.username}
          secondary={
            <>
              <TextField
                onChange={(event) => {
                  setNewCommentInput(event.target.value)
                }}
                style={{ width: "85%" }}
                label={`Hey ${user.username}, why not add a comment?`}
                multiline
                rows={3}
                variant="filled"
                value={newCommentInput}
              />
              <br />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ position: "relative" }}>
                  <Button
                    style={{ height: 40, width: 150 }}
                    onClick={() => {
                      addNewComment()
                    }}
                    disabled={isLoading}
                    variant="contained"
                  >
                    {isLoading ? null : "Add Comment"}
                  </Button>
                  {isLoading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  ) : null}
                </Box>
              </Box>

              {isWarning ? (
                <Warning warningMsg={"A comment must contain some text"} />
              ) : null}
              {isError ? <Error /> : null}
              {isSuccess ? <Success successMsg={"Comment Added"} /> : null}
            </>
          }
        />
      </ListItem>
    </>
  )
}

export default CommentAdder
