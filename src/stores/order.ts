import { defineStore } from 'pinia'
import type { Product } from '@/DTO/Product'

type State = {
  order: Product[],
  priceList: { category: string, list: Product[] }
}

export const useOrderStore = defineStore('order', {

  state: () => ({
    order: [],
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
    getTotalOrderSum: (state) =>  0,
    getOrder: (state) =>  state.order
  },

  actions: {
    addToOrder({ operator, id }: { operator: 'plus' | 'minus', id: any }) {
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
      console.log('clear')
    },

    setPrice(obj: any) {
      console.log(obj)
    }
  }
})
