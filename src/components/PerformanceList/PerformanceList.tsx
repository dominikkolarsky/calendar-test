import s from './PerformanceList.module.scss';
import { useEffect, useState } from 'react';
import { PerformanceModel } from '../../types/types';
import { useBookingContext } from '../../utils/providers/BookingContextProvider';
import { formatDateTimeTz } from '../../utils/helpers/TimeHelper';
import PerformanceTile from './PerformaceTile/PerformanceTile';

export default function PerformanceList() {
  const [performances, setPerformances] = useState<PerformanceModel[]>([]);
  const { selectedDate, getPerfomancesForDay, performances: contextPerformances } = useBookingContext();

  useEffect(() => {
    setPerformances(getPerfomancesForDay(selectedDate));
  }, [selectedDate, contextPerformances]);

  return (
    <div className={s.performance_wrapper}>
      <h3 className={s.performance_date}>{formatDateTimeTz(selectedDate, 'dd MMMM yyyy', 'Europe/London')}</h3>
      {performances.length === 0 && <span className={s.performance_any}>No performances for this day</span>}
      {performances.map((p, index) => (
        <PerformanceTile key={index} {...p} />
      ))}
    </div>
  );
}
