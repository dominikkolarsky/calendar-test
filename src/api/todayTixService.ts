import axios from 'axios';
import { format } from 'date-fns';
import { ProductsResponseModel, ProductAvailabilityModel } from '../types/types';

const tkdAxios = axios.create({ headers: { 'x-tt-retailer': 'tickadoo', affiliateId: 'tickadoo' } });

export const getProducts = async () => {
  return tkdAxios.get<ProductsResponseModel>('https://content-service.tixuk.io/api/v3/products');
};

export const getProductById = async (id: number) => {
  const res = await getProducts();
  return res.data.data.find((p) => p.id === id);
};

export const getProductAvailability = async (id: number, quantity: number, fromDate: Date, toDate: Date) => {
  const dateStringFormat = 'YMMdd';

  const params = {
    affiliateId: 'tickadoo',
  };

  fromDate = new Date(fromDate);
  toDate = new Date(toDate);

  return tkdAxios.get<ProductAvailabilityModel>(
    `https://inventory-service.tixuk.io/api/v4/availability/products/${id}/quantity/${quantity}/from/${format(
      fromDate,
      dateStringFormat
    )}/to/${format(toDate, dateStringFormat)}`,
    { params }
  );
};

export const getPerformanceForProduct = async (id: number, ticketCount: number) => {
  return getProductById(id).then((productRes) => {
    if (productRes === undefined) return;

    const currDate = new Date();
    const dateFrom = productRes.availableFrom < currDate ? currDate : productRes.availableFrom;

    return getProductAvailability(id, ticketCount, dateFrom, productRes.bookingTo).then((res) => {
      return { product: productRes!, performances: res.data.response! };
    });
  });
};
