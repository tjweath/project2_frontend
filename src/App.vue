<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/login">Login/Logout</RouterLink> &nbsp;
        <RouterLink to="/activity">Home</RouterLink> &nbsp;
      </nav>
    </div>
  </header>
  <RouterView />
</template>

