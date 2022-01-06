<template>
  <div class="container-fluid">
    <template v-if="dataLoaing">
      <MaskDetail/>
    </template>
    <template v-else>
      <div class="container">
        <section class="detail-header">
          <section class="detail-header-title">
            <h1 class="detail-header-title-text">{{ dataDetail.Name }}</h1>
            <div class="detail-header-comment">
              <Stars />
              <div class="detail-header-comment-count">
                {{ dataDetail.Comment && dataDetail.Comment.length || '0' }} 則評論
              </div>
            </div>
            <ul class="detail-tags">
              <!-- <li class="detail-tag" v-for="tag in ['文化活動', '熱鬧', '一年一度']" :key="tag">{{ tag }}</li> -->
              <li class="detail-tag" v-if="!dataDetail.Class && !dataDetail.Class1">無標記</li>
              <li class="detail-tag" v-if="dataDetail.Class1">{{ dataDetail.Class1 }}</li>
              <li class="detail-tag" v-if="dataDetail.Class2">{{ dataDetail.Class2 }}</li>
              <li class="detail-tag" v-if="dataDetail.Class3">{{ dataDetail.Class3 }}</li>
            </ul>
          </section>
          <section class="detail-connect">
            <a class="call-btn" :href="`tel:${dataDetail.Phone}`">撥打電話<img src="../assets/images/icon/phone.svg" alt="撥打電話icon"></a>
            <a class="web-btn" :href="dataDetail.WebsiteUrl" target="_blank" formtarget="_blank"><img src="../assets/images/icon/web.svg" alt="前往網站icon"></a>
            <button type="button"
              :class="favorites.includes(dataDetail.ID) ? 'favorite-btn filled' : 'favorite-btn'"
              @click.prevent.stop="changeFavorite(dataDetail.ID, !favorites.includes(dataDetail.ID))">
              <img v-show="favorites.includes(dataDetail.ID)" src="../assets/images/icon/heart-filled.svg" alt="加入我的最愛icon">
              <img v-show="!favorites.includes(dataDetail.ID)" src="../assets/images/icon/heart-outline.svg" alt="加入我的最愛icon">
            </button>
          </section>
        </section>
        <section class="detail-section-block">
          <section class="detail-block-left">
            <div class="detail-left-content">
              <section class="detail-about">
                <h2 class="detail-title">關於</h2>
                <p class="detail-content">{{ dataDetail.Description }}</p>
              </section>
              <section class="detail-address">
                <h2 class="detail-title">地址</h2>
                <p class="detail-content">{{ dataDetail.Address }}</p>
              </section>
              <section class="detail-opentime">
                <h2 class="detail-title">營業時間</h2>
                <p class="detail-content opentime">{{ dataDetail.OpenTime }}</p>
              </section>
            </div>
          </section>
          <section class="detail-block-right">
            <ImgPlayer :data="dataDetail" />
          </section>
        </section>

        <section class="detail-section">
          <h2 class="detail-title">{{ classType_zh }}特色</h2>
          <article v-if="dataDetail.DescriptionDetail" class="detail-content">{{ dataDetail.DescriptionDetail }}</article>
          <template v-else><NoContent /></template>
        </section>

        <section class="detail-section" v-if="dataDetail === 'restaurants'">
          <h2 class="detail-title">餐點推薦</h2>
          <article v-if="dataDetail.Features2" class="detail-content">{{ dataDetail.Features2 }}</article>
          <template v-else><NoContent /></template>
        </section>

        <section class="detail-section" v-if="dataDetail.ServiceInfo">
          <h2 class="detail-title">服務設施</h2>
          <article class="detail-content">{{ dataDetail.ServiceInfo }}</article>
        </section>

        <section class="detail-section">
          <h2 class="detail-title">交通方式</h2>
          <article v-if="dataDetail.TravelInfo" class="detail-content">{{ dataDetail.TravelInfo }}</article>
          <template v-else><NoContent /></template>
        </section>

        <section class="detail-section">
          <h2 class="detail-title">鄰近景點</h2>
          <div class="detail-nearby">
            <section class="detail-nearby-left">
              <NearbyCard
                v-for="item in dataDetail.NearbyDataList"
                :key="item.ID" :item="item"/>
            </section>
            <section class="detail-nearby-right">
              <NearbyMap :dataList="dataDetail.NearbyDataList"/>
            </section>
          </div>
        </section>

        <section class="detail-section">
          <h2 class="detail-title">旅客評價</h2>
          <Comment :dataDetail="dataDetail"/>
        </section>

        <section class="detail-section">
          <h2 class="detail-title">這些景點大家也推</h2>
          <div class="recommend-container">
            <div v-for="data in hotDataList" :key="data.ID" class="card-container">
              <Card :key="data.ID" :data="data" :type="data.Type" :classType="'commonCard'"/>
            </div>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stars from "@/components/stars.vue";
