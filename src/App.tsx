import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Products from './components/Products'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Login from './components/Login'
import AuthProvider, { ProtectedRoute } from './contexts/AuthProvider'
import Register from './components/Register'
import { StatusProvider } from './contexts/StatusProvider'


function App() {

  return (
    <BrowserRouter>
      <StatusProvider>
        <AuthProvider>
          <div className="app-container">

            <Menu />
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/cart"                           
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
            </Routes>

                
          </div>
          <Footer />
        </AuthProvider>
      </StatusProvider>
    </BrowserRouter>
  )
}

export default App