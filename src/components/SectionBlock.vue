<template>
   
  <div :class="['section', background]">
       
    <div class="inner" v-html="section.content"></div>
     
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

// Use the key from the select field as the class
const background = computed(() => {
  const key = props.section?.background_colors
  return key ? `bc--${key.toLowerCase()}` : ''
})
</script>

<style scoped>
.section {
  padding: 0;
}

.inner {
  max-width: 1440px;
  width: calc(100% - 4rem);

  padding: 2rem;
}
</style>
