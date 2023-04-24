<template>
    <div id="container">
        <main class="form-signin" id="form">
            <form v-on:submit.prevent="login">
                <img class="mb-4" src="logo4.svg" alt="" height="75" width="75">
                
                <h1 class="h3 mb-3 fw-normal">Login</h1>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="user.email">
                    <label for="floatingInput">Email address</label>
                </div>
                <br>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password">
                    <label for="floatingPassword">Password</label>
                </div>
                <br>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted">© 2023</p>
            </form>
        </main>
    </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
import http from '@/services/apiCall.js';
import {AuthStore} from '@/stores/auth.js';
import router from '@/router/index.js';

const auth = AuthStore();

const user = reactive({
    email: '',
    password: ''
});

function hasEmail(){
    if(user.email!==''){
        return true;
    }
    else{
        return false;
    }
}

async function login(){
    try {
    const {data} = await http.post('/auth/login', user);
    console.log(data);

    auth.setToken(data.access_token);
    auth.setUser(data.user.name);
    router.push('/');
  } catch (error) {
    console.log(error?.response?.data);
  }
}

function getLoggedUser(){
    let user = auth.getLoggedUser();
}
</script>

<style scoped>
#container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#form{
    text-align: center;
    width:20vw;
}

.btn{
    background-color: #4DBA87!important;
    border-color: transparent;
}

.form-control{
    border: var(--bs-border-width) solid #4DBA87!important;
}
</style>