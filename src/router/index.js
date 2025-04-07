import { createRouter, createWebHistory } from 'vue-router'
import PageView from '@/views/PageView.vue'

// Fetch pages from the Pinia store (no usePagesStore() here)
const fetchPageRoutes = async (pagesStore) => {
  await pagesStore.fetchPages() // Ensure pages are fetched before setting up routes

  return pagesStore.pages.map((entry) => {
    const documentList = Array.isArray(entry.document_list) ? entry.document_list : []

    const documentsWithUrls = documentList.map((document) => ({
      ...document,
      original_url: document.url,
      overridden_url: `${window.location.origin}/custom-folder/${entry.taxonomies?.[0]?.term_uid || ''}/${document.filename}`,
    }))

    return {
      path: entry.url,
      name: entry.title || entry.uid,
      component: PageView,
      props: {
        entry,
        documentList: documentsWithUrls,
        taxonomy: entry.taxonomies || [],
      },
    }
  })
}

const initializeRouter = async (pagesStore) => {
  const routes = await fetchPageRoutes(pagesStore)

  routes.push({
    path: '/',
    name: 'Home',
    component: PageView,
  })

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  return router
}

export const initializeAppRouter = async (pagesStore) => {
  const router = await initializeRouter(pagesStore)
  return router
}
