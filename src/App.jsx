import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", darkMode)
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