import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import App from './App.tsx'
import Login from './Login.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<App/>} />
          <Route path="*" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  
)
