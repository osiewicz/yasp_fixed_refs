import Vue from "vue";
import VueRouter from "vue-router";
import CreateNote from "../components/create/CreateNote.vue";
import Notes from "../components/notes/Notes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Notes
  },
  {
    path: "/create",
    name: "Create",
    component: CreateNote
  },
  {
    path: "/tags/:tag",
    name: "Tag",
    component: Notes
  }
  // {
  //   path: "/testComponent",
  //   name: "TestComponent",
  //   component: TestComponent
  // }
];

const router = new VueRouter({
  routes
});

export default router;
