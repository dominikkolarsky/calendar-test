import { createContext, ReactNode, useState, useContext } from 'react';
import { PerformanceModel, ProductModel } from '../../types/types';
import { isSameMonthTz, isSameDayTz } from '../helpers/TimeHelper';

export type BookingContextProps = {
  selectedDate: Date;
  setSelectedDate: (value: Date) => void;
  ticketCount: number;
  setTicketCount: (value: number) => void;
  productId: number | undefined;
  setProductId: (val: number) => void;
  performances: PerformanceModel[];
  setPerformances: (value: PerformanceModel[]) => void;
  getPerformancesForMonth: (currDate: Date) => PerformanceModel[];
  getPerfomancesForDay: (currDate: Date) => PerformanceModel[];
  product: ProductModel | undefined;
  setProduct: (value: ProductModel) => void;
};

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

const BookingContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [performances, setPerformances] = useState<PerformanceModel[]>([]);
  const [product, setProduct] = useState<ProductModel>();
  const [productId, setProductId] = useState<number>();

  const getPerformancesForMonth = (currDate: Date) => {
    return performances.filter((per) => isSameMonthTz(currDate, per.date));
  };

  const getPerfomancesForDay = (currDate: Date) => {
    return performances
      .filter((per) => isSameDayTz(currDate, per.date))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const value: BookingContextProps = {
    selectedDate,
    setSelectedDate,
    ticketCount,
    setTicketCount,
    productId,
    setProductId,
    performances,
    setPerformances,
    getPerformancesForMonth,
    getPerfomancesForDay,
    product,
    setProduct,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBookingContext must be used within BookingContextProvider');
  }

  return context;
};

export { BookingContextProvider, useBookingContext };
