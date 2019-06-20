<!-- eslint-disable -->

<template>
  <div id="assetRequestFeed">
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
        v-on:click="$router.push(`${baseUrl}/status/${tab.name}`)"
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
              <v-flex xs12 v-for="(asset, i) in assets" :key="i" v-if="asset.status === tab.status.value">
                <v-card 
                  color="blue-grey darken-2" class="white--text asset-block">
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{asset.title}}</div>
                    </div>
                  </v-card-title>
                  <v-flex xs12>
                    <v-btn color="primary" v-if="tab.name === 'pending'" dark
                      v-on:click="enableAsset(asset.id)">Enable
                      <v-icon dark right>check_circle</v-icon>
                    </v-btn>
                  </v-flex>

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

export default {
  name: 'AssetRequestFeed',
  data: () => {
    return {
      assets: [],
      publication: ['scroll', 'satyagrah'],
      activeTab: 'pending',
      requests: {
        pending: [],
        enabled: []
      },
      baseUrl: '',
      tabs: [
        {name: 'pending', label: 'Pending', icon: 'local_parking', status: {value: 0}},
        {name: 'enabled', label: 'Enabled', icon: 'spellcheck', status: {value: 1}}
      ],
      dummyAssets: {
        'scroll': [{
            id: 919647,
            status: 0,
            title: 'IPL 2019: When Mumbai Indians needed a miracle, captain Kieron Pollard turned back the clock',
          }, {
            id: 919648,
            status: 1,
            title: 'The Election Fix: The BJP starts off as clear front-runners. Why is the party so jittery?',
          }],
        'satyagrah': [{
            id: 123321,
            status: 0,
            title: 'बालाकोट पर प्रधानमंत्री नरेंद्र मोदी का बयान आचार संहिता का उल्लंघन : चुनाव अधिकारी',
          }, {
            id: 123321,
            status: 1,
            title: 'अब बीमा हुआ बेहतर',
          }]
      }
    }
  },
  beforeMount () {
    // this.getAllAssets()
    // this.getEnabledAssets()
  },
  mounted () {
    this.getAllAssets(this.$route.params.publication)
    
    let {publication, status} = this.$route.params
    this.baseUrl = `/assetrequest/${publication}`
    if (status) {
      this.activateTab(status)
    } else {
      this.$router.push(`${this.baseUrl}/status/pending`)
    }
  },
  methods: {
    getAllAssets(publication) {
      this.assets = this.dummyAssets[publication]
    },
    activateTab (status) {
      let tab = document.querySelector(`div[data-tab='${status}'] a`)
      tab.click()
    },
    enableAsset (assetId) {
      let assetIndex = this.assets.findIndex(asset => asset.id === assetId)
      let asset = this.assets[assetIndex]
      asset.status = 1
    },
    // getEnabledAssets () {
    //   this.assets.enabled = []
    // },
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

</style>
