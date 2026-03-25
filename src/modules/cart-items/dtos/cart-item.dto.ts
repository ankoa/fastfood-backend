export class CartItemDto {
  id!: number;
  cartId!: number;
  productId!: number;
  variantId!: number | null;
  quantity!: number;
}
