import s from './Calendar.module.scss';
import { useEffect, useState } from 'react';
import MonthHeaderSelect from './MonthHeaderSelect/MonthHeaderSelect';
import { useBookingContext } from '../../utils/providers/BookingContextProvider';
import MonthView from './MonthView/MonthView';

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());

  const { selectedDate } = useBookingContext();

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className={s.month_wrapper}>
      <MonthHeaderSelect date={date} />
      <MonthView date={date} />
    </div>
  );
}
