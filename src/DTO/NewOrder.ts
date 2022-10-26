import type { Product } from '@/DTO/Product';

export type NewOrder = {
  id: string,
  name?: string,
  phone: string,
  address?: string,
  comment?: string,
  time: string,
  total: number
  newOrder: Product[],
}
