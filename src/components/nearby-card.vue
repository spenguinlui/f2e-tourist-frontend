<template>
  <div class="card" @click="toDetail(item.ID)" v-if="item.ID !== dataDetail.ID">
    <div class="card-img">
      <img v-if="!item.Picture || !item.Picture.PictureUrl1" src="../assets/images/empty-img.png" alt="no-image'">
      <img v-if="item.Picture && item.Picture.PictureUrl1" :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1">
    </div>
    <div class="card-content">
      <div class="card-content-title">{{ item.Name }}</div>
      <Stars />
      <div class="card-content-tags">
        <!-- <template v-for="(tag, index) in item.Tag">
          <div class="card-tag" :key="index">{{ tag }}</div>
        </template>
        <div v-if="!item.Tag" class="card-tag">尚未建立</div> -->
        <div class="card-tag" v-if="!item.Class1 && !item.Class">無標記</div>
        <div class="card-tag" v-if="item.Class">{{ item.Class }}</div>
        <div class="card-tag" v-if="item.Class1">{{ item.Class1 }}</div>
        <div class="card-tag" v-if="item.Class2">{{ item.Class2 }}</div>
        <div class="card-tag" v-if="item.Class3">{{ item.Class3 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Stars from "@/components/stars.vue";
  import { mapGetters } from 'vuex';

  export default {
    props: ['item'],
    methods: {
      toDetail(id) {
        this.$store.dispatch("getSingleTypeDetail", id);
        this.$router.push(`/${this.item.Type}/${id}`);
      }
    },
    computed: {
      ...mapGetters(['dataDetail'])
    },
    components: {
      Stars
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .card {
    @include flex-row-center-center;
    padding: 0.5rem;
    border-bottom: 1px solid $grey-300;
    &:last-child {
      border: none;
    }
    .card-img {
      width: 15vh;
      height: 15vh;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: .5rem;
      }
    }
    .card-content {
      @include flex-column-space-between-baseline;
      width: calc(100% - 15vh);
      height: 15vh;
      padding-left: 0.5rem;
      &-title {
        @include font-content(bold);
        @include ellipsis-text(1);
        color: $grey-700;
        margin-bottom: .2rem;
      }
      &-tags {
        @include tags-row;
        flex-wrap: wrap;
        .card-tag {
          @include btn-tag-filled;
          @include font-caption(700);
          margin-top: .2rem;
        }
      }
    }
  }
</style>