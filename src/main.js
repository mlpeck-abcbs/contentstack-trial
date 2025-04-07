import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { initializeAppRouter } from './router/index.js' // Import the async router setup
import { usePagesStore } from './stores/pagesStore' // Pinia store

// Create and initialize the app
const app = createApp(App)
const pinia = createPinia()

// Use Pinia store
app.use(pinia)

// Initialize the router with Pinia store after it has been set up
const pagesStore = usePagesStore() // Access the store after Pinia is initialized

initializeAppRouter(pagesStore).then((router) => {
  app.use(router) // Now that the router is ready, use it in the app
  app.mount('#app') // Mount the app
})
