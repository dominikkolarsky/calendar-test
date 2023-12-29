import s from './DateTile.module.scss';
import { useEffect, useState } from 'react';
import { PerformanceModel } from '../../../types/types';
import { useBookingContext } from '../../../utils/providers/BookingContextProvider';
import { isSameDay } from 'date-fns';
// import { formatPrice } from '../../../utils/helpers/PerformanceHelper';

type DateTileProps = {
  date: Date;
  performances: PerformanceModel[];
  isCurrentMonth: boolean;
};

export default function DateTile(props: DateTileProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [performances, setPerformances] = useState<PerformanceModel[]>([]);
  const [isCurrentMonth, setIsCurrentMonth] = useState<boolean>(false);

  const { selectedDate, setSelectedDate } = useBookingContext();

  useEffect(() => {
    const sameDate = isSameDay(date, selectedDate);
    setIsFocused(sameDate);
  }, [selectedDate, date]);

  useEffect(() => {
    setDate(props.date);
    setPerformances(props.performances);
    setIsCurrentMonth(props.isCurrentMonth);
  }, [props]);

  const hasPerformance = () => {
    return performances.length > 0;
  };

  // const getMinTicketPrice = () => {
  //   if (!hasPerformance()) return '‎';

  //   const performace = performances.reduce((min, curr) => (curr.minPrice < min.minPrice ? curr : min), performances[0]);

  //   return formatPrice(performace);
  // };

  const getStyle = () => {
    if (!isCurrentMonth) return s.ghost;

    if (hasPerformance()) return s.active;
    else return s.inactive;
  };

  const handleClick = () => {
    if (hasPerformance() || !isCurrentMonth) {
      setSelectedDate(date);
    }
  };

  return (
    <div
      onClick={handleClick}
      key={date.toISOString()}
      className={`${s.date_tile} ${getStyle()} ${isFocused ? s.date_tile__focused : ''}`}
    >
      <span className={s.date_tile_day}>{isCurrentMonth ? date.getDate() : ''}</span>
      {/* <span className={s.date_tile_price}>{getMinTicketPrice()}</span> */}
    </div>
  );
}
