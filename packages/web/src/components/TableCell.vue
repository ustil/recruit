<script setup lang="ts">
import { useTableStore } from '@/stores/table'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'

const props = defineProps<{
  column: number
  row: number
}>()

const { cells } = storeToRefs(useTableStore())
const editing = ref(false)
const input = ref<HTMLInputElement | null>(null)

function update(e: Event) {
  editing.value = false
  cells.value[props.column][props.row] = (
    e.target as HTMLInputElement
  ).value.trim()
}

async function edit() {
  editing.value = true
  await nextTick()
  input.value?.focus()
}
</script>

<template>
  <div class="cell" @click="edit">
    <input
      v-if="editing"
      :value="cells[column][row]"
      @change="update"
      @blur="update"
      ref="input"
    />
    <span v-else>{{ cells[column][row] }}</span>
  </div>
</template>

<style>
.cell,
.cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
</style>
