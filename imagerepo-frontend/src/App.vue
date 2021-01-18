<template>
  <div id="app" class="ml-4">
    <b-navbar class="mt-4" variant="faded" type="light">
      <b-navbar-brand to="/">
        <img src="logo.png" class="d-inline-block align-top" alt="Dog" />
        Biscuit's Gallery
      </b-navbar-brand>
    </b-navbar>
    <div class="my-5">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
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
