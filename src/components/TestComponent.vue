<template>
  <div>
    <div>
      <input style="border: 1px solid black; margin: 5px" v-model="id" /><br />
      <button
        style="border: 1px solid black; margin: 5px; padding: 5px"
        v-on:click="commitDeleteNote(id)"
      >
        Delete Note with id from input
      </button>
    </div>
    <button
      style="border: 1px solid black; margin: 5px; padding: 5px"
      v-on:click="commitNote(createNote())"
    >
      Add note
    </button>
    <button
      style="border: 1px solid black; margin: 5px; padding: 5px"
      v-on:click="commitMultipleNotes([createNote(), createNote()])"
    >
      Add 2 notes at once
    </button>
    <button
      style="border: 1px solid black; margin: 5px; padding: 5px"
      v-on:click="getNoteByIndexNumber(1)"
    >
      Get note by index = 1
    </button>
    <button
      style="border: 1px solid black; margin: 5px; padding: 5px"
      v-on:click="resetNotesState"
    >
      Reset notes state
    </button>
    <br />
    <span style="margin: 5px">Notes count: {{ getNotesCount }}</span>
    <div v-for="note in notes" :key="note.id">
      <span>Note</span><br />
      <span>Id: {{ note.id }}</span
      ><br />
      <span>Title: {{ note.title }}</span
      ><br />
      <span>Content :{{ note.content }}</span
      ><br />
      <span>Tags: {{ note.tags }}</span
      ><br />
      <span>When created: {{ note.whenCreated }}</span
      ><br />
      <span>When edited: {{ note.whenEdited }}</span
      ><br /><br />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { createNote } from "../models/note.model";

export default Vue.extend({
  name: "TestComponent",

  data() {
    return {
      id: ""
    };
  },
  computed: {
    ...mapGetters(["notes", "getNotesCount", "getNoteByIndex"])
  },
  methods: {
    ...mapActions([
      "resetNotesState",
      "commitNote",
      "commitMultipleNotes",
      "commitDeleteNote"
    ]),
    getNoteByIndexNumber(index: number) {
      console.log(this.getNoteByIndex(index));
    },
    createNote() {
      return createNote();
    }
  }
});
</script>
