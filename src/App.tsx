import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { MainContent } from './components/mainContent/MainContent'

function App() {

  return (
    <div>
      <SearchBar />
      <MainContent />
    </div>
  )
}

export default App
