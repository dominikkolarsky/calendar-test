import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BookingContextProvider } from './utils/providers/BookingContextProvider.tsx';

const widgetName = 'calendar-app';
const widgetDiv = document.getElementById(widgetName);

ReactDOM.createRoot(widgetDiv!).render(
  <React.StrictMode>
    <BookingContextProvider>
      <App domElement={widgetDiv!} />
    </BookingContextProvider>
  </React.StrictMode>
);
