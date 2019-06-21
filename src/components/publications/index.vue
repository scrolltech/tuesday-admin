<template>
  <div id="articleFeed">
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="(publication, i) in publications" :key="i">
            <v-card 
              color="darken-2" class="black--text"
              @click="$router.push(`${$route.path}/${publication.id}`)">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{publication.name}}</div>
                </div>
              </v-card-title>
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
  name: 'Publication',
   data: () => {
    return {
      publications: [
      ],
    }
  },
  mounted () {
    this.getPublications(this.$route.params)
  },
  methods: {
    getPublications() {
      $apiClient.getPublications().then((response) => {
        console.log(response);
        this.publications = response.data;
      }).then((error) => {
        console.log('error ', error);
      })
    }
  }
}
</script>

<style scoped>
</style>
