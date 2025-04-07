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
      path: entry.url, // Use the page URL (slug) for routing
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

// Add a fallback for the root page (`/`)
const initializeRouter = async (pagesStore) => {
  const routes = await fetchPageRoutes(pagesStore)

  // Add a route for the root page if necessary
  routes.push({
    path: '/',
    name: 'Home', // Or any name for your root page
    component: PageView,
  })

  const router = createRouter({
    history: createWebHistory(),
    routes, // Dynamically generated routes
  })

  return router
}

// Export an async function to initialize the router and store
export const initializeAppRouter = async (pagesStore) => {
  const router = await initializeRouter(pagesStore)
  return router
}
