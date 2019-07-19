<!-- eslint-disable -->
<template>
  <div id="assetrequest">
    <v-form ref="form" @submit.prevent="submit" v-model="valid">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="form.articleUrl"
              :rules="rules.articleUrl"
              label="Article URL"
              required
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="form.articleTitle"
              :rules="rules.articleTitle"
              label="Article Title"
              required
              outline
            ></v-text-field>
          </v-flex>

          <v-btn
            :disabled="!formIsValid"
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
      const defaultForm = Object.freeze({
        articleUrl: '',
        articleTitle: '',
      })
      return {
        valid: false,
        publications: [],
        requesting: false,
        required: true,
        form: Object.assign({}, defaultForm),
        rules: {
          articleUrl: [val => (val || '').length > 0 || 'This field is required'],
          articleTitle: [val => (val || '').length > 0 || 'This field is required']
        },
        defaultForm
      } 
    },
    computed: {
      formIsValid () {
        return (
          this.form.articleUrl &&
          this.form.articleTitle 
        )
      }
    },

    mounted () {
      this.getPublications(this.$route.params)
    },
    methods: {
       resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
       },

      getPublications() {
        $apiClient.getPublications().then((response) => {
          this.publications = response.data;
        })
      },
      submitAssetRequest () {
        const data = { 'url': this.form.articleUrl, 'title': this.form.articleTitle, }
        this.requesting = true;
        $apiClient.submitAssetRequest(data).then(response => {
          this.requesting = false;
          if(response.status == 200) {
            this.resetForm();
          }
        }).catch(() => this.requesting = false)
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