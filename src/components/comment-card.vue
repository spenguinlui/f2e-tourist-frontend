<template>
  <div class="comment-card">
    <div class="comment-left">
      <div class="comment-avatar"></div>
    </div>
    <div class="comment-right">
      <section class="comment-header">
        <div class="comment-avatar-m"></div>
        <h5 class="comment-title">{{ comment.title }}</h5>
        <ul class="comment-score">
          <li><img
            :src="comment.score >= 1 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
            :alt="comment.score >= 1 ? '滿星icon' : '空星icon'"></li>
          <li><img
            :src="comment.score >= 2 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
            :alt="comment.score >= 2 ? '滿星icon' : '空星icon'"></li>
          <li><img
            :src="comment.score >= 3 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
            :alt="comment.score >= 4 ? '滿星icon' : '空星icon'"></li>
          <li><img
            :src="comment.score >= 4 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
            :alt="comment.score >= 4 ? '滿星icon' : '空星icon'"></li>
          <li><img
            :src="comment.score >= 5 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
            :alt="comment.score >= 5 ? '滿星icon' : '空星icon'"></li>
        </ul>
      </section>
      <section class="comment-context">
        {{ comment.content }}
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment']
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .comment-card {
    @include flex-row-center-center;
    border-bottom: 1px solid $grey-300;
    padding: 1rem 0;
    &:last-child {
      border: none;
    }
    .comment-left {
      display: none;
      .comment-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #ddd;
      }
    }
    .comment-right {
      @include flex-col(12);
      .comment-header {
        @include flex-row-space-between-center;
        padding-bottom: .5rem;
        .comment-avatar-m {
          display: block;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: #ddd;
        }
        .comment-title {
          @include font-h5(bold);
          flex: auto;
          max-width: 50%;
          color: $grey-700;
        }
        .comment-score {
          @include flex-row-center-center;
        }
      }
      .comment-context {
        @include font-content;
        color: $grey-700;
      }
    }
  }

  @include screen-up {
    .comment-card {
      .comment-left {
        display: block;
        width: 8rem;
        height: 8rem;
        padding: 1rem;
      }
      .comment-right {
        @include flex-col(10);
        .comment-header {
          .comment-avatar-m {
            display: none;
          }
          .comment-title {

          }
          .comment-score {

          }
        }
      }
    }
  }

</style>