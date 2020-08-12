<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
// import EmployeeTable from "./components/EmployeeTable";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    // EmployeeTable,
    NavBar,
  },
};
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 680px;
}
</style>
