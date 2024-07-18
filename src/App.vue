<template>
  <section>
    <Header />
  </section>
  <main>
    <router-view></router-view>.
  </main>
</template>
<script setup>
import Header from './components/Header.vue'
</script>