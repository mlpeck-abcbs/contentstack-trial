<template>
  <footer>
    <img :src="logoSrc" alt="Logo" />
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, odio recusandae
      tempora sapiente ab quas neque, vitae assumenda, nisi autem in a hic deleniti ullam nulla
      labore quo accusamus quis.
    </p>
  </footer>
</template>

<script setup>
import { computed, watch } from 'vue'
import { usePagesStore } from '@/stores/pagesStore'
import { useRoute } from 'vue-router'

const pagesStore = usePagesStore()
const route = useRoute()

const currentPage = computed(() =>
  pagesStore.pages.find((page) => page.url.toLowerCase() === route.path.toLowerCase()),
)

const logoSrc = computed(() => {
  const taxonomies = currentPage.value?.taxonomies
  const taxonomy = taxonomies && taxonomies.length > 0 ? taxonomies[0] : null
  const termUid = taxonomy?.term_uid || 'default'

  return `/assets/${termUid}-logo.png`
})

watch(
  () => route.path,
  () => {},
  { immediate: true },
)
</script>

<style scoped>
footer {
  padding: 1rem;

  background: #999;

  img {
    max-width: 400px;
  }
}
</style>
