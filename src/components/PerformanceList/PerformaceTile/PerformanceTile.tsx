import s from './PerformanceTile.module.scss';
import { ChevronRightIcon } from '../../../icons/Icons';
import { PerformanceModel } from '../../../types/types';
import { formatPrice } from '../../../utils/helpers/PerformanceHelper';
import { formatDateTimeTz } from '../../../utils/helpers/TimeHelper';
import { useBookingContext } from '../../../utils/providers/BookingContextProvider';

export default function PerformanceTile(props: PerformanceModel) {
  const { date } = props;
  const { product, ticketCount } = useBookingContext();
  const { id } = product!;

  const handleClick = () => {
    const baseUrl = 'https://tickadoo.tixculture.com/booking/seating-plan';
    const params = `?product_id=${id}&qt=${ticketCount}&slot=${formatDateTimeTz(date, 'HH:mm')}&date=${formatDateTimeTz(
      date,
      'yyyy-MM-dd'
    )}`;

    const completeUrl = `${baseUrl}${params}`;
    window.location.href = completeUrl;
  };

  return (
    <div className={s.performance_tile} onClick={handleClick}>
      {/* Info */}
      <div className={s.performance_tile__text}>
        <h3>{formatDateTimeTz(date, 'hh:mm a')}</h3>
        <span>{`from ${formatPrice(props)}`}</span>
      </div>
      {/* Book now */}
      <div className={s.performance_tile__cta}>
        <span>Choose Seats</span>
        <ChevronRightIcon width="1rem" strokeWidth={2.5} />
      </div>
    </div>
  );
}
