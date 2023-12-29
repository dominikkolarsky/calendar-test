import axios from 'axios';
import {ProductsResponseModel, ProductAvailabilityModel} from '../types/types';
import {formatDateToUTC_YYYYMMDD} from '../utils/helpers/formatDate';

const tkdAxios = axios.create({headers: {'x-tt-retailer': 'tickadoo', affiliateId: 'tickadoo'}});

export const getProducts = async () => {
  return tkdAxios.get<ProductsResponseModel>('https://content-service.tixuk.io/api/v3/products');
};

export const getProductById = async (id: number) => {
  const res = await getProducts();
  return res.data.data.find((p) => p.id === id);
};

export const getProductAvailability = async (id: number, quantity: number, fromDate: string, toDate: string) => {
  return tkdAxios.get<ProductAvailabilityModel>(
    `https://inventory-service.tixuk.io/api/v4/availability/products/${id}/quantity/${quantity}/from/${fromDate}/to/${toDate}`,
  );
};

export const getPerformanceForProduct = async (id: number, ticketCount: number) => {
  return getProductById(id).then((productRes) => {
    if (productRes === undefined) {
      return Promise.reject(new Error("Product not found"));
    }

    const currDate = new Date();
    const dateFrom = productRes.availableFrom! < currDate ? currDate : productRes.availableFrom!;

    return getProductAvailability(id, ticketCount, formatDateToUTC_YYYYMMDD(dateFrom), formatDateToUTC_YYYYMMDD(productRes.bookingTo!)).then((res) => {
      return {product: productRes!, performances: res.data.response!};
    });
  });
};