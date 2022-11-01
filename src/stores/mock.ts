import type { NewOrder } from '@/DTO/NewOrder';
import type { PriceList } from '@/DTO/PriceList';

export const newOrders: NewOrder[] = [
  {
    id: 'uuid4',
    name: 'Example',
    time: 'Wed Oct 26 2022 12:24:58 GMT+0600',
    phone: '555-55-55',
    total: 400,
    comment: 'This is a test order',
    address: 'planet Earth',
    newOrder: [
      {
        name: 'Test',
        id: 'test',
        amount: 6,
        packageAmount: 3,
        price: 120
      }
    ]
  }
]

export const priceList: PriceList = {
  category: 'Some products category',
  list: [
    {
      id: '1',
      name: 'Example',
      price: 100,
      amount: 0,
      packageAmount: 6
    }
  ]
}
