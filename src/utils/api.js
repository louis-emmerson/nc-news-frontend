import axios from "axios"

const api = axios.create({
  baseURL: "https://api-nc-news.louis-emmerson.dev",
})

function getArticles(page = 0) {
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

function patchUpdateArticleVotes(article_id, likesToAdd) {
  const data = { inc_votes: likesToAdd }
  return api.patch(`/api/articles/${article_id}`, data).then()
}

function postNewArticleComment(article_id,commentData){
  return api.post(`/api/articles/${article_id}/comments`, commentData).then()
}

function deleteArticleComment(commentID){
  return api.delete(`/api/comments/${commentID}`)
}

export {
  getArticles,
  getArticleByID,
  getCommentsByArticleID,
  patchUpdateArticleVotes,
  postNewArticleComment,
  deleteArticleComment
}
