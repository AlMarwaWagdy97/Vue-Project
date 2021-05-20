<template>
    <div class="posts">
        <h1>Posts</h1>
        <div class="container">
            <div class="create">
                <div class="col-md-12">
                    <label for="" class="control-label"> Title : </label>
                    <input type="text" name="title" class="form-control" v-model="postFormData.title">

                    <label for="" class="control-label"> Body : </label>
                    <textarea  name="body" class="form-control" v-model="postFormData.body"></textarea>

                    <button type="submit" class="btn btn-success add"   @click="submitForm" > ADD </button>
                </div>
                
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-8 " v-for="(post) in postsdata" :key="post.key">
                    <div class="post">
                        <h3>Title : {{post.head}} </h3>
                        <p> content : {{post.content}} </p>
                        <router-link :to="`/post/${post.key}`"><button class="btn btn-primary"> Edit</button></router-link>
                        <button class="btn btn-danger"  @click="DeletePost(post.key)">Delete</button>
                    </div>                
                </div>
            </div>
           
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";


export default {
    name: "Posts", 
    data(){
        return{
            postFormData: {
                title: null,
                body: null,
            }, 
            error: "",
        }
    },

    mounted(){
        this.$store.dispatch('Get_PostsAction');
    },
  methods: {
        submitForm(e){
            e.preventDefault();
            let title1 = this.postFormData.title;
            let body1 = this.postFormData.body;
            this.$store.dispatch('CreatPostAction', {
                title : title1,
                body : body1,
            }).then( res => {
                console.log("result " , res);
                this.postFormData.title = "";
                this.postFormData.body = "";
                this.$router.push({ name: 'Posts' });
            })
            .catch(err => {
            this.error = "There Was Error During create Post :(";
            console.log("Error " +err.message);
            })
        },

        DeletePost(id){
            this.$store.dispatch('DeletePostAction',{ 
                id: id ,
            }).then(res=>{
                console.log(res);
                this.$router.push({ name: 'Posts' });
            })
        
        }
       
    },
    computed: {
        ...mapState(["postsdata"]),
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

