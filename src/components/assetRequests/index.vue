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

          <v-radio-group v-model="radios" row :mandatory="true">
            <v-radio label="Default" value="0"></v-radio>
            <v-radio label="Manual" value="1"></v-radio>
            <v-radio label="Automatic" value="2"></v-radio>
          </v-radio-group>

          <v-btn
            :loading="loading"
            :disabled="loading"
            color="info"
            @click="loader = 'loading'"
          >
            Submit
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
              @click="$router.push(`${$route.path}/${publication.slug}`)">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{publication.label}}</div>
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
  export default {
    data: () => {
      return {
        articleUrl: '',
        articleTitle: '',
        radios: '0',
        loader: null,
        loading: false,
        publications: [
          {'slug': 'scroll', 'label': 'Scroll'}
        ],
      } 
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