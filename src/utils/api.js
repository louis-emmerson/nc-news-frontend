import axios from "axios"

const api = axios.create({
  baseURL: "https://api-nc-news.louis-emmerson.dev",
})

function getArticles(page = 0) {
  console.log(page)
  let url = `/api/articles?p=${page}`
  return api.get(url).then(({ data }) => {
    return data.articles
  })
}

function getArticleByID(article_id) {
  return api.get(`/api/articles/${article_id}`).then(({ data }) => {
    return data.article
  })
}

function getCommentsByArticleID(article_id) {
  return api.get(`/api/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments
  })
}

function patchUpdateArticleVotes(article_id) {
  const data = { inc_votes: 1 }
  return api.patch(`/api/articles/${article_id}`, data).then()
}

export {
  getArticles,
  getArticleByID,
  getCommentsByArticleID,
  patchUpdateArticleVotes,
}
