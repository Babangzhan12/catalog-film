import { Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardAdminPage from './pages/admin/DashoardAdminPage';
import { ProtectedRoute } from './component/ProtectedRoute';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import FilmAdminListPage from './pages/admin/FilmAdminListPage';
import FilmAdminCreatePage from './pages/admin/ProdukAdminCreatePage';
import FilmAdminDetailPage from './pages/admin/FilmAdminDetailPage';
import FilmAdminEditPage from './pages/admin/FilmAdminEditPage';
import RegisterPage from './pages/RegisterPage';
import PenggunaAdminPage from './pages/admin/PenggunaAdminPage';

const App = () =>  {
  return(
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/admin/dashboard' element={
          <ProtectedRoute>
            <DashboardAdminPage />
          </ProtectedRoute>
      } />
      <Route path='/admin/pengguna' element={
          <ProtectedRoute>
            <PenggunaAdminPage />
          </ProtectedRoute>
      } />
      <Route path='/admin/film' element={
          <ProtectedRoute>
            <FilmAdminListPage />
          </ProtectedRoute>
      } />
      <Route path='/admin/film/create' element={
          <ProtectedRoute>
            <FilmAdminCreatePage />
          </ProtectedRoute>
      } />
      <Route path='/admin/film/detail/:id' element={
          <ProtectedRoute>
            <FilmAdminDetailPage />
          </ProtectedRoute>
      } />
      <Route path='/admin/film/edit/:id' element={
          <ProtectedRoute>
            <FilmAdminEditPage />
          </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App;
