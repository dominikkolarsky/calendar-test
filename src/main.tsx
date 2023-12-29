import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BookingContextProvider } from './utils/providers/BookingContextProvider.tsx';

const widgetName = 'calendar-app';
const widgetDiv = document.getElementById(widgetName);

//if (import.meta.env.DEV) {
  ReactDOM.createRoot(widgetDiv!).render(
    <React.StrictMode>
      <BookingContextProvider>
        <App domElement={widgetDiv!} />
      </BookingContextProvider>
    </React.StrictMode>
  );
// } else {
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
