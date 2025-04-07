<template>
  <div v-if="bannerContent && bannerImg" class="hero-banner">
    <img :src="bannerImg.url" :alt="bannerImg.title" class="hero-banner-img" />
    <div class="hero-banner-content" v-html="bannerContent"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePagesStore } from '@/stores/pagesStore'
import { useRoute } from 'vue-router'

const pagesStore = usePagesStore()
const route = useRoute()

const currentPage = computed(() => {
  const foundPage = pagesStore.pages.find(
    (page) => page.url.toLowerCase() === route.path.toLowerCase(),
  )
  console.log(foundPage)
  return pagesStore.pages.find((page) => page.url.toLowerCase() === route.path.toLowerCase())
})

const bannerContent = computed(() => {
  const pageOptions = currentPage.value?.page_options
  const heroBanner = pageOptions?.find((option) => option.hero_banner)
  return heroBanner?.hero_banner.banner_content || ''
})

const bannerImg = computed(() => {
  const pageOptions = currentPage.value?.page_options
  const heroBanner = pageOptions?.find((option) => option.hero_banner)
  return heroBanner?.hero_banner.banner_image || {}
})
</script>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
}

.hero-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-banner-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
}
</style>
