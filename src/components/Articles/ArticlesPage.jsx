import { Typography } from "@mui/material"
import ArticlesList from "./ArticlesList"

function ArticlesPage(){
    return (
    <>
    <Typography style={{textAlign:"center"}} variant="h4">Articles</Typography>
    <ArticlesList/>
    </>
)
}

export default ArticlesPage