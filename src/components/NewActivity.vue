<script setup>

const {fetchData} = defineProps(['fetchData'])

const activity = {
    activity: '',
    day: ''
}

function addActivity() {
    if( activity.name === '' || activity.day === '' ){
        alert('All values are required')
        return
    }
    fetch(`${import.meta.env.VITE_API_URL}/account/add`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity)
    })
    .then(res => {
        activity.activity = ''
        activity.day = ''
        console.log(res);
    })
    .catch(err => console.error(err))
}

</script>

<template>
    <h3>Add a new Activity</h3>
    <div class="activityForm">
            <label for="activity"> Activity: *</label>
            <input type="text" name="activity" placeholder="Activity" v-model="activity.activity" required>
            <label for="day">Day *</label>
            <input type="text" name="day" placeholder="Day" v-model="activity.day" required>
            <button @click="addActivity">Add Activity</button>
    </div>
</template>