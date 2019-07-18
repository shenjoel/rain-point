<template>
  <div v-if="this.isShow" @click="rainPoinclick" class="rain-point" :class="{action: isClick}" :style="styleText"></div>
</template>

<script>
export default {
  name: "rain-point",
  props: {},
  data() {
    return {
      styleText: {},
      isShow: true,
      isClick: false
    };
  },
  methods: {
    rainPoinclick(e) {
      if (this.isClick) return;
      this.isClick = true;
      this.$emit("rainPoinclick");
    },
    setStyle(params) {
      this.styleText = params;
    },
    destory() {
      this.isShow = false;
    }
  }
};
</script>

<style>
.rain-point {
  position: absolute;
  background: red;
  width: 20px;
  height: 20px;
}

.action {
  background: blue;
}
</style>