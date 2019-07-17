<template>
  <div id="commentFeed">
    <v-tabs
      centered
      color="lighten-1"
      icons-and-text
    > 
       <v-tabs-slider color="black"></v-tabs-slider>

      <v-tab xs4 
        v-for="(tab, index) in tabs"
        :key="index"
        :href="`#${tab.name}`"
        :data-tab="tab.name"
        v-on:click="handleTabClick(tab.name)"
      >
        {{tab.label}}
        <v-icon>{{tab.icon}}</v-icon>
      </v-tab>

      <v-tab-item

        v-for="(tab, index) in tabs"
        :key="index"
        :value="tab.name"
      >
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12 v-for="(comment, i) in comments[tab.name]" :key="i">
                <v-card 
                  color="darken-2" class="black--text">
                  <v-layout row wrap>
                  <v-flex xs12 sm10>
                    <v-list-tile-content class="pa-3">
                      <h4 class="commenter-name">
                        {{ comment.commenter.name }}
                      </h4>
                      <div class="heading">
                        <p>{{comment.content}}</p>
                      </div>
                    </v-list-tile-content>
                  </v-flex>
    
                  <v-flex xs12 sm2 pl-3 class="control-icons">
                    <v-btn flat icon color="blue"
                      v-if="tab.name === 'pending'"
                      v-on:click="approveComment(comment.id)"
                      dark title="Accept"
                    >
                      <v-icon>check_circle</v-icon>
                    </v-btn>

                    <v-btn flat icon color="red"
                      v-if="tab.name !== 'declined' && tab.name !== 'editorspick' && tab.name !== 'approved'"
                      v-on:click="declineComment(comment.id)"
                      dark title="Decline"
                    >
                      <v-icon>block</v-icon>
                    </v-btn>

                    <v-btn flat icon color="orange"
                      v-if="tab.name === 'approved' && comment.editors_pick"
                      v-on:click="unpickComment(comment.id)"
                      dark title="UnPick"
                    >
                      <v-icon>star</v-icon>
                    </v-btn>

                    <v-btn flat icon color="grey"
                      v-if="tab.name === 'approved' && !comment.editors_pick"
                      v-on:click="pickComment(comment.id)"
                      dark title="Pick"
                    >
                      <v-icon>star</v-icon>
                    </v-btn>

                    <v-btn flat icon color="orange"
                      v-if="tab.name === 'editorspick'"
                      v-on:click="unpickComment(comment.id)"
                      dark title="UnPick"
                    >
                      <v-icon>star</v-icon>
                    </v-btn>

                    <v-btn flat icon color="red"
                      v-if="tab.name === 'declined'"
                      v-on:click="revertDeclinedComment(comment.id)"
                      dark title="Revert"
                    >
                      <v-icon>undo</v-icon>
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
import $apiClient from '../../api';

export default {
  name: 'CommentFeed',
  data: () => {
    return {
      activeTab: 'pending',
      comments: {
        pending: [],
        approved: [],
        editorspick: [],
        declined: []
      },
      baseUrl: '',
      tabs: [
        {name: 'pending', label: 'Pending', icon: 'local_parking'},
        {name: 'approved', label: 'Approved', icon: 'verified_user'},
        {name: 'editorspick', label: 'Editors Pick', icon: 'star'},
        {name: 'declined', label: 'Declined', icon: 'block'}
      ],
      statuses: {
        pending: 0,
        approved: 1,
        declined: 2,
        editorspick: 3
      }
    }
  },
  beforeMount () {
    this.getPendingComments(this.$route.params.asset_id)
    this.getApprovedComments(this.$route.params.asset_id)
    this.getEditorspickComments(this.$route.params.asset_id)
    this.getDeclinedComments(this.$route.params.asset_id)
  },
  mounted () {
    let {publication_id, asset_id, status} = this.$route.params
    console.log(this.$route.params);
    this.baseUrl = `/publication/${publication_id}/${asset_id}`
    if (status) {
      this.activateTab(status)
    } else {
      this.$router.push(`${this.baseUrl}/status/pending`)
    }
  },
  methods: {
    activateTab (status) {
      let tab = document.querySelector(`div[data-tab='${status}'] a`)
      tab.click()
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handleTabClick(tabName) {
      this.$router.push(`${this.baseUrl}/status/${tabName}`)
      this[`get${this.capitalize(tabName)}Comments`](this.$route.params.asset_id) 
    },
    approveComment (commentId) {
      $apiClient.approveComment(commentId).then(response => {
        if (response.status == 200 ) {
          this.comments.pending = this.comments.pending.filter(comment => comment.id !== commentId)
        }     
      })
    },
    declineComment (commentId) {
      $apiClient.declineComment(commentId).then(response => {
        if (response.status == 200) {
          this.comments.pending = this.comments.pending.filter(comment => comment.id !== commentId)
        }
      })
    },
    pickComment (commentId) {
      $apiClient.pickComment(commentId, true).then(response => {
        if (response.status == 200) {
          let commentIndex = this.comments.approved.findIndex(comment => comment.id === commentId)
          let comment = this.comments.approved[commentIndex]
          this.comments.editorspick.push(comment)
          this.comments.approved[commentIndex].editors_pick = true;
        }
      })  
    },
    unpickComment (commentId) {
     $apiClient.pickComment(commentId, false).then(response => {
       if (response.status == 200) {
         let commentIndex = this.comments.approved.findIndex(comment => comment.id === commentId)
         this.comments.editorspick = this.comments.editorspick.filter(comment => comment.id !== commentId)
         this.comments.approved[commentIndex].editors_pick = false;
       }
     })
    },
    revertDeclinedComment (commentId) {
      $apiClient.revertDeclinedComment(commentId).then(response => {
        if (response.status == 200) {
          this.comments.declined = this.comments.declined.filter(comment => comment.id !== commentId)
        }
      })
    },
    
    getPendingComments (asset_id) {
      $apiClient.getPendingComments(asset_id).then((response) => {
        this.comments.pending = response.data;
      })
    },
    getApprovedComments (asset_id) {
      $apiClient.getApprovedComments(asset_id).then((response) => {
        this.comments.approved = response.data;
      })
    },
    getEditorspickComments (asset_id) {
      $apiClient.getEditorspickComments(asset_id).then((response) => {
        this.comments.editorspick = response.data;
      })
    },
    getDeclinedComments (asset_id) {
      $apiClient.getDeclinedComments(asset_id).then((response) => {
        this.comments.declined = response.data;
      })
    }
  }
}
</script>

<style scoped>
</style>
