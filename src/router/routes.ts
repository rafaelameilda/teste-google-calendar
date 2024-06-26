import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "cadastro",
        component: () => import("pages/cadastros/CadastroBase.vue"),
        children: [
          {
            path: "/cadastro/carregamento",
            name: "carregamento",
            component: () => import("pages/cadastros/CadastroCarregamento.vue"),
            meta: {
              title: "Cadastro de Carregamento",
            },
          },
        ],
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
