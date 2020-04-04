import Vue from "vue";
import Vuex from "vuex";
import { createNote, Note } from "@/models/note.model";

Vue.use(Vuex);

export const getDefaultState = () => {
  return {
    notes: []
  };
};

export default new Vuex.Store({
  state: {
    notes: [createNote(), createNote()]
  },
  actions: {
    resetNotesState({ commit }) {
      commit("resetState");
    }
  },
  mutations: {
    resetState: state => {
      Object.assign(state, getDefaultState());
    }
  },
  modules: {},
  getters: {
    notes: state => {
      return state.notes;
    },
    getNotesCount: (state, getters) => {
      return getters.notes.length;
    },
    getNoteByIndex: state => (index: number) => {
      return state.notes[index];
    }
  }
});
