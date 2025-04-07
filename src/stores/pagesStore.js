// src/stores/pages.js
import { defineStore } from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: [], // This will hold the array of page entries
  }),
  actions: {
    async fetchPages() {
      // Fetch the data (replace with your actual data fetching logic)
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
      this.pages = data.entries // Store the fetched pages in the state
    },
  },
})
