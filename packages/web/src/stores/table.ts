import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('table', () => {
  const cells = ref(Array.of(Array.of<any>()))
  return { cells }
})
