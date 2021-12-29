<template>
  <div class="container">
    <section class="detail-header">
      <section class="detail-header-title">
        <h1 class="detail-header-title-text"></h1>
        <div class="detail-header-comment">
          <ul class="detail-header-comment-stars">
            <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
            <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
            <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
            <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
            <li><img src="../assets/images/icon/star-grey.svg" alt="空星icon"></li>
          </ul>
          <div class="detail-header-comment-count">
          </div>
        </div>
        <ul class="detail-tags">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </section>
    <section class="detail-section-block">
      <section class="detail-block-left">
        <div class="detail-left-content">
          <section class="detail-about">
            <h2 class="detail-title"></h2>
            <ul class="detail-content">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </section>
          <section class="detail-address">
            <h2 class="detail-title"></h2>
            <ul class="detail-content">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </section>
          <section class="detail-opentime">
            <h2 class="detail-title"></h2>
            <ul class="detail-content">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </section>
        </div>
      </section>
      <section class="detail-block-right"></section>
    </section>
    <section class="detail-section">
      <h2 class="detail-title"></h2>
      <ul class="detail-content">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
    <section class="detail-section">
      <h2 class="detail-title"></h2>
      <ul class="detail-content">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
    <section class="detail-section">
      <h2 class="detail-title"></h2>
      <ul class="detail-content">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .container {
    @include content-padding(.1vh);
  }

  section[class^="detail-section"] {
    padding: 0.75rem 0;
    article {
      text-indent: 2em;
    }
  }

  .detail-title {
    @include textAnimate;
    width: 30%;
    height: 2rem;
    border-radius: $oval-bora;
    padding: .5rem 0;
  }

  .detail-content {
    width: 100%;
    li {
      @include textAnimate;
      width: 100%;
      height: 1.2rem;
      border-radius: $oval-bora;
      margin: .8rem 0;
    }
  }

  .detail-header {
    @include flex-row-space-between-center;
    margin-top: 1rem;
    &-title {
      @include flex-column-center-baseline;
      @include flex-col(8);
      padding: 1rem 0;
      &-text {
        @include textAnimate;
        width: 100%;
        height: 3rem;
        border-radius: $oval-bora;
        padding: .5rem 0;
        margin-bottom: 1rem;
      }
    }
    &-comment {
      @include flex-row-flex-start-baseline;
      &-count {
        @include textAnimate;
        width: 5rem;
        height: 1.2rem;
        margin-left: .5rem;
        border-radius: $oval-bora;
      }
      &-stars {
        @include flex-row-flex-start-center;
        margin: .25rem 0;
        margin-bottom: 1rem;
        li {
          img {
            width: 100%;
          }
        }
      }

    }
    .detail-tags {
      @include tags-row;
      li {
        @include textAnimate;
        width: 4rem;
        height: 1.5rem;
        border-radius: $oval-bora;
      }
    }
  }

  .detail-section-block {
    .detail-block-left {
      @include flex-col(12);
      height: calc(60vh + 1rem);
      .detail-left-content {
        @include flex-column-flex-start-space-between;
        height: 100%;
        padding: 0;
        gap: 1.25rem;
      }
    }
    .detail-block-right {
      @include flex-col(12);
      @include bgAnimate;
      height: calc(60vh + 1rem);
      margin-left: 0;
      margin-bottom: 1.5rem;
      border-radius: $normal-bora;
      margin: 0;
      width: 100%;
    }
  }

  @include screen-up {
    .detail-header {
      &-title {
        @include flex-col(7);
      }
      &-comment {
        &-stars {
          margin-right: .7rem;
        }
      }
    }
    .detail-section-block {
      @include flex-row-center-flex-start;
      .detail-block-left  {
        @include flex-col(5);
        padding: 0;
        .detail-left-content {
          border: 1px solid $grey-300;
          padding: 1.5rem;
        }
      }
      .detail-block-right {
        @include flex-col(7);
        margin-left: 1.5rem;
      }
    }
  }
</style>