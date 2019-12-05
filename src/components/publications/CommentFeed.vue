<template>
  <div id="commentFeed">
    <v-tabs centered color="lighten-1" icons-and-text>
      <v-tabs-slider color="black"></v-tabs-slider>

      <v-tab
        xs4
        v-for="(tab, index) in tabs"
        :key="index"
        :href="`#${tab.name}`"
        :data-tab="tab.name"
        v-on:click="handleTabClick(tab.name)"
      >
        {{tab.label}}
        <v-icon>{{tab.icon}}</v-icon>
      </v-tab>

      <v-tab-item v-for="(tab, index) in tabs" :key="index" :value="tab.name">
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 v-for="(comment, i) in comments[tab.name]" :key="i">
                <v-card color="darken-2" class="black--text">
                  <v-layout row wrap>
                    <v-flex xs12 sm10>
                      <v-list-tile-content class="pa-3">
                        <h4 class="commenter-name">{{ comment.commenter.name }}</h4>
                        <div class="heading">
                          <p>{{comment.content}}</p>
                        </div>
                      </v-list-tile-content>
                    </v-flex>

                    <v-flex xs12 sm2 pl-3 class="control-icons">
                      <v-btn
                        flat
                        icon
                        color="blue"
                        v-if="tab.name === 'pending'"
                        v-on:click="approveComment(comment.id)"
                        dark
                        title="Accept"
                      >
                        <v-icon>check_circle</v-icon>
                      </v-btn>

                      <v-menu
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                        :ref="'menuPending' + i"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            flat
                            icon
                            v-if="tab.name !== 'declined' && tab.name !== 'editorspick' && tab.name !== 'approved'"
                            color="red"
                            dark
                            title="Decline"
                            v-on="on"
                          >
                            <v-icon>block</v-icon>
                          </v-btn>
                        </template>

                        <v-card class="card-width">
                          <v-card-text>
                            <v-list>
                              <v-list-tile>
                                <v-list-tile-content>
                                  <v-list-tile-title>Rejection Reason</v-list-tile-title>
                                  <v-list-tile-sub-title>Please select the reason for rejection.</v-list-tile-sub-title>
                                </v-list-tile-content>
                              </v-list-tile>
                            </v-list>

                            <v-divider></v-divider>

                            <v-list>
                              <v-list-tile>
                                <v-list-tile-action>
                                  <v-radio-group v-model="radios" row :mandatory="true">
                                    <v-radio class="v-radio" color="red" label="Spam" value="0"></v-radio>
                                    <v-radio class="v-radio" color="red" label="No-Value" value="1"></v-radio>
                                    <v-radio
                                      class="v-radio"
                                      color="red"
                                      label="Offensive"
                                      value="2"
                                    ></v-radio>
                                    <v-radio
                                      class="v-radio"
                                      color="red"
                                      label="Irrelavant"
                                      value="3"
                                    ></v-radio>
                                    <v-radio
                                      class="v-radio"
                                      color="red"
                                      label="Whataboutery"
                                      value="5"
                                    ></v-radio>
                                    <v-radio class="v-radio" color="red" label="Others" value="4"></v-radio>
                                    <v-text-field
                                      :disabled="!othersSelected"
                                      class="text-field"
                                      v-model="note"
                                      label="Specify reason if others"
                                    ></v-text-field>
                                  </v-radio-group>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>

                            <v-card-actions>
                              <v-spacer></v-spacer>

                              <v-btn flat @click="onCancel('Pending', i)">Cancel</v-btn>
                              <v-btn
                                :disabled="!isFormValid"
                                color="red"
                                flat
                                @click="onCancel('Pending', i), declineComment(comment.id)"
                              >Reject</v-btn>
                            </v-card-actions>
                          </v-card-text>
                        </v-card>
                      </v-menu>

                      <v-btn
                        flat
                        icon
                        color="orange"
                        v-if="tab.name === 'approved' && comment.editors_pick"
                        v-on:click="unpickComment(comment.id)"
                        dark
                        title="UnPick"
                      >
                        <v-icon>star</v-icon>
                      </v-btn>

                      <v-btn
                        flat
                        icon
                        color="grey"
                        v-if="tab.name === 'approved' && !comment.editors_pick"
                        v-on:click="pickComment(comment.id)"
                        dark
                        title="Pick"
                      >
                        <v-icon>star</v-icon>
                      </v-btn>

                      <v-menu
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                        :ref="'menuApproved' + i"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            flat
                            icon
                            v-if="tab.name !== 'declined' && tab.name !== 'editorspick' && tab.name !== 'pending'"
                            color="red"
                            dark
                            title="Decline"
                            v-on="on"
                          >
                            <v-icon>block</v-icon>
                          </v-btn>
                        </template>

                        <v-card class="card-width">
                          <v-card-text>
                            <v-list>
                              <v-list-tile>
                                <v-list-tile-content>
                                  <v-list-tile-title>Rejection Reason</v-list-tile-title>
                                  <v-list-tile-sub-title>Please select the reason for rejection.</v-list-tile-sub-title>
                                </v-list-tile-content>
                              </v-list-tile>
                            </v-list>

                            <v-divider></v-divider>

                            <v-list>
                              <v-list-tile>
                                <v-list-tile-action>
                                  <v-radio-group v-model="radios" row :mandatory="true">
                                    <v-radio class="v-radio" color="red" label="Spam" value="0"></v-radio>
                                    <v-radio class="v-radio" color="red" label="No-Value" value="1"></v-radio>
                                    <v-radio
                                      class="v-radio"
                                      color="red"
                                      label="Offensive"
                                      value="2"
                                    ></v-radio>
                                    <v-radio
                                      class="v-radio"
                                      color="red"
                                      label="Irrelavant"
                                      value="3"
                                    ></v-radio>
                                    <v-radio
                                      class="v-radio"
                                      color="red"
                                      label="Whataboutery"
                                      value="5"
                                    ></v-radio>
                                    <v-radio class="v-radio" color="red" label="Others" value="4"></v-radio>
                                    <v-text-field
                                      :disabled="!othersSelected"
                                      class="text-field"
                                      v-model="note"
                                      label="Specify reason if others"
                                    ></v-text-field>
                                  </v-radio-group>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>

                            <v-card-actions>
                              <v-spacer></v-spacer>

                              <v-btn flat @click="onCancel('Approved', i)">Cancel</v-btn>
                              <v-btn
                                :disabled="!isFormValid"
                                color="red"
                                flat
                                @click="onCancel('Approved', i), declineApproveComment(comment.id)"
                              >Reject</v-btn>
                            </v-card-actions>
                          </v-card-text>
                        </v-card>
                      </v-menu>

                      <v-btn
                        flat
                        icon
                        color="orange"
                        v-if="tab.name === 'editorspick'"
                        v-on:click="unpickComment(comment.id)"
                        dark
                        title="UnPick"
                      >
                        <v-icon>star</v-icon>
                      </v-btn>

                      <v-btn
                        flat
                        icon
                        color="blue"
                        v-if="tab.name === 'declined'"
                        v-on:click="approveDeclinedComment(comment.id)"
                        dark
                        title="Accept"
                      >
                        <v-icon>check_circle</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import $apiClient from "../../api";

