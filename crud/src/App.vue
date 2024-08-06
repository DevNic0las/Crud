<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="p-5">
    <div class="text-2xl flex justify-evenly p-10">
      <ul class="flex">
        <li class="mr-10">
          <RouterLink :to="{ path: '/' }">VOLTAR</RouterLink>
        </li>
        <li class="mr-10">
          <RouterLink :to="{ path: '/cadastro' }"> Cadastro </RouterLink>
        </li>
        <li class="mr-10">
          <RouterLink :to="{ path: '/delete' }">Delete</RouterLink>
        </li>
        <li class="mr-10">
          <RouterLink :to="{ path: '/edite' }">Edit</RouterLink>
        </li>
        <li class="mr-10">
          <RouterLink :to="{ path: '/categories' }">Categorias</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <div>
    <RouterView />
  </div>
</template>
