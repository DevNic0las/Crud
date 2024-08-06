<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="p-5" >
    <div class="text-2xl flex flex-row justify-evenly" >
      <RouterLink :to="{ path: '/' }">VOLTAR</RouterLink>
      <RouterLink :to="{ path: '/cadastro' }"> Cadastro </RouterLink>
      <RouterLink :to="{ path: '/delete' }">Delete</RouterLink>
      <RouterLink :to="{ path: '/edite' }">Edit</RouterLink>
      <RouterView />
    </div>
  </nav>
</template>
