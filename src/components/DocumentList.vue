<template>
  <div>
    <h2>Documents</h2>
    <ul v-if="documentList.length > 0">
      <li v-for="(document, index) in documentList" :key="index">
        <a :href="document.url" target="_blank">{{ document.title }}</a>
      </li>
    </ul>
    <p v-else>No documents available.</p>
  </div>
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
  // Check if document_list exists and if it's an object with a 'file' array inside
  const list = currentPage.value?.document_list?.file
  return Array.isArray(list) ? list : []
})
</script>
