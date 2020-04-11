import Vue from "vue";
import Vuex from "vuex";
import { Note } from "@/models/note.model";
import _ from "lodash";

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
    },
    searchInContents: state => (searchPhrase: string) => {
      return state.notes.filter(note => _.includes(note.content, searchPhrase));
    },
    searchInTitles: state => (searchPhrase: string) => {
      return state.notes.filter(note => _.includes(note.title, searchPhrase));
    },
    searchInContentsAndTitles: (state, getters) => (searchPhrase: string) => {
      return _.union(
        getters.searchInContents(searchPhrase),
        getters.searchInTitles(searchPhrase)
      );
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
    },
    editNote(state, updatedNote: Note) {
      state.notes = [
        ...state.notes.map(note =>
          note.id !== updatedNote.id ? note : { ...note, ...updatedNote }
        )
      ];
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
    },
    commitEditNote({ commit }, note: Note) {
      commit("editNote", note);
    }
  },
  modules: {}
});
