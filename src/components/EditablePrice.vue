<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useSocketIO } from '@/plugins/socket.io'
import { useAdminStore } from '@/stores/admin'
import type { PriceList } from '@/DTO/PriceList'
import type { Product } from '@/DTO/Product'
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia'

const EMPTY_PRODUCT = {
  name: '',
  price: 0,
  packageAmount: 0,
  amount: 0
}

export default defineComponent({
  setup() {
    const { socket } = useSocketIO()
    const store = useAdminStore()
    const { setPriceList, removeFromPriceList, addToPriceList } = store
    const { priceList } = storeToRefs(store)

    const removeItem = (product: Product) => {
      removeFromPriceList(product)
    }

    socket.emit('getPrice', null, (data: unknown) => {
      setPriceList(data as PriceList)
    })

    const updatePriceListOnServer = () => {
      /*socket.emit('updatePrice', getPrice, (msg: string) => {
        console.log(msg)
      })*/
    }

    let newProduct: Omit<Product, 'id'> = reactive({
      name: '',
      price: 0,
      packageAmount: 0,
      amount: 0
    })

    const handleAdd = () => {
      addToPriceList({ ...newProduct, id: uuidv4() })
      newProduct = { ...EMPTY_PRODUCT }

    }

    return {
      priceList,
      removeItem,
      updatePriceListOnServer,

      newProduct,
      handleAdd
    }
  }
})
</script>

<template>
  <div>
    <table class="table table-sm table-striped">
      <thead>
      <tr>
        <th scope="col" class="border-top-0">{{$t('table.num')}}</th>
        <th scope="col" class="border-top-0">{{$t('table.unitName')}}</th>
        <th scope="col" class="border-top-0">{{$t('table.price')}}</th>
        <th scope="col" class="border-top-0">{{$t('table.minAmount')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="v-table_product" v-for="(product, index) in priceList.list" :key="product.id">
        <td>{{index}}</td>
        <td>
          <input class="w-100 border-0 bg-transparent" type="text" v-model="product.name" @input="updatePriceListOnServer">
        </td>
        <td class="v-table_price">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="product.price" @input="updatePriceListOnServer">
        </td>
        <td class="v-table_pack">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="product.packageAmount" @input="updatePriceListOnServer">
        </td>
        <td><button class="v-table_remove_btn btn btn-danger btn-sm" @click="removeItem(product)">&times;</button></td>
      </tr>
      <tr>
        <td>*</td>
        <td>
          <input class="w-100 border-0 bg-transparent" type="text" v-model="newProduct.name" @input="updatePriceListOnServer">
        </td>
        <td class="v-table_price">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="newProduct.price" @input="updatePriceListOnServer">
        </td>
        <td class="v-table_pack">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="newProduct.packageAmount" @input="updatePriceListOnServer">
        </td>
        <td><button class="btn btn-success btn-sm" @click="handleAdd">+</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
