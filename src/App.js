import logo from './logo.svg'
import './App.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './Routes/Router'
import './assets/css/form1.css'
import { ToastContainer } from 'react-toastify'

function App () {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer limit={1} />
    </>
  )
}

export default App
