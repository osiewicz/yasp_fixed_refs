<template>
  <div>
    <div>
      Note id:
      <input style="border: 1px solid black; margin: 5px" v-model="id" /><br />
      Edit content:
      <input style="border: 1px solid black; margin: 5px" v-model="content" />
      Edit tags:
      <input
        style="border: 1px solid black; margin: 5px"
        v-model="tags"
      /><br />
      <button
        style="border: 1px solid black; margin: 5px; padding: 5px"
        v-on:click="commitDeleteNote(id)"
      >
        Delete Note with id from input
      </button>
      <button
        style="border: 1px solid black; margin: 5px; padding: 5px"
        v-on:click="editNoteContent(id, content)"
      >
        Edit Note content
      </button>
      <button
        style="border: 1px solid black; margin: 5px; padding: 5px"
        v-on:click="editNoteTags(id, tags)"
      >
        Edit Note tags
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
      <span>Content: {{ note.content }}</span
      ><br />
      <span>Tags: {{ note.tags }}</span
      ><br />
      <span>When created: {{ note.whenCreated }}</span
      ><br />
      <span>When edited: {{ note.whenEdited }}</span
      ><br /><br />
    </div>
    <div>
      Search phrase:
      <input
        style="border: 1px solid black; margin: 5px"
        v-model="searchPhrase"
      /><br />
      <button
        style="border: 1px solid black; margin: 5px; padding: 5px"
        v-on:click="searchNotes(searchPhrase)"
      >
        Search in content and titles</button
      ><br />
      <div v-for="note in searchResult" :key="note.id">
        <span>Note</span><br />
        <span>Id: {{ note.id }}</span
        ><br />
        <span>Title: {{ note.title }}</span
        ><br />
        <span>Content: {{ note.content }}</span
        ><br />
        <span>Tags: {{ note.tags }}</span
        ><br />
        <span>When created: {{ note.whenCreated }}</span
        ><br />
        <span>When edited: {{ note.whenEdited }}</span
        ><br /><br />
      </div>
    </div>
    <div>
      Group By Tags:
      <input
        style="border: 1px solid black; margin: 5px"
        v-model="groupTags"
      /><br />
      <button
        style="border: 1px solid black; margin: 5px; padding: 5px"
        v-on:click="getNotesByTags(groupTags)"
      >
        Group by tags given (note must contain at least one tag given)</button
      ><button
        style="border: 1px solid black; margin: 5px; padding: 5px"
        v-on:click="getNotesByTagsStrict(groupTags)"
      >
        Group by tags STRICT (note must contain all of tags given)</button
      ><br />
      <div v-for="note in groupResults" :key="note.id">
        <span>Note</span><br />
        <span>Id: {{ note.id }}</span
        ><br />
        <span>Title: {{ note.title }}</span
        ><br />
        <span>Content: {{ note.content }}</span
        ><br />
        <span>Tags: {{ note.tags }}</span
        ><br />
        <span>When created: {{ note.whenCreated }}</span
        ><br />
        <span>When edited: {{ note.whenEdited }}</span
        ><br /><br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { createNote } from "../models/note.model";
import { JsonBinApi } from "../JsonBinApi";
export default Vue.extend({
  name: "TestComponent",

  data() {
    return {
      id: "",
      content: "",
      tags: "",
      searchPhrase: "",
      searchResult: [],
      groupTags: "",
      groupResults: []
    };
  },
  computed: {
    ...mapGetters([
      "notes",
      "getNotesCount",
      "getNoteByIndex",
      "getNoteById",
      "searchInContents",
      "searchInTitles",
      "searchInContentsAndTitles",
      "groupByTags",
      "groupByTagsStrict"
    ])
  },
  methods: {
    ...mapActions([
      "resetNotesState",
      "commitNote",
      "commitMultipleNotes",
      "commitDeleteNote",
      "commitEditNote"
    ]),
    getNoteByIndexNumber(index: number) {
      console.log(this.getNoteByIndex(index));
    },
    createNote() {
      return createNote();
    },
    editNoteContent(id: string, content: string) {
      const editableNote = this.getNoteById(id);
      if (editableNote) {
        editableNote.content = content;
        this.commitEditNote(editableNote);
      } else console.log("There is no note with given id");
    },
    editNoteTags(id: string, tags: string) {
      const editableNote = this.getNoteById(id);
      if (editableNote) {
        editableNote.tags = tags.split(",");
        this.commitEditNote(editableNote);
      } else console.log("There is no note with given id");
    },
    searchNotes(phrase: string) {
      this.searchResult = this.searchInContentsAndTitles(phrase);
    },
    getNotesByTags(tags: string) {
      this.groupResults = this.groupByTags(tags.split(","));
    },
    getNotesByTagsStrict(tags: string) {
      this.groupResults = this.groupByTagsStrict(tags.split(","));
    }
  }
});

// (async () => {
//   const dupa = await JsonBinApi.getNotes();
//   console.log(dupa);
// })();
</script>
