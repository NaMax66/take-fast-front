import { defineStore } from 'pinia'
import type { Product } from '@/DTO/Product'
import type { PriceList } from '@/DTO/PriceList'
import type { NewOrder } from '@/DTO/NewOrder';

type State = {
  order: Product[],
  newOrders: NewOrder[],
  priceList: PriceList
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    order: [],
    newOrders: [
      {
        id: 'uuid4',
        name: 'Bob',
        time: 'Wed Oct 26 2022 12:24:58 GMT+0600',
        phone: '555-55-55',
        total: 400,
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
    ],
    priceList: {
      category: 'Category',
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
  }) as State,

  getters: {
    getPrice: (state) =>  state.priceList,
    getTotalOrderSum: (state) =>  state.order.reduce((acc, el) => acc + el.price * el.amount, 0),
    getOrder: (state) =>  state.order
  },

  actions: {
    addToOrder({ operator, id }: { operator: 'plus' | 'minus', id: string }) {
    const el = this.order.find(el => el.id === id)

    if (el) {
      let extraAmount = el.packageAmount
      if (operator === 'minus') {
        extraAmount *= -1
      }
      el.amount += extraAmount
      if (el.amount <= 0) this.order = this.order.filter(item => item.id !== el.id)
    } else {
      if (operator === 'minus') return
      const newEl = Object.assign({}, this.priceList.list.find(el => el.id === id))
      newEl.amount = newEl.packageAmount
      this.order.push(newEl)
    }
},

    clearOrder() {
      this.order = []
    },

    removeNewOrder(newOrderId: string) {
      this.newOrders = this.newOrders.filter(el => el.id !== newOrderId)
    },

    setPrice(priceList: PriceList) {
      this.priceList = priceList
    },

    updateNewOrders(data: unknown) {
      /* add check */
      this.newOrders = data as NewOrder[]
    }
  }
})
