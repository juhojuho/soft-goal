<template>
  <div id="app">
    <div class="name">안녕하세요, {{ $store.state.userInfo.name }}님</div>
    <router-view />
  </div>
</template>

<style>
@media all and (min-width: 400px) {
  html {
    width: 400px;
    margin: auto;
    padding: 0;
  }
}

body {
  margin: 0;
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

.name {
  margin-top: 20px;
  margin-left: 10px;
  font-size: 2em;
  text-align: left;
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