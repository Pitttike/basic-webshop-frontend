import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './components/Products'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Cart from './components/Cart'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Products/>,
    },
    {
      path: '/products',
      element:  <Products/>
    },
    {
      path: '/register',
      element: <h1>Regisztráció</h1>
    },
    {
      path: '/login',
      element: <h1>Bejelentkezés</h1>
    },
    {
      path: '/cart',
      element: <Cart userId='2'/>
    }

  ])

  return <>
  <Menu/>
  <RouterProvider router={router} />
  <Footer />
  </>
}

export default App
