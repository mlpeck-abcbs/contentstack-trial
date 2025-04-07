<template>
  <div id="inner">
    <Header :taxonomy="taxonomy" />
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'

const taxonomy = ref({ uid: 'abcbs', name: 'lob' })

onMounted(() => {
  console.log(taxonomy.value) // Ensure it has the correct value
})
</script>
