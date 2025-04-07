<template>
  <Header :taxonomy="taxonomy" />
  <router-view />
  <Footer :taxonomy="taxonomy" />
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/HeaderComponent.vue'
import Footer from './components/FooterComponent.vue'

const taxonomy = ref({ uid: 'abcbs', name: 'lob' })
</script>

<style>
.bc--blue {
  background: #2372b3;
}

.bc--grey {
  background: #e3e3e2;
}

.bc--white {
  background: #fff;
}

body,
html {
  min-height: 100%;

  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
