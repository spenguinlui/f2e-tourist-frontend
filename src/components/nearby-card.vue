<template>
  <div class="card" @click="toDetail(item.ID)" v-if="item.ID !== dataDetail.ID">
    <div class="card-img">
      <img :src="pictureUrl" :alt="pictureAlt">
    </div>
    <div class="card-content">
      <div class="card-content-title">{{ item.Name }}</div>
      <Stars :score="4.5"/>
      <ul class="card-content-tags">
        <li class="card-tag" v-if="noTags">無標記</li>
        <li class="card-tag" v-if="item.Class">{{ item.Class }}</li>
        <li class="card-tag" v-if="item.Class1">{{ item.Class1 }}</li>
        <li class="card-tag" v-if="item.Class2">{{ item.Class2 }}</li>
        <li class="card-tag" v-if="item.Class3">{{ item.Class3 }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Stars from "@/components/stars.vue";
  import EmptyImg from "@/assets/images/empty-img.png";

  export default {
    props: ['item'],
    methods: {
      toDetail(id) {
        this.$store.dispatch("getSingleTypeDetail", id);
        this.$router.push(`/${this.item.Type}/${id}`);
      }
    },
    computed: {
      pictureUrl() {
        return this.item.Picture && this.item.Picture.PictureUrl1 ? this.item.Picture.PictureUrl1 : EmptyImg;
      },
      pictureAlt() {
        return this.item.Picture && this.item.Picture.PictureDescription1 ? this.item.Picture.PictureDescription1 : 'no-image';
      },
      noTags() {
        return !this.item.Class && !this.item.Class1 && !this.item.Class2 && !this.item.Class3;
      },
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
          @include font-overline(700);
          margin-top: .2rem;
        }
      }
    }
  }
</style>