import Vue from "vue";
import Vuex from "vuex";
import { Note } from "@/models/note.model";

Vue.use(Vuex);

export const getDefaultState = () => {
  return {
    notes: Array<Note>()
  };
};

export default new Vuex.Store({
  state: {
    notes: Array<Note>()
  },
  getters: {
    notes: state => {
      return state.notes;
    },
    getNotesCount: (state, getters) => {
      return getters.notes.length;
    },
    getNoteByIndex: state => (index: number) => {
      return state.notes[index];
    },
    getNoteById: state => (id: string) => {
      return state.notes.find(note => note.id === id);
    }
  },
  mutations: {
    resetState: state => {
      Object.assign(state, getDefaultState());
    },
    addNote(state, note: Note) {
      state.notes.push(note);
    },
    addMultipleNotes(state, notes: Note[]) {
      state.notes = state.notes.concat(notes);
    },
    deleteNote(state, noteId: string) {
      state.notes.splice(
        state.notes.findIndex(note => note.id === noteId),
        1
      );
    }
  },
  actions: {
    resetNotesState({ commit }) {
      commit("resetState");
    },
    commitNote({ commit }, note: Note) {
      commit("addNote", note);
    },
    commitMultipleNotes({ commit }, notes: Note[]) {
      commit("addMultipleNotes", notes);
    },
    commitDeleteNote({ commit }, noteId: string) {
      commit("deleteNote", noteId);
    }
  },
  modules: {}
});
