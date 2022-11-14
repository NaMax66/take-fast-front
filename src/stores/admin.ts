import { defineStore } from 'pinia'
import type { PriceList } from '@/DTO/PriceList'
import type { Product } from '@/DTO/Product'

type State = {
  priceList: PriceList
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    priceList: {
      list: [],
      category: 'not set'
    }
  }) as State,

  actions: {
    setPriceList(list: PriceList) {
      this.priceList = list
    },

    addToPriceList(product: Product) {
      this.priceList.list.push(product)
    },

    removeFromPriceList(product: Product) {
      this.priceList.list.filter(el => el.id !== product.id)
    }
  }
})
