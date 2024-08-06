<template>
  <div>
    <div class="flex justify-center items-center content-center">
      <form @submit.prevent="edit" class="flex flex-col">
        <label for="id" class="text-2xl p-10">Digite o id do produto</label>
        <input
          class="outline-none p-2 mb-5 bg-stone-200 rounded-lg"
          type="number"
          id="id"
          v-model.number="id"
          placeholder="Digite um id"
        />
        <label for="name" class="text-2xl">Atualize um novo nome</label>
        <input
          class="outline-none p-2 mt-5 mb-5 bg-stone-200 rounded-lg"
          type="text"
          id="name"
          v-model="obj.nome"
          placeholder="Digite um novo nome do produto"
        />
        <label for="price" class="text-2xl">Preço</label>
        <input
          class="outline-none p-2 bg-stone-200 rounded-lg"
          type="number"
          id="price"
          placeholder="Digite um preço novo"
          v-model.number="obj.preco"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const products = ref([]);

const id = ref("");
const obj = ref({
  nome: "",
  preco: 0,
});

const get = async () => {
  try {
    const req = await axios.get("http://localhost:3000/produtos");
    products.value = req.data;
  } catch (error) {
    console.log("Erro ao buscar produtos:", error.message);
  }
};
get();
const edit = async () => {
  const productId = parseInt(id.value);
  const updatedData = {
    nome: obj.value.nome,
    preco: obj.value.preco,
  };
  const verificationEdit = !products.value.some(
    (element) => element.id === productId
  );
  if (verificationEdit || updatedData.nome === "") {
    alert("Insira um id existente E/OU insira os campos");
  }

  try {
    const req = await axios.put(
      `http://localhost:3000/produtos/${productId}`,
      updatedData
    );
    console.log("Produto atualizado com sucesso:", req.data);
    await get();
  } catch (error) {
    console.log("Erro ao atualizar o produto:", error.message);
  }
};
</script>
