<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AppDashboard />
    <AppTable />
  </div>
</template>

<script>
import AppDashboard from './components/AppDashboard.vue';
import AppTable from './components/AppTable.vue';

export default {
  name: 'App',
  components: {
    AppDashboard,
    AppTable
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
