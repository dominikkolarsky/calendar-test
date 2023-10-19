import s from './MonthView.module.scss';
import DateTile from '../DateTile/DateTile';
import { useEffect, useState } from 'react';
import { PerformanceModel } from '../../../types/types';
import { useBookingContext } from '../../../utils/providers/BookingContextProvider';
import { addMonths, endOfMonth, getDaysInMonth, startOfMonth, subMonths } from "date-fns";
import { isSameDayTz } from '../../../utils/helpers/TimeHelper';

type MonthViewProps = {
  date: Date;
};

export default function MonthView(props: MonthViewProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [performances, setPerformances] = useState<PerformanceModel[]>([]);

  const { getPerformancesForMonth, performances: contextPerformances } = useBookingContext();

  useEffect(() => {
    setPerformances(getPerformancesForMonth(props.date));
  }, [contextPerformances]);

  useEffect(() => {
    setDate(props.date);

    setPerformances(getPerformancesForMonth(props.date));
  }, [props.date]);

  const renderDays = (currDate: Date) => {
    const daysCount = getDaysInMonth(currDate);
    const days: JSX.Element[] = [];

    days.push(...renderLeadingDays(currDate));

    for (let i = 1; i <= daysCount; i++) {
      const tileDate = new Date(currDate);
      tileDate.setDate(i);
      const tilePerformances = performances.filter((p) => isSameDayTz(tileDate, p.date));

      days.push(<DateTile key={i} date={tileDate} performances={tilePerformances} isCurrentMonth={true} />);
    }

    days.push(...renderTrailingDays(currDate));

    return days;
  };

  const renderLeadingDays = (currDate: Date) => {
    const days: JSX.Element[] = [];

    const firstDayOfMonth = startOfMonth(currDate).getDay();

    const lastMonthDate = subMonths(currDate, 1);
    const lastMonthDaysCount = getDaysInMonth(lastMonthDate) + 1;

    for (let i = lastMonthDaysCount - firstDayOfMonth; i < lastMonthDaysCount; i++) {
      const tileDate = new Date(lastMonthDate);
      tileDate.setDate(i);
      days.push(<DateTile key={i * -1} date={tileDate} isCurrentMonth={false} performances={[]} />);
    }

    return days;
  };

  const renderTrailingDays = (currDate: Date) => {
    const days: JSX.Element[] = [];

    const lastDayOfMonth = endOfMonth(currDate).getDay();

    const nextMonthDate = addMonths(currDate, 1);

    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
      const tileDate = new Date(nextMonthDate);
      tileDate.setDate(i);
      days.push(<DateTile key={i + 50} date={tileDate} isCurrentMonth={false} performances={[]} />);
    }

    return days;
  };

  return <div className={s.month_view_wrapper}>{renderDays(date)}</div>;
}
