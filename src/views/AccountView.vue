<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const account = ref({})

onMounted(() => {
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/account/${route.params.id}`)
    .then(response => response.json())
    .then( result => {
        account.value = result
        console.log(account.value)
    })
    .catch(err => console.error(err))
})
</script>

<template>
    <h1>Testing Testing</h1>
    <h2> Hello Tim </h2>
    <div class="days-list">
    <ul>
      <li>Monday</li>
      <li>Tuesday</li>
      <li>Wednesday</li>
      <li>Thursday</li>
      <li>Friday</li>
      <li>Saturday</li>
      <li>Sunday</li>
    </ul>
  </div>
</template>