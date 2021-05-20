<template>
<nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand" href="#">Perfect Work Group</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <router-link to="/">
                <li class="nav-item active">
                    <a class="nav-link">Home <span class="sr-only">(current)</span></a>
                </li>
            </router-link>
            <router-link to="/about">
                <li class="nav-item">
                    <a class="nav-link">About</a>
                </li>
            </router-link>
            <router-link to="/profile">
                <li class="nav-item">
                    <a class="nav-link">profile</a>
                </li>
            </router-link>
             <router-link to="/posts" v-if="loggedIn">
              <li class="nav-item">
                  <a class="nav-link">Posts</a>
                </li>
            </router-link>            

        </ul>
        <ul class="navbar-nav">
            <router-link to="/login" v-if="!loggedIn">
                <li class="nav-item">
                    <a class="nav-link">Login</a>
                </li>
            </router-link>
            <router-link to="/register" v-if="!loggedIn">
              <li class="nav-item">
                <a class="nav-link">Register</a>
                </li>
            </router-link>
             <router-link to="/" v-if="loggedIn">
              <li class="nav-item">
                <button class="btn btn-warning" @click.prevent="PerformLogout">logout</button>
                </li>
            </router-link>
            <li class="nav-item" v-if="loggedIn">
                <a class="nav-link">{{name}}</a>
                </li>
        </ul>
    </div>
</nav>
</template>



<script>


export default ({
   name: 'navbar',
   data(){
       return {
           token: null,
           name: this.$store.getters.get_User,
       };
   },
   mounted(){
       this.CheckAuth();
   },
   computed: {
       loggedIn(){
           console.log("Loggin " + this.$store.getters.get_loggedIn);
           console.log("name " + this.$store.getters.get_loggedIn);
           return this.$store.getters.get_loggedIn;
       }
   },
   methods: {
       CheckAuth(){
           if(localStorage.getItem('token') != null){
               this.token = localStorage.getItem('token');
           }
       },
       PerformLogout(){
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        // this.token = null;

         this.$store.dispatch('PerformLogoutAction')
        .then(res =>{
            console.log("Logout", res);
            this.$router.push({ path: '/' });

        })
        .catch(err => {
            console.log("Error in Logout ",err);
        })
       }
   }
})
</script>

