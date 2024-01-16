<script setup>

import { onMounted, ref } from 'vue';
import { useRoute , useRouter } from 'vue-router';

const route = useRoute() 
const router = useRouter()

const activityId = route.params.id

const activity = ref({
    activity: '',
    day: '',
    // completed: ''
})

const loadActivityData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/activity/${activityId}`)
    .then(res => res.json())
    .then(data => {
        activity.value = {
            activity: data.activity,
            day: data.day.day
        }
    })
    console.log(activityId)
}

const updateActivity = () => {
    fetch(`${import.meta.env.VITE_API_URL}/activity/${activityId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity.value)
    })
    .then(() => { 
        router.replace({ name: 'activity' })
    })
    .catch(err => console.error(err))
}

onMounted(loadActivityData)

</script>

<template>
    <h1>Edit Activity</h1>
    <div class="activityForm">
            <label for="activity"> Activity: *</label>
            <input type="text" name="activity" placeholder="Activity" v-model="activity.activity" required>
            <label for="day">Day *</label>
            <input type="text" author="day" placeholder="Day" v-model="activity.day" required>
            <!-- <label for="completed">completed *</label>
            <input type="checkbox" name="completed" v-model="activity.completed" required> -->
            <button @click="updateActivity">Update Activity</button>
    </div>
</template>