import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import PlayList from "../views/PlayList.vue";
// import login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { showNavBar: true },
  },
  {
    path: "/hot",
    name: "Hot",
    // route level code-splitting
    // this generates a separate chunk (hot.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "hot" */ "../views/Hot.vue"),
    meta: { showNavBar: true },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { showNavBar: true },
  },

  {
    path: "/playlist",
    name: "PlayList",
    component: PlayList,
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: login,
  // },
];

const router = new VueRouter({
  routes,
});

// 挂载路由守卫，验证token是否已存在
// router.beforeEach((to, from, next) => {
//   // console.log(to);
//   if (to.path === '/login') return next();
//   const tokenStr = window.localStorage.getItem('token');
//   if (!tokenStr ||tokenStr=='undefined')
//   {
//     console.log('token');
//     return next('/login');
//   } 
//   next()
// })

export default router;
