<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
    <navbar></navbar>  
  </div>
  <router-view />
</template>



<script>
  import navbar from "./components/navbar";

  export default {
  components: { navbar },
      navbar
  }
</script>

