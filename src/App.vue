<template>
  <v-app>
    <v-app-bar app clipped-left color="orange">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-img
        alt="Yasp Logo"
        class="shrink mr-2 hidden-sm-and-down"
        contain
        src="./assets/yasp_logo.png"
        transition="scale-transition"
        width="80"
      />
      <v-spacer />
      <v-text-field
        :disabled="this.$route.path === '/create'"
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in itemsTop">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="'A' + i" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{
                item.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-for="(tag, i) in allTags">
          <v-list-item :key="'B' + i" link :to="'/tags/' + tag">
            <v-list-item-action>
              <v-icon>label</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{
                tag
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-if="allTags.length === 0">
          <v-list-item disabled>
            <v-list-item-action>
              <v-icon>error</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text"
                >There are no tags yet!</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-for="(item, i) in itemsBottom">
          <v-divider v-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="'C' + i" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{
                item.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        <v-row justify="center" align="center">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { JsonBinApi } from "./JsonBinApi";

export default Vue.extend({
  name: "App",
  components: {},

  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      itemsTop: [
        { icon: "add", text: "Create new note", link: "/create" },
        { icon: "lightbulb_outline", text: "Notes", link: "/" },
        { divider: true },
        { heading: "Notes by tags:" }
      ],
      itemsBottom: [
        { divider: true },
        { icon: "settings", text: "Settings" },
        { icon: "help", text: "About Yasp" }
      ]
    };
  },
  methods: {
    ...mapActions(["commitMultipleNotes"])
  },
  computed: {
    ...mapGetters(["allTags"])
  },
  async mounted() {
    //this.commitMultipleNotes([]);
    const notesId = await JsonBinApi.getNotes();
    //TODO handle req
    if (notesId.success === true) {
      const notes = await Promise.all(
        notesId.records.map(async (noteId: string) => {
          const result = await JsonBinApi.readNote(noteId.id);
          return result.payload;
        })
      );

      this.commitMultipleNotes(notes);
    }
  }
});
</script>
