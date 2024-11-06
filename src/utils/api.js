import axios from "axios"

const api = axios.create({
  baseURL: "https://api-nc-news.louis-emmerson.dev",
})

function getArticles(p = 0, topic, sortBy, orderBy) {
  let url = `/api/articles`

  const paramsObj = {}
  if (p) paramsObj.p = p
  if (topic) paramsObj.topic = topic
  if (sortBy) paramsObj.sort_by = sortBy
  if (orderBy) paramsObj.order = orderBy

  return api.get(url, { params: paramsObj }).then(({ data }) => {
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

function postNewArticleComment(article_id, commentData) {
  return api.post(`/api/articles/${article_id}/comments`, commentData).then()
}

function deleteArticleComment(commentID) {
  return api.delete(`/api/comments/${commentID}`)
}

function getTopics() {
  return api.get(`/api/topics`).then(({ data }) => {
    return data.topics
  })
}

export {
  getArticles,
  getArticleByID,
  getCommentsByArticleID,
  patchUpdateArticleVotes,
  postNewArticleComment,
  deleteArticleComment,
  getTopics,
}
