import s from './TicketsCounter.module.scss';

import { useEffect, useState } from 'react';
import { useBookingContext } from '../../utils/providers/BookingContextProvider';
import { MinusCircleIcon, PlusCircleIcon } from '../../icons/Icons';

export default function TicketsCounter() {
  const [count, setCount] = useState<number>(2);
  const [maxCount, setMaxCount] = useState<number>(6);

  const { ticketCount, setTicketCount, product } = useBookingContext();

  useEffect(() => {
    setCount(ticketCount);
  }, [ticketCount]);

  useEffect(() => {
    setMaxCount(product?.maxTickets ?? 6);
  }, [product]);

  const changeCountBy = (value: number) => {
    const newValue = count + value;

    if (newValue > 0 && newValue <= maxCount) {
      setCount(newValue);
      setTicketCount(newValue);
    }
  };

  return (
    <div className={s.counter_wrapper}>
      <h3 className={s.counter_heading}>Tickets</h3>
      <div className={s.counter_btns_group}>
        <button type="button" onClick={() => changeCountBy(-1)} className={count === 1 ? s.counter_btn__disabled : ''}>
          <MinusCircleIcon width="2rem" />
        </button>
        <span className={s.counter_number}>{count}</span>
        <button
          type="button"
          onClick={() => changeCountBy(1)}
          className={count === maxCount ? s.counter_btn__disabled : ''}
        >
          <PlusCircleIcon width="2rem" />
        </button>
      </div>
    </div>
  );
}
