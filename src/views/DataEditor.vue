<script lang="ts">
import { defineComponent, ref } from 'vue'
import EditablePrice from '@/components/EditablePrice.vue'
import VTabs from '@/components/VTabs.vue'

const TEST_PASS = '1'

export default defineComponent({
  components: {
    EditablePrice,
    VTabs
  },

  setup() {
    const password = ref('')
    const isAdmin = ref(false)

    function checkPass() {
      password.value === TEST_PASS ? isAdmin.value = true : isAdmin.value = false
    }

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
      TEST_PASS,

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
      <p>{{ $t('testing app explanation') }} {{ TEST_PASS }}</p>
      <div class="form-group">
        <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            :placeholder="$t('admin.passwordPlaceholder')"
        >
      </div>
      <button @click.prevent="checkPass" class="mt-2 btn btn-danger">{{$t('admin.enter')}}</button>
    </form>
    <div v-if="isAdmin" class="overflow-auto">
      <v-tabs :tabs="controlTabs" default-tab-id="1" @changeTab="changeControlTab" />
      <editable-price v-if="currentTab.name === 'price'" />
    </div>
  </div>
</template>
