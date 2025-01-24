import logo from './logo.svg';
import './App.css';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router';
import "./assets/css/form1.css"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
 <>
   <BrowserRouter basename="/tcType1Form">
      <RouterProvider router={router} />
   {/* <RouterProvider router={router} /> */}
   </BrowserRouter> <ToastContainer limit={1}/>
   </>
  );
}

export default App;
