import s from './MonthHeaderSelect.module.scss';
import { useBookingContext } from '../../../utils/providers/BookingContextProvider';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../icons/Icons';
import { formatDateTimeTz } from '../../../utils/helpers/TimeHelper';
import { useState } from 'react';

export default function MonthHeaderSelect({ date }: { date: Date }) {
  const { setSelectedDate } = useBookingContext();
  const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(true);

  const handleMonthChange = (change: number) => {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() + change);

    if (newDate.getMonth() === new Date().getMonth()) setIsCurrentMonth(true);
    else setIsCurrentMonth(false);
    setSelectedDate(newDate);
  };

  const renderDaysNames = () => {
    const daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysNames.map((day, i) => {
      return <span key={i}>{day}</span>;
    });
  };

  return (
    <div className={s.month_header_wrapper}>
      <div className={s.month_header_select}>
        {!isCurrentMonth ? (
          <button type="button" onClick={() => handleMonthChange(-1)}>
            <ChevronLeftIcon width="1.5rem" />
          </button>
        ) : (
          <div style={{ width: 24 }}></div>
        )}
        <span className={s.month_header_name}>{formatDateTimeTz(date, 'MMMM yyyy')}</span>
        <button type="button" onClick={() => handleMonthChange(1)}>
          <ChevronRightIcon width="1.5rem" />
        </button>
      </div>
      <div className={s.month_days_name}>{renderDaysNames()}</div>
    </div>
  );
}
