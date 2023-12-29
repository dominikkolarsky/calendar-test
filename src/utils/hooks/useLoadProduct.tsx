import { useState, useEffect } from 'react';
import { ProductModel, PerformanceModel } from '../../types/types';
import { getPerformanceForProduct } from '../../api/todayTixService';
import { toPerformanceModel } from '../helpers/PerformanceHelper';

export const useLoadProduct = (id: number) => {
  const [product, setProduct] = useState<ProductModel | undefined>(undefined);
  const [performances, setPerformances] = useState<PerformanceModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPerformanceForProduct(id, 1);
        const mappedPerformances = res?.performances.map((item) => toPerformanceModel(item)) ?? [];

        setProduct(res?.product);
        setPerformances(mappedPerformances);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError("Sorry, there's an issue with data fetching. Please try again later.");
      }
    };

    void fetchData();
  }, [id]);

  return {
    product,
    performances,
    error,
  };
};
