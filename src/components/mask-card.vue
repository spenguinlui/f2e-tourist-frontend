<template>
  <div class="card">
    <div class="card-img">
      <div class="img-block"></div>
      <div class="favorite-btn">
        <img src="../assets/images/icon/heart-grey.svg" alt="loading-icon">
      </div>
    </div>
    <div class="card-content">
      <div class="card-content-title"></div>
      <ul class="card-content-stars">
        <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
        <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
        <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
        <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
        <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
      </ul>
      <div class="card-content-tags"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .card {
    @include flex-column-center-baseline;
    @include card-shadow;
    padding: 1.25rem;
    .card-img {
      width: 100%;
      height: 25vh;
      position: relative;
      .img-block {
        @include bgAnimate;
        width: 100%;
        height: 100%;
        border-radius: $normal-bora;
      }
      .favorite-btn {
        @include btn-icon;
        background-color: $grey-100;
        border: 1px solid $grey-300;
        cursor: default;
        position: absolute;
        top: 5%;
        right: 5%;
        img {
          width: 1.125rem;
          height: 100%;
        }
      }
    }
    .card-content {
      width: 100%;
      &-title {
        @include textAnimate;
        background-color: $grey-300;
        margin: .5rem 0;
        width: 100%;
        height: 1.5rem;
      }
      &-stars {
        @include flex-row-flex-start-center;
        margin: .25rem 0;
        > li > img {
          width: 100%;
        }
      }
      &-tags {
        @include textAnimate;
        margin: .25rem 0;
        width: 4rem;
        height: 1.25rem;
        border-radius: $oval-bora;
      }
    }
  }

</style>