<template>
  <div class="container-fluid">
    <div class="container">
      <nav class="breadcrumbs">未完成 > 麵包屑 > 未完成</nav>
      <section class="detail-header">
        <div class="detail-header-title">
          <h1 class="detail-header-title-text">{{ dataDetail.Name }}</h1>
          <div class="detail-header-comment">
            <Stars />
            <div class="detail-header-comment-count">{{ dataDetail.Comment && dataDetail.Comment.length || '100' }} 則評論</div>
          </div>
          <ul class="detail-tags">
            <li class="detail-tag" v-for="tag in ['文化活動', '熱鬧', '一年一度']" :key="tag">{{ tag }}</li>
          </ul>
        </div>
        <div class="detail-connect">
          <a class="call-btn" :href="`tel:${dataDetail.Phone}`">撥打電話<img src="../assets/images/icon/phone.svg" alt="撥打電話icon"></a>
          <a class="web-btn" :href="dataDetail.WebsiteUrl"><img src="../assets/images/icon/web.svg" alt="前往網站icon"></a>
          <div :class="favorites.includes(dataDetail.ID) ? 'favorite-btn filled' : 'favorite-btn'" @click.prevent.stop="changeFavorite(dataDetail.ID, !favorites.includes(dataDetail.ID))">
            <img v-show="favorites.includes(dataDetail.ID)" src="../assets/images/icon/heart-filled.svg" alt="加入我的最愛icon">
            <img v-show="!favorites.includes(dataDetail.ID)" src="../assets/images/icon/heart-outline.svg" alt="加入我的最愛icon">
          </div>
        </div>
      </section>
      <section class="detail-section">
        <div class="detail-section-left">
          <div class="detail-left-content">
            <div class="detail-about">
              <h2 class="detail-title">關於</h2>
              <div class="detail-content">{{ dataDetail.Description }}</div>
            </div>
            <div class="detail-address">
              <h2 class="detail-title">地址</h2>
              <div class="detail-content">{{ dataDetail.Address }}</div>
            </div>
            <div class="detail-opentime">
              <h2 class="detail-title">營業時間</h2>
              <div class="detail-content opentime">{{ dataDetail.OpenTime }}</div>
            </div>
          </div>
        </div>
        <div class="detail-section-right">
          <div class="detail-right-content">
            <div class="show-image" :style="{ backgroundImage: `url(${dataDetail.showPicture})` }" :alt="dataDetail.showPicture ? '景點大圖' : '找不到圖片'"></div>
            <ul class="imgs-row">
              <template v-if="!dataDetail.Picture">
                <li v-for="item in imageList" :key="item" class="img-empty"><img src="../assets/images/icon/empty-img-sm.svg" alt="找不到圖片"></li>
              </template>
              <template v-else>
                <li v-for="(item, index) in imageList" :key="item"
                  @click="checkImage(dataDetail.Picture[`PictureUrl${index + 1}`])"
                  :class="{'img-small': dataDetail.Picture[`PictureUrl${index + 1}`], 'img-empty': !dataDetail[`PictureUrl${index + 1}`] }"
                  >
                  <img 
                    :src="dataDetail.Picture[`PictureUrl${ index + 1 }`] || require('../assets/images/icon/empty-img-sm.svg')"
                    :alt="dataDetail.Picture[`PictureDescription${ index + 1 }`] || '找不到圖片'">
                </li>
              </template>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 class="detail-title">{{ classType_zh }}特色</h2>
        <div v-if="!dataDetail.DescriptionDetail" class="no-content">目前資料不足！</div>
        <article v-if="dataDetail.DescriptionDetail" class="detail-content">{{ dataDetail.DescriptionDetail }}</article>
      </section>

      <section>
        <h2 class="detail-title">{{ dataDetail === "restaurants" ? '餐點推薦' : '服務設施' }}</h2>
        <div v-if="!dataDetail.Features2" class="no-content">目前資料不足！</div>
        <div v-if="dataDetail.Features2" class="detail-content">{{ dataDetail.Features2 }}</div>
      </section>

      <section v-if="dataDetail.ServiceInfo">
        <h2 class="detail-title">服務設施</h2>
        <div v-if="dataDetail.ServiceInfo" class="detail-content">{{ dataDetail.ServiceInfo }}</div>
      </section>

      <section>
        <h2 class="detail-title">交通方式</h2>
        <div v-if="!dataDetail.TravelInfo" class="no-content">製作中！</div>
        <article v-if="dataDetail.TravelInfo" class="detail-content">{{ dataDetail.TravelInfo }}</article>
      </section>

      <section>
        <h2 class="detail-title">鄰近景點</h2>
        <div class="detail-nearby">
          <div class="detail-left">製作中</div>
          <div class="detail-right">
            <div class="map">
              製作中
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="detail-title">旅客評價</h2>
        <div v-if="!dataDetail.Comments" class="no-content">此{{ classType_zh }}尚無評論！</div>
        <div v-if="dataDetail.Comments">
          <!-- ... -->
        </div>
      </section>

      <section>
        <h2 class="detail-title">這些景點大家也推</h2>
        <div class="recommend-container">
          <div v-for="item in recommendList" :key="item.ID" class="card-container">
            <Card :key="item.ID" :item="item" :type="dataType" :classType="'commonCard'"/>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stars from "@/components/stars.vue";

