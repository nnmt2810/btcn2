import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", darkMode)
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Navbar />
    </div>
  )
}

export default App