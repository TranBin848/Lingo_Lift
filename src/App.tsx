import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Listening from './components/skills/Listening'
import Speaking from './components/skills/Speaking'
import Reading from './components/skills/Reading'
import Writing from './components/skills/Writing'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/writing" element={<Writing />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
