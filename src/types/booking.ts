import { Sitter } from '../types/sitter';
import { User } from '../types/auth';

export interface Booking {
  bookingId: string
  status: string
  serviceType: string;
  numberOfDays: number
  totalCost: number
  sitter: Sitter;
  user: User;
};