import ImgPlayer from "@/components/img-player.vue";
import Card from "@/components/card.vue";
import NearbyCard from "@/components/nearby-card.vue";
import NearbyMap from "@/components/nearby-map.vue";
import NoContent from '@/components/no-content.vue';
import Comment from '@/components/comment.vue';
import MaskDetail from '@/components/mask-detail.vue';

export default {
  name: "detail",
  data() {
    return {
      dataType: "",
      recommendList: []
    }
  },
  computed: {
    classType_zh() {
      switch (this.dataType) {
        case "activities": return "活動";
        case "restaurants": return "餐廳";
        case "hotels": return "飯店";
        case "scenicspots": return "景點";
        default: return "其他";
      }
    },
    ...mapGetters(['dataDetail', 'favorites', 'favoriteAdding', 'hotDataList', 'dataLoaing']),
  },
  methods: {
    getDetail() {
      const id =  this.$route.params.id;
      this.dataType = this.$route.params.type;
      this.$store.dispatch("getSingleTypeDetail", id);
    },
    changeFavorite(id, add) {
      if (this.favoriteAdding) { return; }

      const favoriteParams = { dataId: id, add, vm: this };
      if (this.userIsLogin) {
        this.$store.dispatch("serverModule/changeFavoriteToData", favoriteParams);
      } else {
        this.$store.dispatch("otherModule/changeFavoriteToData", favoriteParams);
      }
    },
    getHotDataList() {
      this.$store.dispatch("getHotDataList");
    }
  },
  created() {
    this.getDetail();
    // detail 點選其他卡片跳轉後位置要拉回頂端
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  components: {
    Stars,
    ImgPlayer,
    Card,
    NearbyCard,
    NearbyMap,
    NoContent,
    Comment,
    MaskDetail
  }
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
    @include font-h3(bold);
    color: $primary-800;
    padding: .5rem 0;
  }

  .detail-content {
    @include font-content(500);
    color: $grey-600;
  }

  .detail-header {
    @include flex-row-space-between-center;
    &-title {
      @include flex-column-center-baseline;
      @include flex-col(8);
      @extend .detail-title;
      padding: 1rem 0;
      &-text {
        @include font-content(bold);
        color: $grey-700;
        padding: .5rem 0;
      }
    }
    &-comment {
      @include flex-row-flex-start-center;
      &-count {
        @include font-button(500);
        color: $grey-500;
        margin-left: .5rem;
      }
    }
    .detail-tags {
      @include tags-row;
      .detail-tag {
        @include font-caption;
        @include btn-tag-filled;
      }
    }
    .detail-connect {
      @include flex-col(4);
      @include tags-row;
      justify-content: flex-end;
      > * {
        width: 1.75rem;
        height: 1.75rem;
      }
      .call-btn, .web-btn, .favorite-btn {
        @include btn-icon;
      }
      .call-btn {
        @include btn-filled;
        font-size: 0;
        margin-right: 1vw;
        > img {
          margin: 0;
        }
      }
      .web-btn {
        margin-right: .5vw;
      }
      .web-btn, .favorite-btn {
        @include btn-outline;
        > img {
          width: 1.125rem;
        }
        &.filled {
          @include btn-filled;
        }
      }
    }
  }

  .detail-section-block {
    @include flex-column-center-baseline;
    flex-direction: column-reverse;
    .detail-block-left {
      @include flex-col(12);
      height: calc(60vh + 1rem);
      .detail-left-content {
        @include flex-column-flex-start-space-between;
        height: 100%;
        overflow: hidden;
        padding: 0;
        gap: 1.25rem;
        .detail-content {
          @include ellipsis-text(5);
          &.opentime {
            @include ellipsis-text(3);
          }
        }
      }
    }
    .detail-block-right {
      @include flex-col(12);
      padding-left: 0;
      padding-bottom: 1.5rem;
      margin: 0;
      width: 100%;
    }
  }

  .detail-nearby {
    @include flex-row-center-center;
    height: calc(60vh + 1rem);
    margin-top: 2vh;
    &-left {
      display: none;
    }
    &-right {
      @include flex-col(12);
      height: 100%;
      padding-left: 0;
      padding-bottom: 1.5rem;
    }
  }

  .recommend-container {
    @include flex-row-flex-start-center;
    @include scroll;
    .card-container {
      @include card-flex;
    }
  }

  @include screen-up {
    .detail-header {
      &-title {
        @include flex-col(7);
        &-text {
          @include font-h1(bold);
        }
      }
      &-comment {
        &-stars {
          margin-right: .7rem;
        }
      }
      .detail-connect {
        @include flex-col(5);
        > * {
          width: auto;
          height: auto;
        }
        .call-btn {
          @include font-button(700);
          @include btn-icon-text;
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
        padding-left: 1.5rem;
      }
    }
    .detail-nearby {
      &-left {
        @include flex-col(5);
        @include scroll;
        padding: 0;
        height: 100%;
        display: block;
      }
      &-right {
        @include flex-col(7);
        padding-left: 1.5rem;
        padding-bottom: 0;
      }
    }
  }
</style>