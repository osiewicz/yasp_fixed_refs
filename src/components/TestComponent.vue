<template>
  <div>
    <div v-for="note in notess" :key="note.id">
      <span>Note</span><br />
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
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "TestComponent",

  data() {
    return {
      testString: 1
    };
  },
  computed: {
    getNotes() {
      return this.$store.state.notes;
    }
  }
});
</script>
