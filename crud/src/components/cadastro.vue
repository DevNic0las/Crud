<template>
  <div class="flex justify-center items-center w-screen">
    <div class="flex justify-center items-center">
      <form
        @submit.prevent="post"
        class="flex flex-col justify-center items-center mb-6 rounded-lg size-96 shadow-teal-400xl p-10"
      >
        <label for="produto" class="text-2xl">Produto</label>
        <input
          id="produto"
          type="text"
          placeholder="produto"
          v-model="data.product"
          class="max-w-min p-4 mb-12 outline-none bg-stone-200 rounded-lg"
        />
        <label for="preco" class="text-2xl">Preco</label>
        <input
          id="preco"
          type="text"
          placeholder="preço"
          v-model="data.price"
          class="max-w-min p-4 outline-none bg-stone-200 mb-12 rounded-lg"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";

const data = reactive({
  product: "",
  price: "",
});

const state = reactive({
  produtos: [],
});

const getApi = async () => {
  try {
    const req = await axios.get("http://localhost:3000/produtos");
    console.log("Dados recebidos:", req.data);
    state.produtos = req.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
  }
};

getApi();

let currentId = 40;
const idNext = () => {
  return ++currentId;
};
const post = async () => {
  try {
    const isDuplicate = state.produtos.some(
      (produto) => produto.nome.toLowerCase() === data.product.toLowerCase()
    );

    if (isDuplicate) {
      alert("Este produto já existe!");
      return;
    }

    const postData = {
      nome: data.product,
      preco: parseFloat(data.price),
      id: 0,
    };
    postData.id = idNext();
    // Envia o novo produto para a API
    const response = await axios.post(
      "http://localhost:3000/produtos",
      postData
    );

    console.log("Sucesso:", response.data);

    data.price = "";
    data.product = "";

    getApi();
  } catch (error) {
    console.log("Erro:", error.message);
  }
};
</script>
