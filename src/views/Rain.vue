<template>
  <div class="about">
    <rain ref="rain" :time="30" />
  </div>
</template>

<script>
// @ is an alias to /src
import rain from '@/components/rain'

export default {
  name: 'home',
  components: {
    rain
  },
  beforeDestroy() {
    this.$refs.rain.clear()
  },
  mounted() {
    this.$refs.rain.start()
  }
}
</script>