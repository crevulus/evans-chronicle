<template>
  <div id="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Employee name</th>
          <th>Employee email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in employees" v-bind:key="e.id">
          <td>{{e.name}}</td>
          <td>{{e.email}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "EmployeeTable",
  props: {
    employees: Array,
  },
};
</script>

<style scoped></style>