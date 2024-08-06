<template>
  <h1 class="text-4xl text-center mb-20">Delete um produto</h1>
  <div>
    <form
      @submit.prevent="del"
      class="flex flex-col justify-center items-center"
    >
      <input
        type="number"
        v-model.number="id"
        placeholder="Digite o ID"
        class="p-2 bg-stone-200 rounded-lg outline-none"
      />
      <button
        type="submit"
        class="mt-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Deletar
      </button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref } from "vue";

const id = ref("");

const del = async () => {
  try {
    const delApi = ref([]);
    const getApi = async () => {
      const req = await axios.get("http://localhost:3000/produtos");
      console.log("Dados recebidos:", req.data);
      delApi.value = req.data;

      console.error("Erro ao buscar produtos:", error.message);
    };
    const getId = parseInt(id.value);

    const verificationId = !delApi.value.some(
      (element) => element.id === getId
    );

    if (isNaN(getId) || verificationId) {
      alert("id invalido");
      return;
    }

    const response = await axios.delete(
      `http://localhost:3000/produtos/${getId}`
    );

    console.log(`Sucesso, número ${getId} deletado`);
    console.log("Resposta do servidor:", response.data);
  } catch (error) {
    // Exibe o erro no console
    console.log("Erro ao deletar:", error.message);
  }
};
</script>
