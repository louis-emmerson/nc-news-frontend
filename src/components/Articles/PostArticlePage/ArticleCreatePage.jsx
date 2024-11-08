import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { getTopics, postNewArticle } from "../../../utils/api"
import { tickle122 } from "../../../context/loggedInUser"

function ArticleCreatePage() {
  const [topics, setTopics] = useState([])
  const [titleInput, setTitleInput] = useState("")
  const [bodyInput, setBodyInput] = useState("")
  const [selectTopicInput, setSelectTopicInput] = useState("")
  const [articleImageInput, setArticleImageInput] = useState("")
  const [newArticle, setNewArticle] = useState({})

  const [newTopicTitle, setNewTopicTitle] = useState("")
  const [newTopicDescription, setNewTopicDescription] = useState("")

  const loggedInUser = useContext(tickle122)

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics)
    })
  })

  const postArticle = (input) => {
    if (selectTopicInput === "New Topic") {
      console.log("new Topic")
    } else {
      console.log(input)
      const newPost = {
        author: loggedInUser.username,
        title: titleInput,
        body: bodyInput,
        topic: selectTopicInput,
      }
      postNewArticle(newPost).then((result) => {
        console.log(result)
        setNewArticle(result)
      })
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
          id="filled-basic"
          label="Title"
          variant="filled"
          value={titleInput}
          onChange={(event) => {
            setTitleInput(event.target.value)
          }}
        />
        <TextField
          id="filled-multiline-static"
          label="Article Body"
          multiline
          rows={4}
          variant="filled"
          value={bodyInput}
          onChange={(event) => {
            setBodyInput(event.target.value)
          }}
        />
        <FormControl>
          <InputLabel id="topic-select-label">Topic</InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            value={selectTopicInput}
            label="Order By"
            onChange={(event) => {
              setSelectTopicInput(event.target.value)
            }}
          >
            {topics.map((topic) => {
              return (
                <MenuItem key={topic.slug} value={topic.slug}>
                  {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                </MenuItem>
              )
            })}
            <MenuItem value={"New Topic"}>New Topic</MenuItem>
          </Select>
        </FormControl>
        {selectTopicInput === "New Topic" ? (
          <>
            <TextField
              id="filled-basic"
              label="New Topic Title"
              variant="filled"
            />
            <TextField
              id="filled-basic"
              label="New Topic Description"
              variant="filled"
            />
          </>
        ) : null}

        <TextField
          id="filled-basic"
          label="Article Image Url"
          variant="filled"
          value={articleImageInput}
          onChange={(event) => {
            setArticleImageInput(event.target.value)
          }}
        />
        <Button onClick={postArticle} variant="contained">
          Submit
        </Button>
      </FormControl>
    </Box>
  )
}

export default ArticleCreatePage
