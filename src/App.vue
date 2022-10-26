<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import routes from '@/router/routes';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="d-flex justify-content-center mb-2">
        <RouterLink :title="$t('routes.forClient')" class="me-4" :to="routes.home.path">{{ $t("routes.home") }}</RouterLink>
        <RouterLink :title="$t('routes.forAdmin')" class="me-4" :to="routes.newOrders.path">{{ $t("routes.new orders") }}</RouterLink>
<!--        <RouterLink :title="$t('routes.forAdmin')" class="me-5" :to="routes.admin.path">{{ $t("routes.admin") }}</RouterLink> -->
        <div class="d-inline-block">
          <select class="form-select-sm" v-model="$i18n.locale">
            <option
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale"
            >
              {{ locale }}
            </option>
          </select>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
