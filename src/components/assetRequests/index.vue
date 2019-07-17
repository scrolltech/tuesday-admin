<!-- eslint-disable -->
<template>
  <div id="assetrequest">
    <v-form v-model="valid">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="articleUrl"
              label="Article URL"
              required
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="articleTitle"
              label="Article Title"
              required
              outline
            ></v-text-field>
          </v-flex>
          
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="info"
            v-on:click="submitAssetRequest()"
          >
            Request
          </v-btn>

        </v-layout>
      </v-container>
    </v-form>
    
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="(publication, i) in publications" :key="i">
            <v-card 
              color=" darken-2" class="Black--text"
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
    data: () => {
      return {
        valid: false,
        articleUrl: '',
        articleTitle: '',
        loader: null,
        loading: false,
        publications: [],
        
      } 
    },
    mounted () {
      this.getPublications(this.$route.params)
    },
    methods: {
      getPublications() {
        $apiClient.getPublications().then((response) => {
          this.publications = response.data;
        })
      },
      submitAssetRequest () {
        const data = { 'url': this.articleUrl, 'title': this.articleTitle, }
        $apiClient.submitAssetRequest(data).then(response => {
          if(response.status == 200) {
            console.log('data', data);
          }
        })
      },
    },

    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
  }
</script>