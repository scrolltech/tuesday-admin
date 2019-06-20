<template>
  <div id="TypeHomePage">
    <PublicationHomePage/>
  </div>
</template>

<script>
import PublicationHomePage from './publications';

export default {
  name: 'TypeHomePage',
  components: {
    PublicationHomePage
  },
  mounted() {
    // console.log(this.$route.params)
  }
}
</script>

<style scoped>
</style>
