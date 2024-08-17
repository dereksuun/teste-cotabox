<template>
 <div id="app">
    <img alt="logo cotabox" src="./assets/logo cotabox.png">
    <AppDashboard />
    <AppTable />
    <PieChart />
  </div>
</template>

<script>
import AppDashboard from './components/AppDashboard.vue';
import AppTable from './components/AppTable.vue';
import PieChart from './components/PieChart.vue';

export default {
  name: 'App',
  components: {
     AppDashboard,
     AppTable,
     PieChart,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #131414;
  margin-top: 60px;
  background-color: #fafafa;
}
</style>
