import { defineStore } from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [],
  }),

  actions: {
    async fetchPages() {
      const response = await fetch(
        `https://cdn.contentstack.io/v3/content_types/pages/entries?include_branch=development&environment=${import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT}`,
        {
          headers: {
            api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY,
            access_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY,
            branch: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT,
          },
        },
      )

      const data = await response.json()
      console.log('Fetched pages:', data.entries)
      this.pages = data.entries
    },
  },

  getters: {
    getPageOptionsBySlug: (state) => (slug) => {
      const page = state.pages.find((p) => p.slug === slug)
      return page ? page.page_options || [] : []
    },
    getPageBySlug: (state) => (slug) => {
      return state.pages.find((p) => p.slug === slug)
    },
  },
})
