import { useEffect, useState } from "react"
import { getArticles } from "../../../utils/api"
import ArticleCard from "./ArticleCard"
import { Button } from "@mui/material"
import { Error } from "@mui/icons-material"
import InfoAlert from "../../Alerts/Info"
import { useSearchParams } from "react-router-dom"

function ArticlesList(props) {
  const { orderByInput, sortByInput } = props

  const [articles, setArticles] = useState(Array(10))
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [page, setPage] = useState(0)
  const [isMoreResults, setIsMoreResults] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  const topic = searchParams.get("topic")
  const p = searchParams.get("p")

  useEffect(() => {
    setIsError(false)
    setIsLoading(true)
    getArticles(p, topic, sortByInput, orderByInput)
      .then((articlesArray) => {
        setArticles(articlesArray)
        setIsLoading(false)
        setPage(1)
      })
      .catch(() => {
        setIsError(true)
      })
  }, [sortByInput, orderByInput])

  if (isError) return <Error />

  if (isLoading) {
    return (
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {articles.map((Skeleton, index) => (
          <ArticleCard key={index} isLoading={true} article={{}} />
        ))}
      </section>
    )
  }

  if (articles.length === 0) return <InfoAlert infoMsg={"No articles found"} />

  return (
    <>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} isLoading={false} />
        ))}
      </section>
      {isMoreResults ? (
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            getArticles(page, topic).then((articlesToAdd) => {
              if (articlesToAdd.length < 10) setIsMoreResults(false)
              const newArticles = [...articles, ...articlesToAdd]
              setArticles(newArticles)
              let newPage = page
              setPage(newPage + 1)
            })
          }}
        >
          Load More
        </Button>
      ) : (
        <InfoAlert infoMsg={"No more results"} />
      )}
    </>
  )
}

export default ArticlesList
