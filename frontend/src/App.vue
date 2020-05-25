<template>
  <div id="app">
    <b-alert class="text-center data-alert" variant="danger" show>This is a beta version. Please do not store personal details on this instance.</b-alert>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap');
  html, body {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }
  .data-alert{
    margin: 0;
    border-radius: 0;
  }
</style>
