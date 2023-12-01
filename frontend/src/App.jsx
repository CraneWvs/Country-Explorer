import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Content from './Content/Content'
import Footer from './Footer/Footer'


function App() {

  return (
    <div className='app'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
