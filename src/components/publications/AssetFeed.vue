<template>
  <div id="assetFeed">
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="(asset, i) in assets" :key="i">
            <v-card 
              color="darken-2" class="black--text asset-block"
              @click="$router.push(`${$route.path}/${asset.id}`)">
              <v-layout row>
              <v-flex xs8>
                <div class="headline">{{asset.title}}</div>
              </v-flex>
              
              <v-flex xs4>
                  <v-badge class="status-badge" color="" right>
                    <template v-slot:badge class="dp">
                      <span class="black--text">{{asset.comments_count}}</span>
                    </template>
                    <v-icon color="blue">comment</v-icon>
                  </v-badge>
                  <v-badge class="status-badge" color="" right>
                    <template v-slot:badge>
                      <span class="black--text">{{asset.pending_comments_count}}</span>
                    </template>
                    <v-icon color="yellow">local_parking</v-icon>
                  </v-badge>
                  <v-badge class="status-badge" color="" right>
                    <template v-slot:badge>
                      <span class="black--text">{{asset.rejected_comments_count}}</span>
                    </template>
                    <v-icon color="red">delete</v-icon>
                  </v-badge>
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
  name: 'AssetFeed',
  data: () => {
    return {
      assets: [],
    }
  },
  mounted () {
    this.getAllAssets(this.$route.params.publication_id)
  },
  methods: {
    getAllAssets(publication_id) {
      $apiClient.getAllAssets(publication_id).then((response) => {
        this.assets = response.data;
      })
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
