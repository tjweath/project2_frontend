<script setup>

import imgURL from '../assets/SS2.png'

</script>

<template>
  <div class="wrapper">
    <main class="center-container">
      <h1 class="animated-heading">Sweat_Share_Succeed!</h1> &nbsp;
      <img :src="imgURL" alt="S_S" class="logo">
      <h2></h2>
    </main>
  </div>
</template>

<style scoped>

@keyframes slideIn {
  0%, 100% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.animated-heading {
  animation: slideIn 5s linear infinite; /* 5s duration, linear timing function, infinite repeat */
}
.logo {
  width: 800px;
}
</style>