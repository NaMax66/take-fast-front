import type { Product } from '@/DTO/Product';

export type NewOrder = {
  name?: string,
  phone?: string,
  address?: string,
  comment?: string,
  time: string,
  newOrder: Product[]
}
