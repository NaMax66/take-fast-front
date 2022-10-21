<script setup lang="ts">
defineProps<{
  isModalShown: boolean
}>()
</script>

<template>
  <div :class="{modalBackground: isModalShown}">
    <div class="modal" :class="{'d-block' : isModalShown}" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modalBackground {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.62);
}
</style>

