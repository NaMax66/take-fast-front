import { defineStore } from 'pinia'
import type { PriceList } from '@/DTO/PriceList'
import type { Product } from '@/DTO/Product'
import { useSocketIO } from '@/plugins/socket.io'
import cloneDeep from 'lodash.clonedeep'

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
    fetchPriceList(callback?: Function) {
      socket.emit('getPrice', null, (data: unknown) => {
        this.setPriceList(data as PriceList)
        if (callback) callback()
      })
    },

    updatePriceList(callback?: Function) {
      socket.emit('updatePrice', this.priceList, (msg: string) => {
        if (callback) callback(msg)
      })
    },

    setPriceList(list: PriceList) {
      this.priceList = cloneDeep(list)
    },

    addToPriceList(product: Product) {
      this.priceList.list.push(cloneDeep(product))
      this.updatePriceList(console.log)
    },

    removeFromPriceList(product: Product) {
      this.priceList.list = this.priceList.list.filter(el => el.id !== product.id)
      this.updatePriceList(console.log)
    }
  }
})
