 <!-- <script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { decodeCredential, googleLogout } from 'vue3-google-login';
import NewActivity from '@/components/NewActivity.vue';

const { cookies } = useCookies();

const activityList = ref({});
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
    activityList.value = data;
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
          activityList.value = result;
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
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <img src="@/assets/ss2.png" alt="S_S" class="logo">
        <div v-if="isLoggedIn" class="header">
          <h2>Welcome to your account page {{ userName }}!</h2>
          <div class="new-activity">
            <NewActivity v-if="isLoggedIn" :fetchData="fetchActivities" />
          </div>
        </div>
        <ul class="list-group">
          <li v-for="activity in activityList" :key="activity._id" class="list-group-item d-flex justify-content-between lh-condensed">
            <RouterLink :to="'/activity/' + activity._id">
              <h6 class="my-0">{{ activity.activity }}</h6>
            </RouterLink>
            <div class="day d-flex align-items-center">
              <small class="text-muted">{{ activity.day }}</small>
            </div>
            <div>
              <button v-if="isLoggedIn" @click="deleteActivity(activity._id)" class="btn btn-sm btn-danger">
              <img src="@/assets/trash.png" alt="Delete Icon" class="icon-image"> 
                </button>
              <RouterLink v-if="isLoggedIn" :to="'/activity/update/' + activity._id" class="btn btn-sm btn-primary">Edit</RouterLink>
            </div>
          </li>
        </ul>
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
  /* background-color: #3498db; */
  color: #000000;
  padding: 10px;
  text-align: center;
}
.logo {
    width: 600px;
    padding: 10px;
    height: auto;
  }

.activity-list {
  list-style: none;
  padding: 0;
}

.activity-item {
  margin-bottom: 10px;
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
  max-width: 100px; 
  justify-content: center;
}
.icon-image {
    width: 16px; 
    height: 16px; 
    margin-right: 5px; 
  }



</style> -->

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { decodeCredential, googleLogout } from 'vue3-google-login';
import NewActivity from '@/components/NewActivity.vue';

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
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <img src="@/assets/ss2.png" alt="S_S" class="logo">
        <div v-if="isLoggedIn" class="header">
          <h2>Welcome to your account page {{ userName }}!</h2>
          <div class="new-activity">
            <NewActivity v-if="isLoggedIn" :fetchData="fetchActivities" />
          </div>
        </div>
        <div v-for="(activities, day) in activityGroups" :key="day">
          <h4>{{ day }}</h4>
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
                  <img src="@/assets/trash.png" alt="Delete Icon" class="icon-image"> 
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
  /* background-color: #3498db; */
  color: #000000;
  padding: 10px;
  text-align: center;
}
.logo {
    width: 600px;
    padding: 10px;
    height: auto;
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
  max-width: 100px; 
  justify-content: center
}
.icon-image {
    width: 16px; 
    height: 16px; 
    margin-right: 5px; 
  }
</style>
