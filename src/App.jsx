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
import { Login, SignUp } from "./components/Pages"
import { useEffect, useState } from "react"
import { AuthContext } from "./context/auth"

function App() {
  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"))
      setToken(data)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Container>
        <Header token={token} />
        <Routes>
          <Route path="/" element={<HomepagePage />} />
          <Route path="/articles/" element={<ArticlesPage />} />
          <Route path="/article/:articleID" element={<ArticlePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/create-article" element={<ArticleCreatePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404NotFound" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </AuthContext.Provider>
  )
}

export default App
