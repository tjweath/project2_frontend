<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/login">Login/Logout</RouterLink> &nbsp;
        <RouterLink to="/">Home</RouterLink> &nbsp;
        <RouterLink to="/book">Books</RouterLink> &nbsp; -->
        <!-- <RouterLink to="/author">Author List</RouterLink>  -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

