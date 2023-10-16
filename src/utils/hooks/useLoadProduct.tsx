import { useState, useEffect } from 'react';
import { ProductModel, PerformanceModel } from '../../types/types';
import { getPerformanceForProduct } from '../../api/todayTixService';
import { toPerformanceModel } from '../helpers/PerformanceHelper';

export const useLoadProduct = (id: number) => {
  const [product, setProduct] = useState<ProductModel>();
  const [performances, setPerformances] = useState<PerformanceModel[]>([]);
  useEffect(() => {
    void (async () =>
      await getPerformanceForProduct(id, 1)
        .then((res) => {
          const mappedPerformances = res?.performances.map((item) => toPerformanceModel(item)) ?? [];

          setProduct(res?.product);
          setPerformances(mappedPerformances);
        })
        .catch((err) => {
          console.log(err);
        }))();
  }, []);

  return {
    product,
    performances,
  };
};
