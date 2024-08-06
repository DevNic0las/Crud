import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../components/mainPage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainPage,
    },
    {
      path: "/cadastro",
      component: () => import("../components/cadastro.vue"),
    },
    {
      path: "/delete",
      component: () => import("../components/delete.vue"),
    },
    {
      path: "/edite",
      component: () => import("../components/edit.vue"),
    },
    {
      path: "/products/:id/:nome/:preco/:categoriaId",
      name: "productDetails",
      component: () => import("../../produtos/products.vue"),
      props: true,
    },
    {
      path: "/categories",
      component: () => import("../../src/components/categorias.vue"),
    },
  ],
});

export default router;
