import { Sitter } from '../types/sitter';

export interface Booking {
  bookingId: string
  status: string
  serviceType: string;
  numberOfDays: number
  totalCost: number
  sitter: Sitter;
};

