import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from './components/Toast';
import { DemoProvider } from './context/DemoContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </DemoProvider>
  </StrictMode>,
);
