<template>
  <div class="text-2xl flex flex-col">
    <div class="mt-52">
      <h1 class="text-5xl mb-24 text-center">Lista de Produtos</h1>
      <input
        type="search"
        placeholder="Procurar"
        v-model="search"
        class="p-4 rounded-full bg-stone-200 w-full flex text-center outline-none"
      />
      <div class="flex justify-end content-end">
        <select
          v-model="selectedCategory"
          class="max-w-min p-4 rounded-full bg-stone-200 mt-12 flex"
        >
          <option value="">Todas as Categorias</option>
          <option
            v-for="category in state.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.nome }}
          </option>
        </select>
      </div>
      <ul>
        <li
          v-for="produto in filteredProducts"
          :key="produto.id"
          class="mt-12 p-3 w-full bg-stone-200 "
        >
          <RouterLink
            :to="{
              name: 'productDetails',
              params: {
                id: produto.id,
                nome: `${produto.nome}`,
                preco: `${produto.preco}`,
                categoriaId: `${produto.categoriaId}`,
              },
            }"
          >
            PRODUTO:<br />
            {{ produto.nome }} <br />
            ID: {{ produto.id }} <br />
            CategoriaId: {{ produto.categoriaId }} <br />
            Preço: {{ produto.preco }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted, ref, computed } from "vue";

const state = reactive({
  produtos: [],
  categories: [],
});

const search = ref("");
const selectedCategory = ref("");

// Função para buscar categorias da API
const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/categorias");
    state.categories = response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error.message);
  }
};

// Função para buscar produtos da API
const getApi = async () => {
  try {
    const req = await axios.get("http://localhost:3000/produtos");
    console.log("Dados recebidos:", req.data);
    state.produtos = req.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
  }
};

onMounted(() => {
  getApi();
  getCategories();
});

const filteredProducts = computed(() => {
  const searchValue = search.value.toLowerCase();
  const selectedCategoryId = parseInt(selectedCategory.value);

  return state.produtos.filter((produto) => {
    const matchesSearch =
      produto.nome && produto.nome.toLowerCase().startsWith(searchValue);
    const matchesCategory =
      !selectedCategoryId || produto.categoriaId === selectedCategoryId;

    return matchesSearch && matchesCategory;
  });
});
</script>
