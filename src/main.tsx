import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BookingContextProvider } from './utils/providers/BookingContextProvider.tsx';

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

const renderCalendarWidget = (containerId: string) => {
  const containerDiv = document.getElementById(containerId);

  return ReactDOM.createRoot(containerDiv!).render(
    <React.StrictMode>
      <BookingContextProvider>
        <App domElement={containerDiv!} />
      </BookingContextProvider>
    </React.StrictMode>
  );
};

export { renderCalendarWidget };

// * old
//else {
//   (window as any).renderCalendar = (containerId: string) => {
//     ReactDOM.createRoot(document.getElementById(containerId)!).render(
//       <React.StrictMode>
//         <BookingContextProvider>
//           <App domElement={document.getElementById(containerId)!} />
//         </BookingContextProvider>
//       </React.StrictMode>
//     );
//   };

//   (window as any).unmountCalendar = (containerId: string) => {
//     const container = document.getElementById(containerId);
//     if (container) {
//       ReactDOM.createRoot(container).unmount();
//     }
//   };
// }
