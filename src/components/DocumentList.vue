<template>
  <ul v-if="documentList.length > 0">
    <li v-for="(document, index) in documentList" :key="index">
      <a :href="document.url" target="_blank" rel="noopener noreferrer">{{ document.title }}</a>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { usePagesStore } from '@/stores/pagesStore'
import { useRoute } from 'vue-router'

const pagesStore = usePagesStore()
const route = useRoute()

const currentPage = computed(() =>
  pagesStore.pages.find((page) => page.url.toLowerCase() === route.path.toLowerCase()),
)

const documentList = computed(() => {
  const list = currentPage.value?.document_list?.file
  return Array.isArray(list) ? list : []
})
</script>
