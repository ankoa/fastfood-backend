import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '../../../entities/enums';

export class OrderDto {
  id!: number;
  orderNumber!: string;
  status!: OrderStatus;
  paymentStatus!: PaymentStatus;
  paymentMethod!: PaymentMethod;
  totalAmount!: number;
  discountAmount!: number;
  finalAmount!: number;
  userId!: number;
  addressId!: number;
  note!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
