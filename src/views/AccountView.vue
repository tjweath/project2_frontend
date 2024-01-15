<script setup>
import { ref, onMounted } from 'vue'
import { useCookies} from 'vue3-cookies'
import { decodeCredential, googleLogout} from 'vue3-google-login'
import NewActivity from '@/components/NewActivity.vue'


const { cookies } = useCookies()

const accountsBe = ref({})
const isLoggedIn = ref(false)
let userName = ''

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/activities`)
    .then( response => response.json() )
    .then( result => {
        accountsBe.value = result
        console.log(accountsBe.value)
    } )
}

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName = userData.given_name
    }
}

onMounted(() => {
  checkSession()  
  fetchData()
})

</script>

<template>
    <h1>Your main account page!</h1>
    <h2> User Name Here from Google </h2>
  <ul>
    <li v-for="account in accountsBe" :key="account._id">
            <RouterLink :to="'/account/' + account._id">{{ account.activity }} - {{ account.day }}</RouterLink> &nbsp; 
            <!-- <button @click="deleteBook(book._id)">Delete Book</button> &nbsp; 
            <RouterLink :to="'/book/update/' + book._id">Edit Book</RouterLink> -->
        </li>
    <NewActivity :fetchData="fetchData"/>
  </ul>

</template>