<script lang="ts">
import { defineComponent, ref } from 'vue'
import PriceTable from '@/components/PriceTable.vue'
import VTabs from '@/components/VTabs.vue'
import { useSocketIO } from '@/plugins/socket.io'

export default defineComponent({
  components: {
    PriceTable,
    VTabs
  },

  setup() {
    const { socket } = useSocketIO()

    let password = ''
    function checkPass() {
      return password === '1'
    }

    let isAdmin = true

    const controlTabs = [
      {
        id: '1',
        name: 'price'
      },
      {
        id: '2',
        name: 'news'
      }
    ]
    let currentTab = ref(controlTabs[0])

    function changeControlTab (tab: any) {
      currentTab.value = tab
    }

    function sendToServer(data: any) {
      socket.emit('updatePrice', data, (msg: string) => console.log(msg))
    }

    return {
      password,
      checkPass,
      isAdmin,

      currentTab,
      controlTabs,
      changeControlTab,

      sendToServer
    }
  }
})
</script>

<template>
  <div class="container mb-5">
    <form class="col-lg-4" v-if="!isAdmin">
      <p>This is a testing app. password: 1</p>
      <div class="form-group">
        <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            :placeholder="$t('admin.passwordPlaceholder')"
        >
      </div>
      <button @click.prevent="checkPass" class="btn btn-danger">{{$t('admin.enter')}}</button>
    </form>
    <div v-if="isAdmin" class="overflow-auto">
      <v-tabs :tabs="controlTabs" default-tab-id="1" @changeTab="changeControlTab" />
      <price-table v-if="currentTab.name === 'price'" @save="sendToServer"/>
    </div>
  </div>
</template>
