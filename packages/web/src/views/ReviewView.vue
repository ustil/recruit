<script setup lang="ts">
import Cell from '@/components/TableCell.vue'
import { useTableStore } from '@/stores/table'
import type { Student } from '@recruit/api/src'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { cells } = storeToRefs(useTableStore())

onMounted(async () => {
  const students = (await (await fetch('/api/students')).json()) as Student[]
  cells.value = students.map(
    ({ id, name, school, major, score, isPassed, note }) => [
      id,
      name,
      school,
      major,
      score,
      isPassed,
      note,
    ],
  )
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>学院</th>
        <th>专业</th>
        <th>分数</th>
        <th>通过</th>
        <th>备注</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in cells.length" :key="i">
        <td v-for="j in cells[0].length" :key="j">
          <Cell :column="i - 1" :row="j - 1"></Cell>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
body {
  margin: 0;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

th {
  background-color: #eee;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}
</style>
