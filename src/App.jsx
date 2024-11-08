import "./App.css"
import { Container } from "@mui/material"
import Header from "./components/Header/Header"
import { Route, Routes } from "react-router-dom"
import HomepagePage from "./components/Homepage/HomepagePage"
import ArticlesPage from "./components/Articles/ArticlesPage/ArticlesPage"
import ArticlePage from "./components/Articles/ArticlePage/ArticlePage"
import TopicsPage from "./components/Topics/TopicsPage"
import PageNotFound from "./routes/NotFound"
import ArticleCreatePage from "./components/Articles/PostArticlePage/ArticleCreatePage"

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<HomepagePage />} />
          <Route path="/articles/" element={<ArticlesPage />} />
          <Route path="/article/:articleID" element={<ArticlePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/create-article" element={<ArticleCreatePage />} />
          <Route path="/404NotFound" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
