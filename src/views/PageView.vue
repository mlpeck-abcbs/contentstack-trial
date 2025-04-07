<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <DocumentList />
  </div>
</template>

<script setup>
import DocumentList from '@/components/DocumentList.vue'

import { usePagesStore } from '@/stores/pagesStore'
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const pagesStore = usePagesStore()
const route = useRoute()

const currentPage = computed(() => {
  return pagesStore.pages.find((page) => page.url.toLowerCase() === route.path.toLowerCase())
})

const pageTitle = computed(() => currentPage.value?.title || 'Loading...')

onMounted(async () => {
  if (pagesStore.pages.length === 0) {
    await pagesStore.fetchPages()
  }
})

watch(
  () => route.path,
  async () => {
    if (pagesStore.pages.length === 0) {
      await pagesStore.fetchPages()
    }
  },
)
</script>
