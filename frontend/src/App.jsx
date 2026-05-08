import { useQuery } from '@tanstack/react-query'
import Task from './Task';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import AdminPage from './pages/dashboard/AdminPage';
import DashboardPage from './pages/dashboard/DashboardPage';


function App() {

  
  return (
    <>
     <Routes>
      <Route path='/login' element={ <LoginPage /> }/>
      <Route path='/register' element={ <RegisterPage /> }/>
      {/* TODO: add protected Route */}
      <Route path='/dashboard' element={ <ProtectedRoute> <DashboardPage /></ProtectedRoute> }/>
      <Route path='/admin' element={ <AdminProtectedRoute> <AdminPage /></AdminProtectedRoute> }/>
      <Route path='/' element={<Navigate to="/login" replace /> }/>

    </Routes>
    <Toaster />
    </>

  )
}

export default App
