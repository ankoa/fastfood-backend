export class OrderItemDto {
  id!: number;
  orderId!: number;
  productId!: number;
  variantId!: number | null;
  quantity!: number;
  price!: number;
  total!: number;
}
