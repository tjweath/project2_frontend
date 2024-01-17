<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const activity = ref({})
const day = ref({})

onMounted(() => {
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/activity/${route.params.id}`)
    .then(response => response.json())
    .then(result => {
        activity.value = result.activity
        day.value = result.day
        console.log(activity.value)
        console.log(day.value)
    })
    .catch(err => console.error(err))
})
</script>


<template>
    <div class="styled-page">
        <h1>{{ activity }} on {{ day }}</h1>
    </div>
</template>

<style>
.styled-page {
    max-width: 500px;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

h1 {
    color: #333;
}

h3 {
    color: #555;
}
</style>
