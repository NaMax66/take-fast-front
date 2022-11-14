<script lang="ts">
import { defineComponent, ref } from 'vue'
import EditablePrice from '@/components/EditablePrice.vue'
import VTabs from '@/components/VTabs.vue'
import { useSocketIO } from '@/plugins/socket.io'

export default defineComponent({
  components: {
    EditablePrice,
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

    return {
      password,
      checkPass,
      isAdmin,

      currentTab,
      controlTabs,
      changeControlTab
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
      <editable-price v-if="currentTab.name === 'price'" />
    </div>
  </div>
</template>
