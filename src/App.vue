<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AppDashboard />
    <AppForm />
  </div>
</template>

<script>
import AppDashboard from './components/AppDashboard.vue';
import AppForm from './components/AppForm.vue';

export default {
  name: 'App',
  components: {
    AppDashboard,
    AppForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
