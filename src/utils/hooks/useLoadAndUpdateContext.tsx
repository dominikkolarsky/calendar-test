import { useEffect, useState } from 'react';
import { useBookingContext } from '../providers/BookingContextProvider';
import { fetchProductData } from '../../api/productDataService';
import { toPerformanceModel } from '../helpers/PerformanceHelper';
import { AxiosError } from 'axios';

const useLoadAndUpdateContext = (id: string, provider: string, quantity: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setProduct, setPerformances, setSelectedDate } = useBookingContext();

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetchProductData(id, provider, quantity);

      const mappedPerformances = res.data.performances.map((item) => toPerformanceModel(item)) ?? [];

      const newProduct = {
        id: res.data.id,
        name: res.data.name,
        dateFrom: res.data.dateFrom,
        dateTo: res.data.dateTo,
        maxTickets: res.data.maxTickets,
      };

      setProduct(newProduct);
      setPerformances(mappedPerformances);
      setSelectedDate(new Date(newProduct.dateFrom));
      setError(null);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.request.status === 422) setError('Supplier data not available.');
        else if (err.request.status === 404) setError('Supplier data could not be found.');
        else setError('An unknown error occured.');
      } else setError('An unknown error occured.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [id]);

  return { isLoading, error, fetchData };
};

export default useLoadAndUpdateContext;
