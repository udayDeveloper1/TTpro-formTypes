import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router';
import "./assets/css/form1.css"

function App() {
  return (
 <>
   <RouterProvider router={router} />
 </>
  );
}

export default App;
