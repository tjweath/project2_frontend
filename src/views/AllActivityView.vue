<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import NewActivity from '@/components/NewActivity.vue';

const activityBe = ref({})

const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/activity`);
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data)
    activityBe.value = data;
  } catch (err) {
    console.error('Error fetching activities', err.message);
  }
};

function deleteActivity(activityId) {
    fetch(`${import.meta.env.VITE_API_URL}/activity/${activityId}`,{
        method: "DELETE"
    })
    .then(() =>{
    alert('Activity Deleted')
    fetch(`${import.meta.env.VITE_API_URL}/activity`)
    .then( response => response.json() )
    .then( result => {
        activityBe.value = result
    } )
    })
    
    .catch(err => console.error(err))
}

onMounted(() => {
    fetchData()
})

</script>

<template>
   <h1>Activity List</h1>
<ul>
    <li v-for="activity in activityBe" :key="activity._id">
            <RouterLink :to="'/activity/' + activity._id">{{ activity.activity }} - {{activity.day}} </RouterLink> &nbsp;
            <button @click="deleteActivity(activity._id)">Delete Activity</button> &nbsp; 
            <RouterLink :to="'/activity/update/' + activity._id">Edit Activity</RouterLink>
        </li>
    </ul>
    <hr>
    <div >
    <NewActivity />
    </div>
</template>