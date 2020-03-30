import Vue from "vue";
import Vuex from "vuex";
import { createNote } from "@/models/note.model";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [createNote(), createNote(), createNote()]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    notes: state => {
      return state.notes;
    },
    getNotesCount: (state, getters) => {
      return getters.getNotes.length;
    },
    getNoteByIndex: state => (index: number) => {
      return state.notes[index];
    }
  }
});
