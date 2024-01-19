<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/home">Home</RouterLink> &nbsp;
        <RouterLink to="/login">Login/Logout</RouterLink> &nbsp;
        <RouterLink to="/activity">Account</RouterLink> &nbsp;
      </nav>
    </div>
  </header>
  <RouterView />
</template>