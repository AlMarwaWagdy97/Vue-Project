<template>
  <div class="login">
    <div class="col-md-6 offset-md-3">
      <h2 class="display-4 text-center mt-5">Register Form</h2>

      <form action="">
             <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="name" name="name" class="form-control">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" name="email" class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" name="password" class="form-control">
        </div>
        <div class="form-group" style="color:red" v-if=error> {{error}}</div>
         <div class="form-group">
            <button type="submit" @click.prevent="preFormRegister" class="btn btn-info form-control"> Login </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>

export default {
   name: "Register",
   data() {
       return {
           name: '',
           email: '',
           password: '',
           error: '',
       }
   },
   methods: {
       preFormRegister(){
        this.$store.dispatch('preFormRegisterAction',{
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then( res => {
          if(res.data.error != null){
            this.error = res.data.msg;
          }
          else{
            this.$router.push({ name: 'Login' })
          }
            

        })
        .catch(err => {
            console.log(err);
          this.error = "There Was Error During Register :(";
        })
        
        console.log("regster");
      }
    }
};
</script>
