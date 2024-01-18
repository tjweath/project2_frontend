<script setup >
import { ref, onMounted } from 'vue'
import { useCookies} from 'vue3-cookies'
import { decodeCredential, googleLogout} from 'vue3-google-login'
// import image from './assets/SS2.png'

const { cookies } = useCookies()

let isLoggedIn = ref(false)
let userName = ''

const callback = (response) => {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    console.log(userData);
    userName = userData.given_name
    cookies.set('user_session', response.credential)
    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userData.email
        })
    })
    .then(() => {
        console.log('session saved');
    })
    .catch( err => console.error(err) )
}

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    }
}

const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
}

onMounted(checkSession)

</script>

  <template>
    <div class="container">
      <div class="header">
        <img :src="image" alt="S_S" class="logo">
        <h2>Track your fitness journey by monitoring your regular activities</h2>
      </div>
  
      <div class="features">
        <p>Some new features coming soon!</p>
        <ul>
          <li>A weekly and monthly calendar view on the home page</li>
          <li>Tracking all of your completed activities</li>
          <li>Create your Sweat_Squad by sharing a calendar with friends</li>
        </ul>
      </div>
  
      <div v-if="isLoggedIn" class="logout-section">
        <button @click="handleLogout" class="logout-btn">Log Out</button>
      </div>
  
      <div v-else class="login-section">
        <GoogleLogin :callback="callback" />
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .logo {
    width: 500px;
  }
  
  .features {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .features p {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .features ul {
    list-style-type: none;
    padding: 0;
  }
  
  .features li {
    background-color: rgb(6, 6, 37);
    padding: 10px;
    color: rgba(214, 210, 17, 0.745);
    margin-bottom: 5px;
  }
  
  .logout-section,
  .login-section {
    text-align: center;
  }
  
  .logout-btn {
    background-color: #ff5555;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
  .header h2 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  </style>
  
  