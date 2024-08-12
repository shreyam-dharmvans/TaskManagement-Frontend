import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'
import { Toaster } from 'react-hot-toast';

// if (process.env.REACT_APP_NODE_ENV != "production") {
//   dotenv.config();
// }
axios.defaults.baseURL = "https://taskmanagement-t94x.onrender.com";
//axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-center'></Toaster>
    <App />
  </StrictMode>,
)
