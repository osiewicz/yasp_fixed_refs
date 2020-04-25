<template>
  <v-layout>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <template v-if="!routeTag">
          <v-flex xs12 md6 lg3 v-for="(note, n) in notes" :key="n">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    note.title
                  }}</v-list-item-title>
                  <div
                    style="whiteSpace: nowrap; overflow: hidden; textOverflow: ellipsis"
                    class="overline mb-2"
                  >
                    <span>Created: {{ note.whenCreated }} </span>
                    <span>Edited: {{ note.whenEdited }}</span>
                  </div>
                  <div>
                    <v-chip
                      class="mb-3 ml-1"
                      v-for="(tag, r) in getTwoTags(note.tags)"
                      :key="'R' + r"
                      color="orange"
                    >
                      &nbsp; <v-icon left>label</v-icon
                      ><span
                        style="max-width: 10ch; overflow: hidden; textOverflow: ellipsis"
                        >{{ tag }}</span
                      >
                    </v-chip>
                    <v-chip
                      v-if="note.tags.length > 3"
                      class="mb-3 ml-1"
                      color="orange"
                    >
                      &nbsp; <v-icon left>label</v-icon>
                      {{ note.tags.length - 2 }} more
                    </v-chip>
                  </div>
                  <v-list-item-subtitle
                    style="-webkit-line-clamp: 3 !important"
                    >{{ note.content }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <template>
                  <v-layout align-end justify-end>
                    <v-btn text color="orange" @click.stop="viewClicked(note)"
                      >View</v-btn
                    >
                  </v-layout>
                </template>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
        <template v-if="routeTag">
          <v-flex
            xs12
            md6
            lg3
            v-for="(note, n) in groupByTags([routeTag])"
            :key="n"
          >
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    note.title
                  }}</v-list-item-title>
                  <div
                    style="whiteSpace: nowrap; overflow: hidden; textOverflow: ellipsis"
                    class="overline mb-2"
                  >
                    <span>Created: {{ note.whenCreated }} </span>
                    <span>Edited: {{ note.whenEdited }}</span>
                  </div>
                  <div>
                    <v-chip class="mb-3 ml-1" color="orange">
                      &nbsp; <v-icon left>label</v-icon
                      ><span
                        style="max-width: 10ch; overflow: hidden; textOverflow: ellipsis"
                        >{{ routeTag }}</span
                      >
                    </v-chip>
                    <v-chip
                      v-if="note.tags.length >= 2"
                      class="mb-3 ml-1"
                      color="orange"
                    >
                      &nbsp; <v-icon left>label</v-icon>
                      {{ note.tags.length - 1 }} more
                    </v-chip>
                  </div>
                  <v-list-item-subtitle
                    style="-webkit-line-clamp: 3 !important"
                    >{{ note.content }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <template>
                  <v-layout align-end justify-end>
                    <v-btn text color="orange" @click.stop="viewClicked(note)"
                      >View</v-btn
                    >
                  </v-layout>
                </template>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
        <v-dialog persistent v-model="dialog" width="100vh">
          <v-card>
            <v-card-title class="headline pb-1">
              {{ viewedNote.title }}
            </v-card-title>
            <v-card-text
              :class="
                viewedNote.whenEdited != viewedNote.whenCreated
                  ? 'overline pb-0'
                  : 'overline pb-2'
              "
            >
              Created: {{ viewedNote.whenCreated }}
            </v-card-text>
            <v-card-text
              v-if="viewedNote.whenEdited != viewedNote.whenCreated"
              class="overline pb-2"
            >
              Edited: {{ viewedNote.whenEdited }}
            </v-card-text>
            <div class="pl-2 pr-2">
              <v-chip
                class="mb-3 ml-1"
                v-for="(tag, t) in viewedNote.tags"
                :key="'T' + t"
                color="orange"
              >
                &nbsp; <v-icon left>label</v-icon>{{ tag }}
              </v-chip>
            </div>
            <v-card-text class="body-1">
              {{ viewedNote.content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Edit
              </v-btn>
              <v-btn color="red" text @click="dialog = false">
                Delete
              </v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">
                Dismiss
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Note } from "@/models/note.model";

export default Vue.extend({
  name: "Notes",

  data() {
    return {
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      viewedNote: {} as Note
    };
  },
  computed: {
    ...mapGetters(["notes", "groupByTags"]),
    routeTag() {
      return this.$route.params.tag;
    }
  },
  methods: {
    ...mapActions(["commitNote"]),
    viewClicked(note: Note) {
      // eslint-disable-next-line
      (this as any).viewedNote = note;
      // eslint-disable-next-line
      (this as any).dialog = true;
    },
    getTwoTags(tags: string[]) {
      if (tags.length > 3) {
        return tags.slice(0, 2);
      } else return tags;
    }
  }
});
</script>
