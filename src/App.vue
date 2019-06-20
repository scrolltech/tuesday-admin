<template>
  <div id="app">
      <Header />
      <v-app id="inspire">
        <v-content>
          <RoutePath />
          <router-view/>
        </v-content>
      </v-app>
    </div>
</template>

<script>
import Header from './components/Header'
import RoutePath from './components/RoutePath'

import './styles/main.scss';

export default {
  name: 'App',
  components: {
    Header,
    RoutePath
  },
}
</script>
