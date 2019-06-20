<template>
  <div id="userProfile">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            class="mx-3"
            flat
            label="Search"
            prepend-inner-icon="search"
            solo-inverted
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex>
            <v-card xs12 class="black--text" pa-3>
              <v-layout row>
                <v-flex xs2 pa-5>
                  Aman Aryan
                </v-flex>

                <v-flex xs4 pa-5>
                  <v-btn color="red" dark>Block User
                    <v-icon dark right>remove_circle</v-icon>
                  </v-btn>
                </v-flex>
                <!-- <v-flex xs1 pa-4>
                  <v-badge
                    class="status-badge"
                    color="green"
                    right
                  >
                    <template v-slot:badge>
                      <span>5</span>
                    </template>
                    <v-icon large color="primary">check_circle</v-icon>
                  </v-badge>
                  <span class="caption">Approved</span>
                </v-flex>
                <v-flex xs1 pa-4>
                  <v-badge
                    class="status-badge"
                    color="green"
                  >
                    <template v-slot:badge>
                      <span>2</span>
                    </template>
                    <v-icon large color="orange">star</v-icon>
                  </v-badge>
                  <span class="caption">Picked</span>
                </v-flex>
                <v-flex xs1 pa-4>
                  <v-badge
                    class="status-badge"
                    color="green"
                  >
                    <template v-slot:badge>
                      <span>4</span>
                    </template>
                    <v-icon large color="red">delete</v-icon>
                  </v-badge>
                  <span class="caption">Declined</span>
                </v-flex> -->
              </v-layout>
              <!-- <v-layout>
                <v-flex x2 pa-4 right>
                  <v-btn color="red" dark>Block User
                    <v-icon dark right>remove_circle</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'UserProfile',
  
  mounted () {
    // console.log(this.$route)
  }
}
</script>

<style scoped>

.status-badge {
  margin-left: 2%;
}
</style>
