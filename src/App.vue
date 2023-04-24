<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { AuthStore } from '@/stores/auth.js';

const auth = AuthStore();
// console.log(auth.checkAuthState());

function logout(){
  auth.clear();
}
</script>

<template>
  <RouterView />
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="logo4.svg" width="35" height="35"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
          <li v-if="!auth.checkAuthState()" class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
        </ul>
        <template v-if="auth.checkAuthState()">
          <span class="navbar-text">
             Bem vindo(a), {{ auth.user }} <a class="logout" v-on:click="logout" href="#">Logout</a>
          </span>
        </template>
        <template v-else>
          <span></span>
        </template>
      </div>
    </div>
  </nav>
</template>

<style>
.logout{
  margin-left:10px;
}
</style>
