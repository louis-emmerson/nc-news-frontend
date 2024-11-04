import axios from "axios";

function getArticles(){
    return axios.get('https://nc-news.louis-emmerson.dev/api/articles')
    .then(({data})=>{
        return data.articles
    })
}   

function getMoreArticles(page){
    return axios.get(`https://nc-news.louis-emmerson.dev/api/articles?p=${page}`)
    .then(({data})=>{
        return data.articles
    })
} 

export {getArticles, getMoreArticles}