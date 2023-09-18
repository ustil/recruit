<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
const id = ref('')
const school = ref('')
const major = ref('')

async function submit() {
  await fetch('/api/student', {
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      id: id.value,
      school: school.value,
      major: major.value,
    }),
  })
}
</script>

<template>
  <h2>报名</h2>
  <form @submit.prevent="submit">
    <p>
      <label for="name">姓名</label>
      <input id="name" placeholder="张三" v-model="name" required />
    </p>
    <p>
      <label for="id">学号</label>
      <input id="id" placeholder="23xxxxxxx" v-model="id" required />
    </p>
    <p>
      <label for="school">学院</label>
      <input id="school" placeholder="软件学院" v-model="school" required />
    </p>
    <p>
      <label for="major">专业</label>
      <input id="major" placeholder="软件工程" v-model="major" required />
    </p>
    <button>提交</button>
  </form>
</template>
