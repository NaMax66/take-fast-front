import { defineStore } from 'pinia'
import type { PriceList } from '@/DTO/PriceList'
import type { Product } from '@/DTO/Product'
import { useSocketIO } from '@/plugins/socket.io'

type State = {
  priceList: PriceList
}

const { socket } = useSocketIO()

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
      socket.emit('updatePrice', this.priceList, (msg: string) => {
        console.log(msg)
      })
    },

    removeFromPriceList(product: Product) {
      this.priceList.list.filter(el => el.id !== product.id)
    }
  }
})
