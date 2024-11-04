import axios from "axios"

function getArticles() {
  return axios
    .get("https://api-nc-news.louis-emmerson.dev/api/articles")
    .then(({ data }) => {
      return data.articles
    })
}

function getMoreArticles(page) {
  return axios
    .get(`https://api-nc-news.louis-emmerson.dev/api/articles?p=${page}`)
    .then(({ data }) => {
      return data.articles
    })
}

function getArticleByID(article_id) {
  return axios
    .get(`https://api-nc-news.louis-emmerson.dev/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article
    })
}

function getCommentsByArticleID(article_id) {
    return axios
      .get(`https://api-nc-news.louis-emmerson.dev/api/articles/${article_id}/comments`)
      .then(({ data }) => {
        return data.comments
      })
  }

export { getArticles, getMoreArticles, getArticleByID ,getCommentsByArticleID}
