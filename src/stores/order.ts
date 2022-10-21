import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', () => {
  const getPrice = {
    category: 'Category',
    list: [
      {
        'id': '1',
        'name': 'Example',
        'price': 0,
        'packageAmount': 0
      }
    ]
  }
  const getTotalOrderSum = 0
  const getOrder: any[] = []

  function addToOrder(obj: any) {
    console.log(obj)
  }

  function clearOrder() {
    console.log('clear')
  }

  function setPrice(obj: any) {
    console.log(obj)
  }

  return {
    getPrice, getTotalOrderSum, getOrder,
    addToOrder, clearOrder, setPrice
  }
})
