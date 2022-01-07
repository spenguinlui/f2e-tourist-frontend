<template>
  <ul class="stars">
    <li><img :src="starImg(1)" alt="星星icon"></li>
    <li><img :src="starImg(2)" alt="星星icon"></li>
    <li><img :src="starImg(3)" alt="星星icon"></li>
    <li><img :src="starImg(4)" alt="星星icon"></li>
    <li><img :src="starImg(5)" alt="星星icon"></li>
  </ul>
</template>

<script>
import FullStarImg from "../assets/images/icon/star-filled.svg";
import HalfStarImg from "../assets/images/icon/half-star-filled.svg";
import EmptyStarImg from "../assets/images/icon/star-outline.svg";

export default {
  props: ['score'],
  methods: {
    starImg(num) {
      if (this.score >= num) {
        return FullStarImg;
      } else {
        if (this.score >= (num - 0.5)) {
          return HalfStarImg;
        } else {
          return EmptyStarImg;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .stars {
    @include flex-row-flex-start-center;
    li {
      img {
        width: 100%;
      }
    }
  }
</style>