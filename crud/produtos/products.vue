<template>
  <div class="text-4xl flex justify-center flex-col items-center p-4">
    <h1 class="mb-12">Detalhes do Produto</h1>
    <p>ID do Produto: {{ id }}</p>
    <p class="m-7">Nome do Produto: {{ nome }}</p>
    <p c>Categoria id: {{ categoriaId }}</p>
  </div>
</template>

<script setup>
// Define as props que o componente recebe
const props = defineProps(["id", "nome", "preco", "categoriaId"]);
</script>
