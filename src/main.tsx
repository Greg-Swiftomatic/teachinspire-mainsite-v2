import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/globals.css';

const PRELOAD_RELOAD_KEY = 'teachinspire:preload-reload';
const PRELOAD_RELOAD_COOLDOWN_MS = 10_000;

window.addEventListener('vite:preloadError', (event) => {
  const lastReload = Number(sessionStorage.getItem(PRELOAD_RELOAD_KEY) ?? 0);

  if (Date.now() - lastReload < PRELOAD_RELOAD_COOLDOWN_MS) {
    return;
  }

  event.preventDefault();
  sessionStorage.setItem(PRELOAD_RELOAD_KEY, String(Date.now()));
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
