<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@media all and (min-width: 412px) {
  html {
    width: 412px;
    margin: auto;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch("fetchUserInfo", this.$route.params.uid);
    this.$store.dispatch("fetchStepCount", this.$route.params.uid);
    this.$store.dispatch("fetchGoalInfo", this.$route.params.uid);
  }
};
</script>