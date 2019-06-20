<template>
  <div id="inspire">
    <v-navigation-drawer class="lighten-4"  fixed clipped app v-model="drawer">
      <Sidebar></Sidebar>
    </v-navigation-drawer>
    <v-toolbar class="header" color="primary" app absolute clipped-left>
      <v-toolbar-side-icon  @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Tuesday&nbsp;<span class="text">Admin</span></span>
    </v-toolbar>
  </div>
</template>

<script>

import Sidebar from './Sidebar.vue';

export default {
  name: 'Header',
  components: {
    Sidebar
  },
  data: () => ({
    drawer: null
  })
}
</script>

<style scoped>

.navigation-drawer__border {
  display: none;
}

.text {
  font-weight: 400;
}
.header {
  position: fixed;
}
</style>
