import { createStore } from "vuex";
import axios from 'axios'

export default createStore({
  state: {
    logedIn: localStorage.getItem('logged'),
    token: null,
    user: [],
    error: null,
    name: null,
  },
  mutations: {
    SET_Logged(state, payload){
      localStorage.setItem('logged', payload)
      this.logedIn = payload;
    },
    SET_Token(state, payload){
      this.token = payload;
    },
    SET_User(state,payload){
      this.user = payload;
    },
    SET_Error(state,payload){
      this.error = payload;
    },
  
  },
  actions: {

    createPostsAction({commit},payload){
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/posts',{
            title: payload.title,
            description: payload.description,
          })
          .then( response  => {
            console.log(response );
            commit('SET_Error', response.data.error);

            resolve(response );
          }).catch(err =>{
          console.log("err",err);
          reject(err);
        })
      });
    },
    
    
    performLoginAction({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/login',
          {
            email: payload.email,
            password: payload.password
          }
        ).then( res => {
          if(res.data.error != null){
            commit('SET_Error', res.data.error);
          }
          else {
            commit('SET_Token', res.data.token);
            commit('SET_User', res.data.data);
            commit('SET_Logged', true);
            this.state.logedIn = true;
            this.state.name = res.data.data;
            this.getters.get_User;
            localStorage.setItem('Authname', res.data.data.name);
            resolve(res);
          }
        }).catch(err =>{
          console.log("err",err);
          reject(err);
        })
      })
    },
    PerformLogoutAction({commit}){
      return new Promise((resolve, reject) => {
        axios.get('http://127.0.0.1:8000/api/logout')
        .then(res => {
          console.log("resLogout",res );
          commit('SET_Error', null);
          commit('SET_Token', null);
          commit('SET_User', null);
          commit('SET_Logged', false);
          this.state.logedIn = false;
          resolve(res);
        })
        .catch(err=>{
          console.log("err'logout",err);
          reject(err);
        })
      })
    },

    preFormRegisterAction({commit}, payload){
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/api/register',
        {
          name: payload.name, 
          email: payload.email, 
          password: payload.password, 
          
        })
        .then( res => {
          console.log("resStore",res ,res.data.msg);
        // const token = localStorage.setItem('token', this.password);
        // const user = localStorage.setItem('user', );

        if(res.data.msg !== null){
          this.error = res.data.msg;
          commit('SET_Error', res.data.msg);
          resolve(res);

        }
        else {
          commit('SET_Token', res.data.token);
          commit('SET_User', res.data);
          commit('SET_Logged', true);
          resolve(res);

        }
        })
        .catch(err =>{
          this.error = err.message
          reject(err);
        })
      })
  
  }
},
  modules: {},
  getters: {
    get_loggedIn(state){
      return state.logedIn;
    },
    get_User(state){
      console.log("get_user", state.name);
      return localStorage.getItem('Authname');
    },
  } 
});
