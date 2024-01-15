<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import NewActivity from '@/components/NewActivity.vue'

const activityBe = ref({})

// onMounted(() => {
//     const route = useRoute()

//     fetch(`${import.meta.env.VITE_API_URL}/activites/${route.params.id}`)
//     .then(response => response.json())
//     .then( result => {
//         activity.value = result
//         console.log(activity.value)
//     })
//     .catch(err => console.error(err))
// })

const fetchData = async () => {
    try {
    const response = await fetch (`${import.meta.env.VITE_API_URL}/activities`)
    const data = await response.json()
    activityBe.value = data
  } catch (err) {
    console.error('Error fetching activities', err.message)
  }
}

onMounted(() => {
    fetchData()
})

</script>

<template>
   <h1>TBC</h1>
<ul>
    <li v-for="activity in activityBe" :key="activity._id">
            <RouterLink :to="'/activities/' + activity._id">{{ activity.activity }}</RouterLink> &nbsp;
        </li>
    </ul>
    <hr>
    <div >
    <NewActivity />
    </div>
</template>