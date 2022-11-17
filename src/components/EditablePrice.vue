<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useAdminStore } from '@/stores/admin'
import type { PriceList } from '@/DTO/PriceList'
import type { Product } from '@/DTO/Product'
import { v4 as uuidv4 } from 'uuid'
import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'

const EMPTY_PRODUCT = {
  name: '',
  price: 0,
  packageAmount: 0,
  amount: 0
}

export default defineComponent({
  setup() {
    const store = useAdminStore()
    const {
      fetchPriceList,
      removeFromPriceList,
      addToPriceList,
      setPriceList,
      updatePriceList } = store

    const priceList = ref<PriceList>(cloneDeep(store.priceList))

    const syncLocalPriceList = () => {
      priceList.value = cloneDeep(store.priceList)
    }

    fetchPriceList(syncLocalPriceList)

    let newProduct = ref<Omit<Product, 'id'>>({
      name: '',
      price: 0,
      packageAmount: 0,
      amount: 0
    })

    const handleAdd = () => {
      const product = { ...newProduct.value, id: uuidv4() }

      addToPriceList(product)
      syncLocalPriceList()

      newProduct.value = EMPTY_PRODUCT
    }

    const removeItem = (product: Product) => {
      removeFromPriceList(product)
      syncLocalPriceList()
    }

    const isModified = computed(() => {
      return !isEqual(store.priceList, priceList.value)
    })


    const sendToServer = () => {
      setPriceList(priceList.value)
      updatePriceList()
    }

    const resetPriceList = () => {
      syncLocalPriceList()
    }

    return {
      priceList,
      removeItem,

      newProduct,
      handleAdd,

      isModified,

      sendToServer,
      resetPriceList
    }
  }
})
</script>

<template>
  <form @submit.prevent="sendToServer">
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
          <input
              class="w-100 border-0 bg-transparent"
              type="text" v-model="product.name"
              :placeholder="$t('productNamePlaceholder')"
              required
          >
        </td>
        <td class="v-table_price">
          <input class="w-100 border-0 bg-transparent" type="number" step="0.1" min="0" v-model="product.price">
        </td>
        <td class="v-table_pack">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="product.packageAmount">
        </td>
        <td><button type="button" class="v-table_remove_btn btn btn-danger btn-sm" @click="removeItem(product)">&times;</button></td>
      </tr>
      <tr>
        <td>*</td>
        <td>
          <input class="w-100 border-0 bg-transparent" type="text" v-model="newProduct.name" :placeholder="$t('productNamePlaceholder')">
        </td>
        <td class="v-table_price">
          <input class="w-100 border-0 bg-transparent" type="number" step="0.1" v-model="newProduct.price">
        </td>
        <td class="v-table_pack">
          <input class="w-100 border-0 bg-transparent" type="number" v-model="newProduct.packageAmount">
        </td>
        <td><button type="button" class="btn btn-success btn-sm" @click="handleAdd">+</button></td>
      </tr>
      </tbody>
    </table>

    <div :class="{ 'opacity-50': !isModified, 'pe-none': !isModified }">
      <button type="submit" class="btn btn-success">{{ $t('saveAndSend') }}</button>
      <button type="button" class="btn btn-danger ms-3" @click="resetPriceList">{{ $t('reset') }}</button>
    </div>
  </form>
</template>
