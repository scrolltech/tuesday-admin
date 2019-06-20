<template>
  <v-container class="lighten-4">
    <h4>
      <span v-for="(item, i) in path" :key="i">
        <span class="path" @click="
          $router.push(
            `${i === 0 ? '' : '/'}${path.slice(0, i).join('/')}/${item}`
          )">
          {{item[0].toUpperCase() + item.slice(1)}}
        </span>
        <span class="arrow" v-if="i + 1 !== path.length">></span>
      </span>
    </h4>
  </v-container>
</template>

<script>

export default {
  name: 'routePath',
  data: () => {
    return {
        path: ''
    }
  },
  mounted () {
    this.path = this.$route.path.slice(1).split('/')
  },
  watch:{
      $route () {
          this.path = this.$route.path.slice(1).split('/')
      }
  }
}
</script>

<style scoped>

.path {
  cursor: pointer;
}

.arrow {
  cursor: none;
}
</style>
