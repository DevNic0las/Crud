<template>
  <h1 class="text-4xl text-center mt-24">Cadastre uma categoria</h1>
  <div class="flex flex-col">
    <form
      @submit.prevent="postCategories"
      class="flex flex-col justify-center items-center"
    >
      <input
        type="text"
        v-model="categories.nome"
        placeholder="Nome da categoria"
        required
        class="p-2 text-2xl mt-10 bg-stone-200 rounded-lg outline-none"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-10"
      >
        Enviar
      </button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";

let currentId = 4;

const nextID = () => {
  return ++currentId;
};

const categories = reactive({
  nome: "",
  id: 0,
});

const categoriesApi = ref([]);

// Função para buscar categorias
const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/categorias");
    categoriesApi.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error.message);
  }
};

const postCategories = async () => {
  categories.id = nextID();

  const exist = categoriesApi.value.some(
    (element) => element.nome.toLowerCase() === categories.nome.toLowerCase()
  );

  if (exist) {
    alert("Categoria existente");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/categorias",
      categories
    );
    console.log("Categoria criada com sucesso:", response.data);

    categories.nome = "";

    await getCategories();
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
  }
};

onMounted(() => {
  getCategories();
});
</script>
