import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import './style.css'

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </React.StrictMode>
)
