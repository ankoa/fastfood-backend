export class ReviewDto {
  id!: number;
  rating!: number;
  comment!: string | null;
  userId!: number;
  productId!: number;
  orderId!: number;
}
