<template>
  <v-container fluid>
    <v-layout>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md6 lg3 v-for="(note, n) in notes" :key="n">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ note.tags }}</div>
                  <v-list-item-title class="headline mb-1">{{
                    note.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    note.content
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn text>Edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "Notes",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["notes"])
  },
  methods: {
    ...mapActions(["commitNote"])
  }
});
</script>
