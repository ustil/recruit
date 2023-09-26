<script setup lang="ts">
import 'simpledotcss'
import { ref } from 'vue'

const isQueried = ref(false)
const id = ref('')
const student = ref<{
  id: string
  name: string
  isPassed: boolean | null
} | null>(null)

async function submit() {
  const resp = await fetch(`/api/student/${id.value}`)
  isQueried.value = true
  student.value = resp.status !== 404 ? await resp.json() : null
}
</script>

<template>
  <h2>成绩查询</h2>
  <form @submit.prevent="submit" v-if="!isQueried">
    <p>
      <label for="id">学号</label>
      <input id="id" placeholder="23xxxxxxx" v-model="id" required />
    </p>
    <button>查询</button>
  </form>
  <div v-else>
    <ul v-if="student !== null">
      <li>学号：{{ student.id }}</li>
      <li>姓名：{{ student.name }}</li>
      <li>
        {{
          student.isPassed !== null
            ? student.isPassed
              ? '已通过'
              : '未通过'
            : '未审核'
        }}
      </li>
    </ul>
    <p v-else>学号不存在！</p>
    <button
      type="button"
      @click="
        () => {
          isQueried = false
          student = null
        }
      "
    >
      返回
    </button>
  </div>
</template>
