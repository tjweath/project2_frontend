<script setup>

const {fetchData} = defineProps(['fetchData'])

const activity = {
    activity: '',
    day: '',
    // completed: false
}

function addActivity() {
    if( activity.activity === '' || activity.day === '' ){
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
        fetchData()
        console.log(res);
    })
    .catch(err => console.error(err))
}

</script>

<template>
    <h5>Add new activities here!</h5>
    <div class="activityForm">
            <label for="activity">Activity: *</label>
            <input type="text" name="activity" placeholder="Eg, Gym" v-model="activity.activity" required>
            <label for="day">Day *</label>
            <input type="text" name="day" placeholder="Eg, Friday" v-model="activity.day" required>
            <!-- <label for="completed">completed *</label>
            <input type="checkbox" name="completed" v-model="activity.completed" required> -->
            <button @click="addActivity">Add</button>
    </div>
</template>


