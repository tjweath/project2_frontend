<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const book = ref({})

onMounted(() => {
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/activity/${route.params.id}`)
    .then(response => response.json())
    .then( result => {
        activity.value = result
        console.log(activity.value)
    })
    .catch(err => console.error(err))
})
</script>

<template>
    <h1>{{ activity.activity }}</h1>
    <h3>{{ activity.day?.day }}</h3>
</template>