export default {
  name: "CommentFeed",
  data: () => {
    return {
      activeTab: "pending",
      radios: "",
      note: "",
      row: null,
      comments: {
        pending: [],
        approved: [],
        editorspick: [],
        declined: []
      },
      baseUrl: "",
      tabs: [
        { name: "pending", label: "Pending", icon: "local_parking" },
        { name: "approved", label: "Approved", icon: "verified_user" },
        { name: "editorspick", label: "Featured", icon: "star" },
        { name: "declined", label: "Declined", icon: "block" }
      ],
      statuses: {
        pending: 0,
        approved: 1,
        declined: 2,
        editorspick: 3
      }
    };
  },
  beforeMount() {
    this.getPendingComments(this.$route.params.asset_id);
    this.getApprovedComments(this.$route.params.asset_id);
    this.getEditorspickComments(this.$route.params.asset_id);
    this.getDeclinedComments(this.$route.params.asset_id);
  },
  computed: {
    isFormValid() {
      return this.radios;
    },
    othersSelected() {
      return this.radios === "4";
    }
  },
  mounted() {
    let { publication_id, asset_id, status } = this.$route.params;
    this.baseUrl = `/publication/${publication_id}/${asset_id}`;
    if (status) {
      this.activateTab(status);
    } else {
      this.$router.push(`${this.baseUrl}/status/pending`);
    }
  },
  methods: {
    activateTab(status) {
      let tab = document.querySelector(`div[data-tab='${status}'] a`);
      tab.click();
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleTabClick(tabName) {
      this.$router.push(`${this.baseUrl}/status/${tabName}`);
      this[`get${this.capitalize(tabName)}Comments`](
        this.$route.params.asset_id
      );
    },
    approveComment(commentId) {
      $apiClient.approveComment(commentId).then(response => {
        if (response.status == 200) {
          this.comments.pending = this.comments.pending.filter(
            comment => comment.id !== commentId
          );
        }
      });
    },
    declineComment(commentId) {
      const data = { reason: Number(this.radios), note: this.note };
      $apiClient.declineComment(commentId, data).then(response => {
        if (response.status == 200) {
          this.comments.pending = this.comments.pending.filter(
            comment => comment.id !== commentId
          );
        }
      });
    },
    pickComment(commentId) {
      $apiClient.pickComment(commentId, true).then(response => {
        if (response.status == 200) {
          let commentIndex = this.comments.approved.findIndex(
            comment => comment.id === commentId
          );
          let comment = this.comments.approved[commentIndex];
          this.comments.editorspick.push(comment);
          this.comments.approved[commentIndex].editors_pick = true;
        }
      });
    },
    unpickComment(commentId) {
      $apiClient.pickComment(commentId, false).then(response => {
        if (response.status == 200) {
          let commentIndex = this.comments.approved.findIndex(
            comment => comment.id === commentId
          );
          this.comments.editorspick = this.comments.editorspick.filter(
            comment => comment.id !== commentId
          );
          this.comments.approved[commentIndex].editors_pick = false;
        }
      });
    },
    approveDeclinedComment(commentId) {
      $apiClient.approveDeclinedComment(commentId).then(response => {
        if (response.status == 200) {
          this.comments.declined = this.comments.declined.filter(
            comment => comment.id !== commentId
          );
        }
      });
    },
    declineApproveComment(commentId) {
      const data = { reason: Number(this.radios), note: this.note };
      $apiClient.declineApproveComment(commentId, data).then(response => {
        if (response.status == 200) {
          this.comments.approved = this.comments.declined.filter(
            comment => comment.id !== commentId
          );
        }
      });
    },

    getPendingComments(asset_id) {
      $apiClient.getPendingComments(asset_id).then(response => {
        this.comments.pending = response.data;
      });
    },
    getApprovedComments(asset_id) {
      $apiClient.getApprovedComments(asset_id).then(response => {
        this.comments.approved = response.data;
      });
    },
    getEditorspickComments(asset_id) {
      $apiClient.getEditorspickComments(asset_id).then(response => {
        this.comments.editorspick = response.data;
      });
    },
    getDeclinedComments(asset_id) {
      $apiClient.getDeclinedComments(asset_id).then(response => {
        this.comments.declined = response.data;
      });
    },
    onCancel(text, i) {
      this.$refs["menu" + text + i][0].isActive = false;
    }
  }
};
</script>

<style scoped>
.card-width {
  width: 665px;
}
.text-field {
  padding: 15px;
  margin: 0px;
}
</style>
