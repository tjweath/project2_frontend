<script setup>
import { ref } from 'vue';

const {fetchData} = defineProps(['fetchData'])

const activity = ref({
    activity: '',
    day: '',
})

function addActivity() {
    if( activity.value.activity === '' || activity.value.day === '' ){
        alert('All values are required')
        return
    }
    fetch(`${import.meta.env.VITE_API_URL}/account/add`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity.value)
    })
    .then(res => {
        fetchData()
        console.log(res)
        activity.value.activity = ''
        activity.value.day = ''
    })
    .catch(err => console.error(err))
}

</script>

<template>
    <div class="activityForm">
            <label for="activity">Activity</label>
            <input type="text" name="activity" placeholder="Eg, Gym" v-model="activity.activity" required>
            <label for="day">Day</label>
            <input type="text" name="day" placeholder="Eg, Friday" v-model="activity.day" required>
            <button @click="addActivity">Add</button>
    </div>
</template>

<style scoped>

.activityForm{
    justify-content: center;
    display: flex;
}

</style>


