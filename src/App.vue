<template>
  <div id="inner">
    <Header :taxonomy="taxonomy" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'

const taxonomy = ref({ uid: 'abcbs', name: 'lob' })
</script>
