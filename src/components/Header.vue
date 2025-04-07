<template>
  <header>
    <img :src="logoSrc" alt="Logo" />
  </header>
</template>

<script setup>
import { computed, watch } from 'vue'
import { usePagesStore } from '@/stores/pagesStore'
import { useRoute } from 'vue-router'

const pagesStore = usePagesStore()
const route = useRoute()

// Compute the current page based on the route path
const currentPage = computed(() =>
  pagesStore.pages.find((page) => page.url.toLowerCase() === route.path.toLowerCase()),
)

// Compute the logo source dynamically based on taxonomy term_uid
const logoSrc = computed(() => {
  // Check for the first taxonomy and its term_uid
  const taxonomies = currentPage.value?.taxonomies
  const taxonomy = taxonomies && taxonomies.length > 0 ? taxonomies[0] : null
  const termUid = taxonomy?.term_uid || 'default' // Fallback to 'default' if no term_uid

  // Return the logo source based on termUid
  return `/assets/${termUid}-logo.png`
})

// Watch route path to update logo when the page changes
watch(
  () => route.path,
  () => {
    // Trigger recomputation of logoSrc whenever the route changes
  },
  { immediate: true },
)
</script>
