<template>
    <div class="posts" id="EditPost">
        <h1>Posts</h1>
        <div class="container">
            <div class="create">
                <div class="col-md-12">
                    <input type="hidden" name="id" class="form-control" v-model="post.id">

                    <label for="" class="control-label"> Title : </label>
                    <input type="text" name="title" class="form-control" v-model="post.title">

                    <label for="" class="control-label"> Body : </label>
                    <textarea  name="body" class="form-control" v-model="post.body"></textarea>

                    <button type="submit" class="btn btn-success add" @click="submitEdit"  > Edit </button>
                    <router-link to="/posts"><button class="btn btn-primary"> Back </button></router-link>

                </div>
                
            </div>
        </div>
    </div>
</template>




<script>
import axios from "axios";


export default {
    name: "EditPost",
     data() {
        return {
            url: this.$route.params.id,
            post: {
                id: "",
                title: "",
                body: "",
            },
            error:"",
        };
    },
     mounted() {
       console.log(this.url);
       axios.get("posts/" + this.url)
            .then((PostApi)=>{
                console.log(PostApi.data.data);
                this.post.id = this.url;
                this.post.title = PostApi.data.data.head;
                this.post.body = PostApi.data.data.content;
                console.log(this.post);
            }
        );
    },
    methods:{
        submitEdit(e){
            e.preventDefault();
            this.$store.dispatch('EditPostAction',{
                id: this.url,
                title: this.post.title,
                body: this.post.body
            }).then(res=>{
                console.log("result " , res);
                this.$router.push({ name: 'Posts' });

            }).catch(err =>{
                this.error = "There Was Error During Edit Post :(";
                console.log("Error " +err.message);
            })

        }
    },
    
   
}
</script>



<style scoped>
h1{
    text-align: center;
    font-size: 60px;
}
.post{
    background-color : teal ;
    border: solid;
    margin: 10px;
    padding: 15px;
    color: cornsilk;
}
.create{
    background-color: teal;
    margin: 10px;
    padding: 15px;
    border-radius: 50px;
}
.add{
    margin: 10px;
    background-color: cornsilk;
    color: black;
}
button{
    margin: 10px;
}
label{
    margin: 10px;
}


</style>

