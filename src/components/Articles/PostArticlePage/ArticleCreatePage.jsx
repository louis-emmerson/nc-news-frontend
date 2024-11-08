import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { getTopics, postNewArticle, postNewTopic } from "../../../utils/api"
import { tickle122 } from "../../../context/loggedInUser"
import Success from "../../Alerts/Success"
import { Link } from "react-router-dom"
import Error from "../../Alerts/Error"

function ArticleCreatePage() {
  const [topics, setTopics] = useState([])

  const [titleInput, setTitleInput] = useState("")
  const [bodyInput, setBodyInput] = useState("")
  const [selectTopicInput, setSelectTopicInput] = useState("")
  const [articleImageInput, setArticleImageInput] = useState("")
  const [newArticle, setNewArticle] = useState()
  const [isPostingArticle, setIsPostingArticle] = useState(false)
  const [isLoadingTopics, setIsLoadingTopics] = useState(false)
  const [isTopicsError, setIsTopicsError] = useState(false)

  const [newTopicTitle, setNewTopicTitle] = useState("")
  const [newTopicDescription, setNewTopicDescription] = useState("")

  const loggedInUser = useContext(tickle122)

  const [titleError, setTitleError] = useState(false)
  const [bodyError, setBodyError] = useState(false)
  const [selectTopicError, setSelectTopicError] = useState(false)
  const [newTopicTitleError, setNewTopicTitleError] = useState(false)
  const [newTopicDescriptionError, setNewTopicDescriptionError] =
    useState(false)
  const [articleImageError, setArticleImageError] = useState(false)

  useEffect(() => {
    setIsLoadingTopics(true)
    setIsTopicsError(false)
    getTopics()
      .then((topics) => {
        setIsLoadingTopics(false)
        setTopics(topics)
      })
      .catch(() => {
        setIsTopicsError(true)
      })
  }, [])

  const postArticleSubmit = () => {
    setIsPostingArticle(true)
    setTitleError(false)
    setBodyError(false)
    setSelectTopicError(false)
    setNewTopicTitleError(false)
    setNewTopicDescriptionError(false)
    setArticleImageError(false)

    const validUrlStringRegex =
      /^https?:\/\/(?:www\.)?[^\s\/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i

    if (articleImageInput&&!articleImageInput.match(validUrlStringRegex)) {
      setArticleImageError(true)
    }
    let hasError = false

    if (!titleInput) {
      setTitleError(true)
      hasError = true
    }
    if (!bodyInput) {
      setBodyError(true)
      hasError = true
    }
    if (!selectTopicInput) {
      setSelectTopicError(true)
      hasError = true
    }
    if (selectTopicInput === "New Topic") {
      if (!newTopicTitle) {
        setNewTopicTitleError(true)
        hasError = true
      }
      if (!newTopicDescription) {
        setNewTopicDescriptionError(true)
        hasError = true
      }
    }

    if (hasError) {
      setIsPostingArticle(false)
      return
    }

    const clearInputs = () =>{
        setTitleInput("")
        setBodyInput("")
        setSelectTopicInput("")
        setArticleImageInput("")
        setNewTopicTitle("")
        setNewTopicDescription("")
    }

    const postArticle = () => {
      const newPost = {
        author: loggedInUser.username,
        title: titleInput,
        body: bodyInput,
        article_img_url: articleImageInput,
      }

      if (selectTopicInput === "New Topic") {
        newPost.topic = newTopicTitle
      } else {
        newPost.topic = selectTopicInput
      }
      postNewArticle(newPost).then((result) => {
        setNewArticle(result)
        setIsPostingArticle(false)
        clearInputs()
      })
    }

    if (selectTopicInput === "New Topic") {
      postNewTopic({
        slug: newTopicTitle,
        description: newTopicDescription,
      }).then(() => {
        postArticle()
      })
    } else {
      postArticle()
    }
  }

  return (
    <Box
      width={"100%"}
      height={"80vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormControl sx={{ width: "70%", padding: 10, gap: 1 }}>
        <Typography textAlign={"center"} variant="h3">
          Create New Article
        </Typography>
        <TextField
          disabled={isPostingArticle}
          error={titleError}
          helperText={titleError ? "Please provide a title" : null}
          id="filled-basic"
          label="Title"
          variant="filled"
          required={true}
          value={titleInput}
          onChange={(event) => {
            setTitleInput(event.target.value)
          }}
        />
        <TextField
          disabled={isPostingArticle}
          id="filled-multiline-static"
          label="Article Body"
          error={bodyError}
          helperText={bodyError ? "Please provide an article body" : null}
          multiline
          rows={4}
          required={true}
          variant="filled"
          value={bodyInput}
          onChange={(event) => {
            setBodyInput(event.target.value)
          }}
        />
        <FormControl>
          <InputLabel id="topic-select-label">
            {isLoadingTopics ? "Loading Topics..." : "Topics"}
          </InputLabel>
          <Select
            disabled={isPostingArticle | isLoadingTopics}
            labelId="topic-select-label"
            id="topic-select"
            value={selectTopicInput}
            error={selectTopicError}
            label="Order By"
            onChange={(event) => {
              setSelectTopicInput(event.target.value)
            }}
          >
            {topics.map((topic) => {
              return (
                <MenuItem key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </MenuItem>
              )
            })}
            <MenuItem value={"New Topic"}>New Topic</MenuItem>
          </Select>
        </FormControl>
        {selectTopicInput === "New Topic" ? (
          <>
            <TextField
              disabled={isPostingArticle}
              id="filled-basic"
              label="New Topic Title"
              variant="filled"
              value={newTopicTitle}
              error={newTopicTitleError}
              helperText={
                newTopicTitleError ? "Please Provide an topic title" : null
              }
              onChange={(event) => {
                setNewTopicTitle(event.target.value)
              }}
            />
            <TextField
              disabled={isPostingArticle}
              id="filled-basic"
              label="New Topic Description"
              variant="filled"
              value={newTopicDescription}
              error={newTopicDescriptionError}
              helperText={
                newTopicDescriptionError
                  ? "Please Provide an topic description"
                  : null
              }
              onChange={(event) => {
                setNewTopicDescription(event.target.value)
              }}
            />
          </>
        ) : null}

        <TextField
          disabled={isPostingArticle}
          id="filled-basic"
          label="Article Image Url"
          variant="filled"
          value={articleImageInput}
          error={articleImageError}
          onChange={(event) => {
            setArticleImageInput(event.target.value)
          }}
          helperText={
            articleImageError
              ? "Please enter a valid image url"
              : "If left blank a default image will be used"
          }
        />
        {isTopicsError ? <Error errorMsg={"The has been an error getting current topics. Please try again later"}/> : (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Box sx={{ position: "relative", width: "100%" }}>
              <Button
                style={{ height: 40, width: "100%" }}
                onClick={postArticleSubmit}
                disabled={isPostingArticle}
                variant="contained"
              >
                {isPostingArticle ? null : "Add Comment"}
              </Button>
              {isPostingArticle ? (
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
        )}
        {newArticle ? (
          <Success>
            <Typography
              variant="body"
              sx={{ color: "white" }}
              component={Link}
              to={`/article/${newArticle.article_id}`}
            >
              <br />
              Click Here to View
            </Typography>
          </Success>
        ) : null}
      </FormControl>
    </Box>
  )
}

export default ArticleCreatePage
