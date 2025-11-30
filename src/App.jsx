import "./App.css"
import { Routes, Route } from 'react-router'
import Home from './components/Home/Home'
import Login from './components/auth/Login/Login'
import Signup from './components/auth/Signup/Signup'
import DashboardLayout from "./components/DashboardLayout/DashboardLayout"
import Dashbaord from "./pages/Dashbaord/Dashbaord"
import Stats from "./pages/Stats/Stats"
import Settings from "./pages/Settings/Settings"
import ChatSetting from "./pages/ChatSetting/ChatSetting"
import Chat from "./pages/Chat/Chat"
import Team from "./pages/Team/Team"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashbaord />} />
          <Route path="chat/:chatId" element={<Chat />} />
          <Route path="chatsetting" element={<ChatSetting />} />
          <Route path="stats" element={<Stats />} />
          <Route path="Team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
