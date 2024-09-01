// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthProvider.jsx';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <main className='bg-white text-gray-800'>
        <App />
        <ToastContainer />
      </main>
    </StrictMode>
  </AuthProvider>
)
