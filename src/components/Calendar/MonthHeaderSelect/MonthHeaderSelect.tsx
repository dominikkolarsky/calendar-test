import s from './MonthHeaderSelect.module.scss';
import { useBookingContext } from '../../../utils/providers/BookingContextProvider';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../icons/Icons';
import { formatDateTimeTz, isSameOrNewerMonth, isSameOrOlderMonth } from '../../../utils/helpers/TimeHelper';
import { useMemo } from 'react';
import { addMonths, subMonths } from 'date-fns';

export default function MonthHeaderSelect({ date }: { date: Date }) {
  const { setSelectedDate, product } = useBookingContext();

  const canGoPrevMonth = useMemo<boolean>(() => {
    if (!product) return false;

    const fromDate = new Date(product.dateFrom);
    return isSameOrNewerMonth(subMonths(date, 1), fromDate);
  }, [date, product?.availableFrom]);

  const canGoNextMonth = useMemo<boolean>(() => {
    if (!product) return false;

    const toDate = new Date(product.dateTo);
    return isSameOrOlderMonth(addMonths(date, 1), toDate);
  }, [date, product?.bookingTo]);

  const handleMonthChange = (change: number) => {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() + change);

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
        {canGoPrevMonth ? (
          <button type="button" onClick={() => handleMonthChange(-1)}>
            <ChevronLeftIcon width="1.5rem" />
          </button>
        ) : (
          <div style={{ width: 24 }}></div>
        )}

        <span className={s.month_header_name}>{formatDateTimeTz(date, 'MMMM yyyy', 'Europe/London')}</span>

        {canGoNextMonth ? (
          <button type="button" onClick={() => handleMonthChange(1)}>
            <ChevronRightIcon width="1.5rem" />
          </button>
        ) : (
          <div style={{ width: 24 }}></div>
        )}
      </div>
      <div className={s.month_days_name}>{renderDaysNames()}</div>
    </div>
  );
}