export default {
  name: "detail",
  data() {
    return {
      dataType: "",
      imageList: new Array(5),
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
    ...mapGetters(['dataDetail', 'favorites']),
  },
  methods: {
    getDetail() {
      const id =  this.$route.params.id;
      this.dataType = this.$route.params.type;
      this.$store.dispatch("getSingleTypeDetail", id);
    },
    checkImage(PictureUrl) {
      if (PictureUrl) this.$store.dispatch("changeDetailShowPicture", PictureUrl);
    },
    changeFavorite(id, add) {
      !this.$store.getters.heartIsLoading && this.$store.dispatch("changeFavoriteToData", { dataId: id, add: add });
    }
  },
  created() {
    this.getDetail();
  },
  components: {
    Stars
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .container {
    @include content-padding(.1vh);
  }

  .breadcrumbs {
    @include font-button(500);
    color: $grey-500;
    margin-top: $nav-height;
  }

  section {
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

  .no-content {
    @include flex-row-center-center;
    @include font-h3(bold);
    color: $grey-300;
    padding: 30px;
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

  $show-image-h: 45vh;
  $imgs-h: 15vh;
  .detail-section {
    @include flex-column-center-baseline;
    flex-direction: column-reverse;
    &-left {
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
    &-right {
      @include flex-col(12);
      padding-left: 0;
      padding-bottom: 1.5rem;
      margin: 0;
      width: 100%;
      .detail-right-content {
        border: 8px solid $grey-800;
        .show-image {
          height: $show-image-h;
          background-image: url("../assets/images/empty-img.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .imgs-row {
          @include flex-row-center-center;
          height: $imgs-h;
          border-top: .5rem solid $grey-800;
          li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4) {
            border-right: .5rem solid $grey-800;
          }
          border-collapse: collapse;
          .img-small {
            width: 100%;
            height: 100%;
            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .img-empty {
            @include flex-row-center-center;
            width: 100%;
            height: 100%;
            background-color: $grey-300;
          }
        }
      }
    }
  }

  .detail-nearby {
    .detail-nearby {
      @include flex-row-center-center;
      .detail-left {
        @include flex-col(5);
      }
      .detail-right {
        @include flex-col(7);
        height: 600px;
        .map {
          @include flex-row-center-center;
          @include font-h2(bold);
          width: 100%;
          height: 100%;
          background-color: $grey-300;
          border-radius: .5rem;
          color: $grey-100;
        }
      }
    }
  }
  .detail-recommend {
    .recommend-container {
      @include flex-row-center-center;
      flex-wrap: wrap;
      .card-container {
        @include card-flex;
      }
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
    .detail-section {
      @include flex-row-center-flex-start;
      &-left  {
        @include flex-col(5);
        padding: 0;
        .detail-left-content {
          border: 1px solid $grey-300;
          padding: 1.5rem;
        }
      }
      &-right {
        @include flex-col(7);
        padding-left: 1.5rem;
      }
    }
  }
</style>