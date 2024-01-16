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
    <div>
        <h1>{{ activity }}</h1>
        <h3>{{ day }}</h3>
    </div>
</template>
