import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("../pages/404.vue"),
  },
  {
    path: "/",
    name: "minigame",
    component: () => import("../pages/minigame.vue"),
  },
  // {
  //   path: "/qa",
  //   name: "qa",
  //   component: () => import("../pages/qa.vue"),
  // },
  // {
  //   path: "/character",
  //   name: "character",
  //   component: () => import("../pages/character.vue"),
  // },
  // {
  //   path: "/booth",
  //   name: "booth",
  //   component: () => import("../pages/booth.vue"),
  // },
  // {
  //   path: "/minigame",
  //   name: "minigame",
  //   component: () => import("../pages/minigame.vue"),
  // },
  // {
  //   path: "/game",
  //   name: "game",
  //   component: () => import("../pages/game.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory('/exeminigame/'),
  routes,
});

export default router;