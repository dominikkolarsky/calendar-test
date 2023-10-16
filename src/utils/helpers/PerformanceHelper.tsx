import { PerformanceModel, PerformanceResponseModel } from '../../types/types';

export const toPerformanceModel = (response: PerformanceResponseModel) => {
  const value: PerformanceModel = {
    currency: response.currency,
    date: new Date(response.datetime),
    minPrice: response.minPrice,
  };

  return value;
};

export const formatPrice = (performance: PerformanceModel) => {
  let symbol = '';
  switch (performance.currency) {
    case 'USD':
      symbol = '$';
      break;
    default:
      symbol = '$';
  }

  return `${symbol}${performance.minPrice / 100}`;
};
