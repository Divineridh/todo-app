import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex flex-col w-screen">
        <Header />
        <div className="flex flex-row w-screen">
            <Sidebar />
            <Outlet  />
        </div>
    </div>
  )
}
