<template>
  <div>
    <div v-for="(option, index) in pageOptions" :key="index">
      <HeroBanner v-if="option.hero_banner" :content="option.hero_banner" />
      <DocumentList v-if="option.document_list" :documents="option.document_list" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePagesStore } from '@/stores/pagesStore'
import HeroBanner from '@/components/HeroBanner.vue'
import DocumentList from '@/components/DocumentList.vue'

const route = useRoute()
const slug = ref(route.params.slug)

watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = newSlug
  },
)

const pagesStore = usePagesStore()

const pageOptions = computed(() => pagesStore.getPageOptionsBySlug(slug.value))
</script>
