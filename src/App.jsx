import { useState } from 'react'
import Header from './components/Header'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Navbar />
    </>
  )
}

export default App
