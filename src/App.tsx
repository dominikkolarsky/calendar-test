import './assets/scss/index.scss';
import s from './App.module.scss';

import Calendar from './components/Calendar/Calendar';
import PerformanceList from './components/PerformanceList/PerformanceList';
import TicketsCounter from './components/TicketsCounter/TicketsCounter';
import { useLoadProduct } from './utils/hooks/useLoadProduct';
import { useEffect, useState } from 'react';
import { useBookingContext } from './utils/providers/BookingContextProvider';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';

function App({ domElement }: { domElement: HTMLElement }) {
  const [isLoading, setLoading] = useState(true);

  const id = domElement.getAttribute('data-product-id');
  const { setProduct, setPerformances } = useBookingContext();

  const { product: loadedProduct, performances: loadedPerformances } = useLoadProduct(Number(id));

  useEffect(() => {
    setTimeout(() => {
      setProduct(loadedProduct!);
      setPerformances(loadedPerformances);
      setLoading(false);
    }, 1600);
  }, [loadedProduct, loadedPerformances]);

  return (
    <>
      <div className={s.calendar}>
        <div className={s.calendar__container}>
          {!isLoading ? (
            <div className={s.calendar__inner}>
              <TicketsCounter />
              <hr />
              <Calendar />
              <PerformanceList />
            </div>
          ) : (
            <div className={s.loading__wrapper}>
              <LoadingIndicator />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
