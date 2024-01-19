<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { decodeCredential, googleLogout } from 'vue3-google-login';
import NewActivity from '@/components/NewActivity.vue';
import imgURL from '../assets/SS2.png'

const { cookies } = useCookies();

const activityGroups = ref({});
const isLoggedIn = ref(false);
let userName = '';

const fetchActivities = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/activity`);
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    // Group activities by day
    activityGroups.value = data.reduce((groups, activity) => {
      const day = activity.day;
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(activity);
      return groups;
    }, {});

const orderedDays = {
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6,
      "sunday": 7
    };
    let tmp = [];
    console.log('checking',activityGroups.value)
Object.keys(activityGroups.value).forEach(function(el) {
  let value = activityGroups.value[el];
  let index = orderedDays[el.toLowerCase()];
  tmp[index] = {
    key: el,
    value: value
  };
});
console.log(tmp)
let orderedData = {};
tmp.forEach(function(obj) {
  orderedData[obj.key] = obj.value;
});
activityGroups.value = orderedData


  } catch (err) {
    console.error('Error fetching activities', err.message);
  }
};

const deleteActivity = (activityId) => {
  fetch(`${import.meta.env.VITE_API_URL}/activity/${activityId}`, {
    method: 'DELETE',
  })
    .then(() => {
      alert('Activity Deleted');
      fetch(`${import.meta.env.VITE_API_URL}/activity`)
        .then((response) => response.json())
        .then((result) => {
          activityGroups.value = result.reduce((groups, activity) => {
            const day = activity.day;
            if (!groups[day]) {
              groups[day] = [];
            }
            groups[day].push(activity);
            return groups;
          }, {});
        });
    })
    .catch((err) => console.error(err));
};

const checkSession = () => {
  if (cookies.isKey('user_session')) {
  isLoggedIn.value = true;
    const userData = decodeCredential(cookies.get('user_session'));
    userName = userData.given_name;
  }
};

onMounted(() => {
  fetchActivities();
  checkSession();
});
</script>

<template>
  <div class="app-container">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <img :src="imgURL" alt="S_S" class="logo">
        <div v-if="isLoggedIn" class="header">
          <h2>Welcome to your account {{ userName }}!</h2>
          <div class="new-activity">
            <NewActivity v-if="isLoggedIn" :fetchData="fetchActivities" />
          </div>
        </div>
        <div v-for="(activities, day) in activityGroups" :key="day">
          <ul class="list-group">
            <li v-for="activity in activities" :key="activity._id" class="list-group-item d-flex justify-content-between lh-condensed">
              <RouterLink :to="'/activity/' + activity._id">
                <h6 class="my-0">{{ activity.activity }}</h6>
              </RouterLink>
              <div class="day d-flex align-items-center">
                <small class="text-muted">{{ activity.day }}</small>
              </div>
              <div>
                <button v-if="isLoggedIn" @click="deleteActivity(activity._id)" class="btn btn-sm btn-danger">
                  <img src="@/assets/trash2.png" alt="Delete Icon" class="icon-image"> 
                </button>
                <RouterLink v-if="isLoggedIn" :to="'/activity/update/' + activity._id" class="btn btn-sm btn-primary">Edit</RouterLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  color: #000000;
  padding: 10px;
  text-align: center;
  white-space: nowrap;
}
.logo {
    width: 100%;
    padding: 10px;
    height: auto;
    display: block; 
    margin: 0 auto;
  }

.activity-list {
  list-style: none;
  padding: 0;
}

.activity-item {
  margin-bottom: 20px;
}

.delete-button {
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
}

.edit-link {
  text-decoration: none;
  color: #3498db;
  margin-left: 10px;
}

.divider {
  border: 1px solid #ccc;
  margin: 20px 0;
}

.new-activity {
  margin-top: 20px;
  
}
.day {
  display: flex; 
  align-items: margin-left; 
  justify-content: left; 
  max-width: 100px;
  color: rgb(11, 11, 11) !important;
}
.icon-image {
    width: 16px; 
    height: 16px; 
    margin-right: 5px; 
  }

.list-group-item {
  background-color: rgb(224, 226, 211);
}
</style>
