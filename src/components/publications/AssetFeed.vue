<template>
  <div id="assetFeed">
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
              <v-flex xs12 v-for="(asset, i) in getAssetsByTab(tab.name)" :key="i">
                <v-card 
                  color="darken-2" class="black--text asset-block"
                  @click="$router.push(`${$route.path}/${asset.id}`)">
                  <v-layout row>
                  <v-flex xs9 sm8>
                    <div class="headline">{{asset.title}}</div>
                  </v-flex>
                  
                  <v-flex xs3 sm4>
                    <v-badge class="status-badge" color="" right>
                      <template v-slot:badge class="dp">
                        <span class="black--text">{{asset.comments_count}}</span>
                      </template>
                      <v-icon color="blue">comment</v-icon>
                    </v-badge>
                    <v-badge v-if="tab.name === 'open'" class="status-badge" color="" right>
                      <template v-slot:badge>
                        <span class="black--text">{{asset.pending_comments_count}}</span>
                      </template>
                      <v-icon color="yellow">local_parking</v-icon>
                    </v-badge>
                    <v-badge v-if="tab.name === 'open'" class="status-badge" color="" right>
                      <template v-slot:badge>
                        <span class="black--text">{{asset.rejected_comments_count}}</span>
                      </template>
                      <v-icon color="red">delete</v-icon>
                    </v-badge>

                    <v-btn flat icon color="red"
                      v-if="tab.name === 'open'"
                      v-on:click.stop="closeAsset(asset.id)"
                      dark title="close"
                    >
                      <v-icon>highlight_off</v-icon>
                    </v-btn>
                    <v-btn  flat dark color="green"
                      v-if="tab.name === 'closed'"
                      v-on:click.stop="openAsset(asset.id)"
                    >Restart
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
import $apiClient from '../../api';

export default {
  name: 'AssetFeed',
  data: () => {
    return {
      activeTab: 'open',
      assets: [],
      tabs: [
        {name: 'open', label: 'Open', icon: 'check_circle_outline'},
        {name: 'closed', label: 'Closed', icon: 'highlight_off'}
      ],
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
    },
    getAssetsByTab (tabName) {
      return this.assets.filter(asset => tabName == 'open' ? !asset.commenting_closed : asset.commenting_closed )
    },
    openAsset(id) {
      $apiClient.openAsset(id).then(response => {
        if (response.status == 200) {
          this.assets = this.assets.filter(asset => asset.commenting_closed === true)
        }
      })
    },
    closeAsset(id) {
      $apiClient.closeAsset(id).then(response => {
        if (response.status == 200) {
          this.assets = this.assets.filter(asset => asset.commenting_closed === false)
        } 
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
