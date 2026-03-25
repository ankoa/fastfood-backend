export enum ProductVariantSize {
  Size15cm = '15cm',
  Size20cm = '20cm',
  Size30cm = '30cm',
}

export enum ProductVariantType {
  Thin = 'Mỏng',
  Normal = 'Bình thường',
  Thick = 'Dày',
}

export enum OrderStatus {
  Pending = 'Đang chờ',
  Confirmed = 'Đã xác nhận',
  Preparing = 'Đang chuẩn bị',
  Ready = 'Sẵn sàng',
  Delivered = 'Đã giao hàng',
  Cancelled = 'Đã hủy',
}

export enum PaymentMethod {
  CashOnDelivery = 'Thanh toán khi nhận hàng',
  Online = 'Thanh toán Online',
}

export enum PaymentStatus {
  Pending = 'Đang chờ',
  Paid = 'Đã thanh toán',
  Failed = 'Thanh toán thất bại',
  Refunded = 'Hoàn tiền',
}

export enum CouponType {
  Fixed = 'fixed',
  Percentage = 'percentage',
}
