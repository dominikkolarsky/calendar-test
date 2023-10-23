/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BookingContextProvider } from './utils/providers/BookingContextProvider.tsx';

const widgetName = 'calendar-app';
const widgetDiv = document.getElementById(widgetName);

// ReactDOM.createRoot(widgetDiv!).render(
//   <React.StrictMode>
//     <BookingContextProvider>
//       <App domElement={widgetDiv!} />
//     </BookingContextProvider>
//   </React.StrictMode>
// );

const render = (cotainerId: string) => {
  ReactDOM.createRoot(document.getElementById(cotainerId)!).render(
    <React.StrictMode>
      <BookingContextProvider>
        <App domElement={widgetDiv!} />
      </BookingContextProvider>
    </React.StrictMode>
  );
};

const unmout = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.createRoot(container).unmount();
  }
};
