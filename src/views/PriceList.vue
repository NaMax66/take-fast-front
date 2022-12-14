<script lang="ts">
import VModal from '@/components/VModal.vue'
import { v4 as uuidv4 } from 'uuid'
import { useOrderStore } from '@/stores/order'
import { useSocketIO } from '@/plugins/socket.io'
import { defineComponent, ref } from 'vue'

import type { Product } from '@/DTO/Product'

export default defineComponent({
  components: {
    VModal
  },

  setup() {
    let isOperatorPhoneShown = ref(false)
    const operatorPhone = '8-928-047-11-00'

    let isModalShown = ref(false)
    let isModalSuccessShown = ref(false)
    let isModalErrorShown = ref(false)

    let phone = ref('')
    let name = ref('')
    let address = ref('')
    let comment = ref('')

    const order = useOrderStore()
    const { socket } = useSocketIO()

    socket.emit('getPrice', null, (data: unknown) => {
      order.setPrice(data)
    })

    const getProductPrice = (product: Product) => {
      const productInOrder = order.getOrder.find(el => el.id === product.id)

      return productInOrder ? productInOrder.price * productInOrder.amount : 0
    }

    const getAmount = (product: Product) => {
      const productInOrder = order.getOrder.find(el => el.id === product.id)

      return productInOrder?.amount || 0
    }

    /* todo refactor */
    const addAmount = (operator: any, id: any) => {
      order.addToOrder({ operator, id })
    }

    const makeOrder = () => {
      isModalShown.value = true
    }

    const sendOrder = async () => {
      const newOrder = {
        id: uuidv4(),

        name: name.value,
        phone: phone.value,
        address: address.value,
        comment: comment.value.substring(0, 3000),
        time: new Date().toLocaleString(),

        total: order.getTotalOrderSum,

        newOrder: order.getOrder
      }

      socket.emit('newOrderFromClient', newOrder, (msg: string) => {
        if (msg === 'ok') {
          showModalSuccess()
        } else {
          showModalError()
        }
      })

      isModalShown.value = false
    }

    const showModalSuccess = () => {
      isModalSuccessShown.value = true
    }

    const showModalError = () => {
      isModalErrorShown.value = true
    }

    const onCheckout = () => {
      isModalSuccessShown.value = false
      order.clearOrder()
      comment.value = ''
    }

    const closeModalError = () => {
      isModalErrorShown.value = false
      isOperatorPhoneShown.value = true
    }

    return {
      isOperatorPhoneShown,
      operatorPhone,

      order,
      addAmount,
      sendOrder,
      getAmount,
      getProductPrice,
      handleActionBtn: makeOrder,

      isModalShown,
      isModalSuccessShown,
      isModalErrorShown,
      closeModalSuccess: onCheckout,
      closeModalError,

      phone,
      name,
      address,
      comment
    }
  }
})
</script>

<template>
  <div class="container">
    <h1 class="text-danger mb-5" v-if="isOperatorPhoneShown">{{$t('warnings.connectToUsMsg')}} <br> {{operatorPhone}}</h1>
    <div class="overflow-auto">
      <table class="table table-sm table-striped" v-if="order.getPrice">
        <thead>
        <tr>
          <th scope="col">{{ $t('table.num') }}</th>
          <th scope="col">{{ $t('table.unitName') }}</th>
          <th scope="col">{{ $t('table.price') }}</th>
          <th scope="col">{{ $t('table.minAmount') }}</th>
          <th scope="col">{{ $t('table.inOrder') }}</th>
          <th scope="col">{{ $t('table.totalPrice') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in order.getPrice.list" :key="product.id">
          <td scope="row">{{ index }}</td>
          <td>{{product.name}}</td>
          <td>{{product.price }}</td>
          <td>{{product.packageAmount}} <span>{{$t('units.piece')}}</span></td>
          <th scope="col" style="min-width: 110px;">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('minus', product.id)">-</button>
              <button type="button" style="min-width: 40px" class="btn btn-secondary btn-sm disabled" aria-disabled="true">{{getAmount(product)}}</button>
              <button type="button" class="btn btn-secondary btn-sm" @click="addAmount('plus', product.id)">+</button>
            </div>
          </th>
          <td style="min-width: 95px">{{getProductPrice(product)}}</td>
        </tr>
        <tr>
          <td colspan="5" class="text-right font-weight-bold">{{$t('table.total')}}</td>
          <td>{{ order.getTotalOrderSum }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <textarea class="mt-2 w-100" :placeholder="$t('commentPlaceholder')" v-model="comment" rows="2"></textarea>
    </div>
    <button class="btn btn-danger mb-5" @click="handleActionBtn">{{$t('makeOrder')}}</button>
    <v-modal :is-modal-shown="isModalShown">
          <div class="modal-header">
            <h5 class="modal-title">{{$t('newOrderModal.header')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="isModalShown = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="mb-2">{{$t('newOrderModal.msg')}}</p>
            <input type="text" class="form-control" :placeholder="$t('namePlaceholder')" v-model="name">
            <input type="tel" pattern="[0-9]*" novalidate class="form-control  mt-2" :placeholder="$t('phonePlaceholder')" v-model="phone">
            <input type="text" novalidate class="form-control  mt-2" :placeholder="$t('address')" v-model="address">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="isModalShown = false">{{$t('goBack')}}</button>
            <button type="button" class="btn btn-danger" @click="sendOrder">{{$t('makeOrder')}}</button>
          </div>
    </v-modal>
    <v-modal :is-modal-shown="isModalSuccessShown">
      <div class="modal-body">
        <h3 v-html="$t('newOrderModal.successMsg')"></h3>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" @click="closeModalSuccess">OK</button>
      </div>
    </v-modal>
    <v-modal :is-modal-shown="isModalErrorShown">
      <div class="modal-body">
        <h3>{{$t('warnings.errorMsg')}}</h3>
        <p>{{$t('warnings.connectToUsMsg')}}</p>
        <h1>{{operatorPhone}}</h1>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" @click="closeModalError">OK</button>
      </div>
    </v-modal>
  </div>
</template>
