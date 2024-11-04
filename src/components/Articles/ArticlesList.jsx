import { useEffect, useState } from "react"
import { getArticles, getMoreArticles } from "../../utils/api"
import ArticleCard from "./ArticleCard";
import { Alert, Button } from "@mui/material";


function ArticlesList() {
    const [articles, setArticles] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(0);

  
    useEffect(() => {
      setIsError(false)
      setIsLoading(true);
      getArticles().then((articlesArray) => {
        setArticles(articlesArray);
        setIsLoading(false);
        setPage(1)
      })
      .catch(()=>{
        setIsError(true)
      });
    }, []);

    if(isError) return <Alert variant="filled" severity="error">
    There has been an error
    </Alert>
    
    if (isLoading) {
      return (
        <section style={{display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10
        
        }}>
          {articles.map((Skeleton, index) => (
            <ArticleCard key={index} isLoading={true} article={{}} />
          ))}
        </section>
      );
    }
  
    return (
      <>
      <section style={{display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10
        
    }}>
        {articles.map((article) => (
            <ArticleCard key={article.id} article={article} isLoading={false} />
        ))}
      </section>
      <Button variant="contained" size="large" onClick={()=>{
        getMoreArticles(page).then((articlesToAdd)=>{
            const newArticles = [...articles, ...articlesToAdd]
            setArticles(newArticles)
            let newPage = page 
            setPage(newPage + 1)
        })
      }}>Load More</Button>
      </>

    );
  }
  
  export default ArticlesList;
  