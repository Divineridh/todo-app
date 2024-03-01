import './App.css'

import { Routes, Route, useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import BooksPage from './pages/BooksPage'

function App() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/books" element={<BooksPage />} />
          </Route>
        </Routes>
      </NextUIProvider>
    </div>
  )
}

export default App
