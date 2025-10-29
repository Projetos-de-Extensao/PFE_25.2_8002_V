import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
