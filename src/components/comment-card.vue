<template>
  <div class="comment-card">
    <div class="comment-card-avatar">
      <div class="comment-card-avatar-img"></div>
    </div>
    <div class="comment-card-content">
      <section class="comment-card-content-header">
        <div class="comment-card-avatar-m"></div>
        <h5 class="comment-card-content-header-title">{{ comment.title }}</h5>
        <ul class="comment-card-content-header-score">
          <Stars :score="comment.score"/>
        </ul>
      </section>
      <section class="comment-card-content-context">
        {{ comment.content }}
      </section>
    </div>
  </div>
</template>

<script>
import Stars from "@/components/stars.vue";

export default {
  props: ['comment'],
  components: {
    Stars
  }
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
    &-avatar {
      display: none;
    }
    &-content {
      @include flex-col(12);
      &-header {
        @include flex-row-space-between-center;
        padding-bottom: .5rem;
        &-title {
          @include font-h5(bold);
          flex: auto;
          max-width: 50%;
          color: $grey-700;
        }
        &-score {
          @include flex-row-center-center;
        }
      }
      &-context {
        @include font-content;
        color: $grey-700;
      }
    }
  }
  .comment-card-avatar-m {
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: $cycle-bora;
    background-color: #ddd;
  }

  @include screen-up {
    .comment-card {
      &-avatar {
        display: block;
        &-img {
          width: 8rem;
          height: 8rem;
          padding: 1rem;
          border-radius: $cycle-bora;
          background-color: #ddd;
        }
      }
      &-content {
        @include flex-col(10);
      }
    }
    .comment-card-avatar-m {
      display: none;
    }
  }

</style>