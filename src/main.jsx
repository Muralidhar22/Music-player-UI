import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TabProvider } from './context/tabContext.jsx'
import { MusicProvider } from './context/musicContext.jsx'
import { GradientProvider } from './context/gradientContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MusicProvider>
      <TabProvider>
        <GradientProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ GradientProvider>
      </TabProvider>
    </MusicProvider>
  </React.StrictMode>,
)
