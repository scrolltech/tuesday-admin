<template>
  <div id="articleFeed">
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="(publication, i) in publications" :key="i">
            <v-card 
              color="blue-grey darken-2" class="white--text"
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
  name: 'Publication',
  data: () => {
    return {
      publications: [
        {'slug': 'scroll', 'label': 'Scroll'},
        {'slug': 'satyagrah', 'label': 'Satyagrah'}
      ]
    }
  },
  mounted () {
    // eslint-disable-next-line
    console.log(this.$route.params.path)
    this.getArticles()
    // eslint-disable-next-line
    console.log(this.articles)
  },
  methods: {
    getArticles() {
      this.articles = [{
        id: 123123,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }, {
        id: 321321,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }, {
        id: 321321,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }, {
        id: 321321,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }]
    }
  }
}
</script>

<style scoped>
</style>
