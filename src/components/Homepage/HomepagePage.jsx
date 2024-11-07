import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid2,
  Typography,
  useMediaQuery,
} from "@mui/material"
import ArticleCard from "../Articles/ArticlesPage/ArticleCard"
import { useEffect, useState } from "react"
import { getArticles, getTopics } from "../../utils/api"
import Error from "../Alerts/Error"
import { Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

function HomepagePage() {
  const [articles, setArticles] = useState([])
  const [topics, setTopics] = useState([])
  const [apiSpinUp, setApiSpinUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.up("sm"))
  const isMediumDevice = useMediaQuery(theme.breakpoints.up("md"))

  useEffect(() => {
    setIsError(false)
    setIsLoading(true)
    Promise.all([getArticles(), getTopics()])
      .then(([articles, topics]) => {
        console.log(isMediumDevice)
        if (isMediumDevice) {
          setArticles(articles.slice(0, 3))
          setTopics(topics.slice(0, 3))
        } else if (isSmallDevice) {
          setArticles(articles.slice(0, 3))
          setTopics(topics.slice(0, 3))
        } else {
          setArticles(articles.slice(0, 2))
          setTopics(topics.slice(0, 2))
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsError(true)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setApiSpinUp(true)
    }, 5000)
  })

  console.log(topics)

  if (isLoading) {
    return (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          {apiSpinUp ? (
            <Typography variant="h5" padding={10} textAlign={"center"}>
              {
                "If this is the first request in some time, processing might take up to a minute."
              }
            </Typography>
          ) : null}
        </Box>
      </Backdrop>
    )
  }

  if (isError) return <Error />

  return (
    <>
      <Box sx={{ width: "100%", position: "relative" }}>
        <img
          src="https://c.pxhere.com/photos/16/f4/news_daily_newspaper_press_newspapers_information_read_newspaper_newsprint-658056.jpg!d"
          alt="new"
          style={{ width: "100%", maxHeight: 500, objectFit: "cover" }}
        />
        <Box
          sx={{
            justifyItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            sx={{ textShadow: "5px 5px 10px black", color: "white" }}
            textAlign="center"
            variant="h3"
          >
            Welcome To NC News
          </Typography>
          <Typography
            sx={{ textShadow: "5px 5px 10px black", color: "white" }}
            textAlign="center"
            variant="h6"
          >
            By Louis Emmerson
          </Typography>
          <Button
            component={Link}
            to={"/articles"}
            sx={{ backgroundColor: "black" }}
            variant="contained"
          >
            View Articles
          </Button>
        </Box>
      </Box>

      <Grid2 container spacing={2} sx={{ paddingTop: 2 }}>
        {articles.map((article, index) => {
          return (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <ArticleCard key={article.article_id} article={article} />
            </Grid2>
          )
        })}

        <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Button
            component={Link}
            to={"/articles"}
            sx={{ width: "100%", backgroundColor: "black" }}
            variant="contained"
          >
            View More Articles
          </Button>
        </Grid2>
        {topics.map((topic, index) => {
          return (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  borderRadius: 1,
                }}
              >
                  <Link  style={{ color:"white",textDecoration: 'none' }} to={`/articles?topic=${topic.slug}`}>
                    <Typography variant="h5">
                      {topic.slug[0].toUpperCase() +
                      topic.slug.slice(1) +
                      " Articles"}
                      </Typography>
                  </Link>
              </Box>
            </Grid2>
          )
        })}
      </Grid2>
    </>
  )
}

export default HomepagePage
