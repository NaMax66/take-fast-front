<script lang="ts">
import { defineComponent } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useSocketIO } from '@/plugins/socket.io'

export default defineComponent({
  setup() {
    const order = useOrderStore()
    const { socket } = useSocketIO()

    socket.emit('getNewOrders', (data: unknown) => {
      order.updateNewOrders(data)
    })

    function removeOrder(orderId: string) {
      order.removeNewOrder(orderId)
    }

    return {
      order,
      removeOrder
    }
  }
})
</script>

<template>
  <div class="container">
    <div class="mt-3 border-bottom" v-for="orderInfo in order.newOrders" :key="orderInfo.id">
      <div class="d-flex flex-column flex-sm-row">
        <h5 class="pe-3 text-danger">{{$t('clientName')}}: {{orderInfo.name}}</h5>
        <h5 class="pe-3">{{$t('phone')}}: {{orderInfo.phone}}</h5>
        <h5 class="pe-3">{{$t('address')}}: {{orderInfo.address}}</h5>
      </div>
      <p class="mb-1 mt-3">{{$t('comment')}}: {{orderInfo.comment}}</p>
      <h6 class="mb-3 text-danger">{{$t('time')}}: {{orderInfo.time}}</h6>
      <div class="overflow-auto">
        <table class="mt-2 table table-sm table-striped">
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
          <tr v-for="(product, index) in orderInfo.newOrder" :key="product.id">
            <td>{{index}}</td>
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td>{{product.amount}}</td>
            <td>{{ product.price * product.amount }}</td>
          </tr>
          <tr>
            <td colspan="2"><button class="btn btn-danger btn-sm" @click="removeOrder(orderInfo.id)">&times;</button></td>
            <td colspan="2" class="text-right">{{$t('table.superTotal')}}</td>
            <td>{{orderInfo.total}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
