<template>
  <v-list dense class="lighten-4 white">
    <v-layout row align-center>
      <v-flex xs6>
        <v-subheader>
          Menu
        </v-subheader>
      </v-flex>
    </v-layout>
    <template v-for="(item, index) in items">
      <v-divider dark v-if="item.divider"  :key="index" class="my-3"></v-divider>
      <v-list-tile
        v-else 
        :key="index"
        :to="`/${item.slug}`"
        >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="">
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <template v-if="item.showSubhead">
        <v-divider dark :key="`sb${index}`"></v-divider>
        <v-list-tile class="subhead" v-for="(subhead, i) in item.subheads" 
          :key="`subhead${i}`">
          <v-list-tile-action>
            <v-icon>{{ subhead.icon }}</v-icon>
          </v-list-tile-action>
          <v-flex xs6>
            <v-subheader v-if="item.text" @click.native="$router.push(`/${item.slug}/${subhead.slug}`)">
              {{ subhead.text }}
            </v-subheader>
          </v-flex>
        </v-list-tile>
        <v-divider dark :key="`se${index}`"></v-divider>
      </template>
    </template>
  </v-list>
</template>

<script>

export default {
  name: 'Sidebar',
  data: () => ({
    items: [
      { icon: 'notes', text: 'Publications', slug: 'publication'},
      { icon: 'touch_app', text: 'Asset Requests', slug: 'assetrequest'},
    ],
    visibilityMap: {}
  }),
  mounted () {
      // eslint-disable-next-line
    for (let index in this.items) {
      if (this.items[index].subheads) {
        this.visibilityMap[this.items[index].text] = true
      }
    }
  },
  methods: {
    toggleSubhead (itemText) {
      // eslint-disable-next-line
      
      this.visibilityMap[itemText] = !this.visibilityMap[itemText]
      // eslint-disable-next-line
      
    }
  }
}
</script>

<style scoped>

.subhead {
  background-color: lightgray;
}

#keep main .container {
  height: 660px;
}

.navigation-drawer__border {
  display: none;
}

.text {
  font-weight: 400;
}
</style>

