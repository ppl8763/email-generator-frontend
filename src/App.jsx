import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Email from './pages/Email'

function App() {
  return (
   <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Email/>} />
        </Routes>
   </BrowserRouter>
  )
}

export default App