import { useState } from "react"
import ArticlesList from "./ArticlesList"
import ArticlesPageTopBar from "./AtriclesPageTopBar"

function ArticlesPage() {
  const [sortByInput, setSortByInput] = useState("created_at")
  const [orderByInput, setOrderByInput] = useState("DESC")
  return (
    <>
      <ArticlesPageTopBar
        sortByInput={sortByInput}
        setSortByInput={setSortByInput}
        orderByInput={orderByInput}
        setOrderByInput={setOrderByInput}
      />
      <ArticlesList sortByInput={sortByInput} orderByInput={orderByInput} />
    </>
  )
}

export default ArticlesPage
