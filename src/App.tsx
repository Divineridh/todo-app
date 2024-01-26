import './App.css'

import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

function App() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Routes>
      </NextUIProvider>
    </div>
  )
}

export default App
