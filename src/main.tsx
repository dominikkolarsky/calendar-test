/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BookingContextProvider } from './utils/providers/BookingContextProvider.tsx';

// * dev
const calendarWidgetId = 'calendar-app';
const calendarWidgetDiv = document.getElementById(calendarWidgetId);

if (import.meta.env.DEV) {
  ReactDOM.createRoot(calendarWidgetDiv!).render(
    <React.StrictMode>
      <BookingContextProvider>
        <App domElement={calendarWidgetDiv!} />
      </BookingContextProvider>
    </React.StrictMode>
  );
}

//  * prod
declare global {
  interface Window {
    mountCalendarWidget: typeof mountCalendarWidget;
    unmountCalendarWidget: typeof unmountCalendarWidget;
  }
}

const mountCalendarWidget = (containerId: string) => {
  const containerDiv = document.getElementById(containerId);
  return ReactDOM.createRoot(containerDiv!).render(
    <React.StrictMode>
      <BookingContextProvider>
        <App domElement={containerDiv!} />
      </BookingContextProvider>
    </React.StrictMode>
  );
};

const unmountCalendarWidget = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.createRoot(container).unmount();
  }
};

window.mountCalendarWidget = mountCalendarWidget;
window.unmountCalendarWidget = unmountCalendarWidget;
