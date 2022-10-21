<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import routes from '@/router/routes';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="routes.home.path">{{ $t("routes.home") }}</RouterLink>
        <RouterLink :to="routes.news.path">{{ $t("routes.news") }}</RouterLink>
        <RouterLink :to="routes.admin.path">{{ $t("routes.admin") }}</RouterLink>
        <RouterLink :to="routes.newOrders.path">{{ $t("routes.new orders") }}</RouterLink>
        <div class="locale-changer">
          <select v-model="$i18n.locale">
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

<style scoped>
header {
  line-height: 1.5;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.locale-changer {
  display: inline-block;
}

</style>
