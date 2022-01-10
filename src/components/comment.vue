<template>
  <div>
    <section class="comment-header">
      <section class="comment-header-left">
        <div class="border"></div>
        <h3 class="comment-score">{{ dataDetail.CommentScore }}</h3>
        <Stars class="comment-stars" :score="dataDetail.CommentScore"/>
        <p class="comment-count">{{ dataDetail.Comment && dataDetail.Comment.length || '0' }} 則評論</p>
      </section>
      <section class="comment-header-right">
        <button type="button" class="sort-btn">排序<img src="../assets/images/icon/sort.svg" alt="排序icon"></button>
        <button type="button" class="comment-btn" @click="expandCommentForm">撰寫評論<img src="../assets/images/icon/pin.svg" alt="撰寫評論icon"></button>
      </section>
    </section>
    <section class="comment-content">
      <template v-if="dataDetail.Comment && dataDetail.Comment.length > 0">
        <CommentCard v-for="comment in dataDetail.Comment" :comment="comment" :key="comment.id"/>
      </template>
      <template v-else><NoContent /></template>
    </section>
    <section class="comment-form" v-show="commentFormShow">
      <div class="form-tilte-block">
        <h3 class="form-title">撰寫評論</h3>
        <ul class="form-stars">
          <!-- 第一個是猜手的慣性消分數 -->
          <li @mouseover="changeCommentStar(0)" @click="changeCommentStar(0)" style="opacity: 0;">
            <img
              src="../assets/images/icon/star-grey.svg"
              alt="空icon">
          </li>
          <li @mouseover="changeCommentStar(1)" @click="changeCommentStar(1)">
            <img
              :src="commentForm.score >= 1 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
              :alt="commentForm.score >= 1 ? '滿星icon' : '空星icon'">
          </li>
          <li @mouseover="changeCommentStar(2)" @click="changeCommentStar(2)">
            <img
              :src="commentForm.score >= 2 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
              :alt="commentForm.score >= 2 ? '滿星icon' : '空星icon'">
          </li>
          <li @mouseover="changeCommentStar(3)" @click="changeCommentStar(3)">
            <img
              :src="commentForm.score >= 3 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
              :alt="commentForm.score >= 3 ? '滿星icon' : '空星icon'">
          </li>
          <li @mouseover="changeCommentStar(4)" @click="changeCommentStar(4)">
            <img
              :src="commentForm.score >= 4 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
              :alt="commentForm.score >= 4 ? '滿星icon' : '空星icon'">
          </li>
          <li @mouseover="changeCommentStar(5)" @click="changeCommentStar(5)">
            <img
              :src="commentForm.score >= 5 ? require('../assets/images/icon/star-filled.svg') : require('../assets/images/icon/star-grey.svg')"
              :alt="commentForm.score >= 5 ? '滿星icon' : '空星icon'">
          </li>
        </ul>
      </div>
      <input type="text" placeholder="輸入標題" ref="formTitle" v-model="commentForm.title" class="form-text">
      <textarea placeholder="我覺得..." v-model="commentForm.content" class="form-textarea"></textarea>
      <button type="submit" @click="sentForm" class="form-btn">送出評論</button>
    </section>
  </div>
</template>

<script>
import Stars from "@/components/stars.vue";
import NoContent from "@/components/no-content.vue";
import CommentCard from "@/components/comment-card.vue";

export default {
  name: "comment",
  props: ['dataDetail'],
  data() {
    return {
      commentFormShow: false,
      commentForm: {
        title: "",
        content: "",
        score: 0
      },
      mockStar: 4.5,
      MockData: [
        {
          id: 0,
          userId: 0,
          title: "氣氛佳，料理美味！",
          score: 5,
          content: "用餐環境的氣氛非常棒，很適合跟朋友喝酒聊天。料理的味道也非常有特色，推薦炙燒韓味牛菲力跟烘蛋。是會想再回頭的餐廳！",
          avatar: ""
        },
        {
          id: 1,
          userId: 1,
          title: "好吃",
          score: 4,
          content: "酒吧風格的裝潢，搭配傳統兼創新的韓國料理。食物本身非常好吃，店內桌數不多，一定要事先訂位。價格中上，適合跟很多朋友來聚會！",
          avatar: ""
        },
        {
          id: 2,
          userId: 3,
          title: "創意的韓式料理，辣度夠好吃",
          score: 4,
          content: "晚餐時間沒有訂位室內客滿。坐到戶外區略微熱，但店家有提供冷風扇蠻貼心的，室內裝潢工業風還有遊戲台可以玩，最重要的是餐點很好吃，尤其是菲力牛讓同行的友人大為驚豔，下次再訪會想試試酒類飲料。",
          avatar: ""
        },
      ]
    }
  },
  methods: {
    expandCommentForm() {
      this.commentFormShow = !this.commentFormShow;
      this.$refs.formTitle.focus();
    },
    changeCommentStar (score) {
      this.commentForm.score = score;
    },
    sentForm () {
      this.$store.dispatch("serverModule/postCommentToServer", { commentForm: this.commentForm, id: this.dataDetail.ID, vm: this });
      this.commentForm = {
        title: "",
        content: "",
        score: 0
      };
      window.alert("評論更新！");
    }
  },
  components: {
    Stars,
    NoContent,
    CommentCard
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/main.scss";

  .comment-header {
    @include flex-row-space-between-center;
    &-left {
      @include flex-row-flex-start-center;
      .border {
        display: none;
      }
      .comment-score {
        @include font-h4(700);
        color: $grey-700;
      }
      .comment-stars {
        width: 30%;
        margin: 0 .5rem;
      }
      .comment-count {
        @include font-caption(500);
        color: $grey-500;
        margin-left: .5rem;
      }
    }
    &-right {
      @include flex-row-center-center;
      .sort-btn {
        @include text-icon-2-icon;
        @include btn-outline;
      }
      .comment-btn {
        @include text-icon-2-icon;
        @include btn-filled;
        margin-left: .5rem;
      }
    }
  }
  .comment-form {
    @include flex-column-center-baseline;
    width: 100%;
    > * {
      margin: .5rem 0;
    }
    .form-tilte-block {
      @include flex-row-space-between-center;
      width: 100%;
      .form-title {
        @include font-h3(bold);
        color: $primary-800;
      }
      .form-stars {
        @include flex-row-flex-start-center;
        li {
          img {
            width: 100%;
          }
        }
      }
    }
    .form-text, .form-textarea {
      width: 100%;
      border: 1px solid $grey-300;
      padding: .75rem;
    }
    .form-textarea {
      height: 10rem;
    }
    .form-btn {
      @include btn-text;
      @include btn-filled;
      align-self: center;
    }
  }

  @include screen-up {
    .comment-header {
      &-left {
        .border {
          display: block;
          width: 5rem;
          height: 50%;
          border-top: 1px solid $grey-500;
          margin-right: .5rem;
        }
        .comment-score {
          @include font-h2(700);
          color: $grey-700;
        }
        .comment-count {
          @include font-content(500);
          color: $grey-500;
          margin-left: .5rem;
        }
      }
      &-right {
        .sort-btn {
          @include btn-outline;
        }
        .comment-btn {
          @include btn-filled;
          > img {
            display: none;
          }
        }
      }
    }
    .form-btn {
      align-self: flex-end;
    }
  }

</style>