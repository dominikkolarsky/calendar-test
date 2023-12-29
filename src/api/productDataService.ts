import axios from 'axios';
import {PerformanceResponseModel} from '../types/types';

export type ProductResponseModel = {
  id: number,
  name: string,
  dateFrom: string,
  dateTo: string,
  maxTickets: number,
  performances: PerformanceResponseModel[];
};

export const fetchProductData = async (id: string, provider: string = 'TTG', quantity: number = 2) => {
  const params = {provider, quantity};
  return axios.get<ProductResponseModel>(`https://tkd-calendar-be.azurewebsites.net/${id}`, {params});
};
