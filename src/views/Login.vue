<template>
  <div class="login">
    <div class="col-md-6 offset-md-3">
      <h2 class="display-4 text-center mt-5">Login Form</h2>

      <form action="">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="email" class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password" class="form-control">
        </div>
        <div class="form-group" style="color:red" v-if=error> {{error}}</div>
         <div class="form-group">
            <button type="submit" @click.prevent="performLogin" class="btn btn-info form-control"> Login </button>
        </div>
      </form>
      <!-- <circle-spin v-show="isloading"></circle-spin> -->
    </div>
  </div>
</template>

<script>

export default {
   name: "login",
    data() {
        return{
            email: '',
            password: '',
            error: '',
        }
    }, 
    methods:{
      performLogin(){
        this.$store.dispatch('performLoginAction',{
          email: this.email,
          password: this.password,
        })
        .then( res => {
          console.log("result " , res);
            this.$router.push({ name: 'Profile' })
          })
        .catch(err => {
          this.error = "There Was Error During Loggin :(";
          console.log("Error " +err.message);
        })

      }
    }
};
</script>
