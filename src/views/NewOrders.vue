<script lang="ts">
import { defineComponent } from 'vue'
import type { NewOrder } from '@/DTO/NewOrder'

export default defineComponent({
  setup() {
    const newOrders: NewOrder[] = [
      {
        name: 'Bob',
        time: 'Wed Oct 26 2022 12:24:58 GMT+0600',
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

    function removeOrder(orderId: string) {
      console.log(orderId)
    }

    return {
      newOrders,
      removeOrder
    }
  }
})
</script>

<template>
  <div class="container">
    <div class="mt-3 border-bottom" v-for="item in newOrders" :key="item.id">
      <div class="d-flex flex-column flex-sm-row">
        <h5 class="pe-3 text-danger">{{$t('clientName')}}: {{item.name}}</h5>
        <h5 class="pe-3">{{$t('phone')}}: {{item.phone}}</h5>
        <h5 class="pe-3">{{$t('address')}}: {{item.address}}</h5>
      </div>
      <p class="mb-1 mt-3">{{$t('comment')}}: {{item.comment}}</p>
      <h6 class="mb-3 text-danger">{{$t('time')}}: {{item.time}}</h6>
      <div class="overflow-auto">
        <table class="mt-2 table table-sm table-striped" v-if="newOrders">
          <thead>
          <tr>
            <th scope="col">{{$t('table.num')}}</th>
            <th scope="col">{{$t('table.unitName')}}</th>
            <th scope="col">{{$t('table.price')}}</th>
            <th scope="col">{{$t('table.inOrder')}}</th>
            <th scope="col">{{$t('table.total')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(product, index) in item.newOrder" :key="product.id">
            <td>{{index}}</td>
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td>{{product.amount}}</td>
            <td>{{ product.price * product.amount }}</td>
          </tr>
          <tr>
            <td colspan="2"><button class="btn btn-danger btn-sm" @click="removeOrder(item.id)">&times;</button></td>
            <td colspan="2" class="text-right">{{$t('table.superTotal')}}</td>
            <td>{{item.total}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
