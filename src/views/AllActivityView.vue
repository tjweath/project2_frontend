<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router';
import { useCookies} from 'vue3-cookies'
import { decodeCredential, googleLogout} from 'vue3-google-login'
import NewActivity from '@/components/NewActivity.vue';

const { cookies } = useCookies()

const activityBe = ref({})
const isLoggedIn = ref(false)
let userName = ''

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

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    }
}

onMounted(() => {
    fetchData()
    checkSession()
})


</script>

<template>
  <div v-if="isLoggedIn">
    <h2>SweatSquad: {{ userName }}</h2> &nbsp;
  </div>
  <ul>
    <li v-for="activity in activityBe" :key="activity._id">
      <RouterLink :to="'/activity/' + activity._id">{{ activity.activity }}: {{activity.day}} </RouterLink> &nbsp;
      <button v-if="isLoggedIn" @click="deleteActivity(activity._id)">Delete</button> &nbsp; 
      <RouterLink v-if="isLoggedIn" :to="'/activity/update/' + activity._id">Edit</RouterLink>
    </li>
  </ul>
  <hr>
  <div>
    <NewActivity v-if="isLoggedIn" :fetchData="fetchData"/>
  </div>
</template>

