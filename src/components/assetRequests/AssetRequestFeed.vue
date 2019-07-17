<template>
  <div id="assetRequestFeed">
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="(assetRequest, i) in assetRequests" :key="i">
            <v-card 
              color="darken-2" class="black--text asset-block"
              >
              <v-layout row>
              <v-flex xs9 sm8>
                <div class="headline">{{assetRequest.title}}</div>
              </v-flex>
              
              <v-flex xs3 sm4>
                <v-menu
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-x
                  :ref="'menu' + i"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn flat
                      color="indigo"
                      dark
                      v-on="on"
                    >
                      Accept
                    </v-btn>
                  </template>

                  <v-card>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Moderation Policy</v-list-tile-title>
                          <v-list-tile-sub-title>Please select the modertion policy before accepting.</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-radio-group v-model="radios" row :mandatory="false">
                            <v-radio label="Default" value="0"></v-radio>
                            <v-radio label="Automatic" value="1"></v-radio>
                            <v-radio label="Manual" value="2"></v-radio>
                          </v-radio-group>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn flat @click="onCancel(i)">Cancel</v-btn>
                      <v-btn color="primary" flat @click="onCancel(i)">Accept</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>

                <v-btn flat color="red" dark
                  v-on:click="rejectAssetRequest(assetRequest.asset_id)"
                >Decline
                </v-btn>
                <v-btn flat dark class="black--text"
                  v-on:click="cancelAssetRequest(assetRequest.asset_id)"
                >Cancel
                </v-btn>

              </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import $apiClient from '../../api';

export default {
  name: 'AssetRequestFeed',
  data: () => {
    return {
      assetRequests: [],
      radios: '0',
    }
  },
  mounted () {
    this.getAllAssetRequests(this.$route.params.publication_id)
  },
  methods: {
    getAllAssetRequests() {
      $apiClient.getAllAssetRequests().then((response) => {
        this.assetRequests = response.data;
        console.log('data', response.data);
      })
    },

    rejectAssetRequest (asset_id) {
      $apiClient.rejectAssetRequest(asset_id).then(response => {
        if (response.status == 200 ) {
          console.log('reject request worked');
          // this.comments.pending = this.comments.pending.filter(comment => comment.id !== commentId)
        }     
      })
    },
    cancelAssetRequest (asset_id) {
      $apiClient.cancelAssetRequest(asset_id).then(response => {
        if (response.status == 200 ) {
          console.log('cancel request worked');
          // this.comments.pending = this.comments.pending.filter(comment => comment.id !== commentId)
        }     
      })
    },

    onCancel (i) {
      this.$refs['menu' + i][0].isActive = false
    }
  }
}
</script>

<style scoped>
  
.status-badge {
  margin-left: 2%;
}

.asset-block {
  padding-bottom: 10px
}

.v-badge {
  width: 48px;
  margin: 0 20px;
  padding-top: 10px;
}
</style>