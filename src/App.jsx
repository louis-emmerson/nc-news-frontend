
import './App.css'
import { Container } from '@mui/material'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import HomepagePage from './components/Homepage/HomepagePage'
import ArticlesPage from './components/Articles/ArticlesPage'

function App() {

  return (<>
    <Header/>
    <Container>
      <Routes>
        <Route path='/' element={<HomepagePage/>}/>
        <Route path='/articles' element={<ArticlesPage/>}/>
      </Routes>
    </Container>
  </>
  )
}

export default App
