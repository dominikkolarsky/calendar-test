export type PerformanceModel = {
  date: Date;
  minPrice: number;
  currency: string;
};

export type PerformanceResponseModel = {
  datetime: string;
  performanceType: string;
  partTwoDatetime: string | null;
  largestLumpOfTickets: number;
  availableSeatCount: number;
  minPrice: number;
  maxPrice: number | null;
  noBookingFee: boolean;
  discount: boolean;
  promotionLabel: string | null;
  currency: string;
};

export type ProductAvailabilityModel = {
  response: PerformanceResponseModel[];
};

export type ProductsResponseModel = {
  code: number;
  data: ProductModel[];
};

export type ProductModel = {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  maxTickets: number;
  availableFrom?: Date;
  bookingTo?: Date;
};