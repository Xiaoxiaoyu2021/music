<template>
  <div v-if="detail">
    <div
      class="header"
      :style="{
        backgroundImage: `url(${detail.coverImgUrl}?param=170y170)`
      }"
    >
      <div class="content">
        <div class="left">
          <img
            :src="`${detail.coverImgUrl}?imageView=1&type=webp&thumbnail=379x0`"
          />
          <span class="song">歌单</span>
          <span class="Playback"
            ><img
              style="width: 10px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+"
              alt=""
            />
            {{ detail.playCount | parseCount }}</span
          >
        </div>

        <div class="right">
          <h2>{{ detail.name }}</h2>
          <div class="creator">
            <div class="photo">
              <img
                :src="`${detail.creator.avatarUrl}?imageView=1&type=webp&thumbnail=91x0`"
              />
            </div>
            <span>{{ detail.creator.nickname }}</span>
          </div>
        </div>
      </div>
    </div>
    <h3>歌曲列表 </h3>
    <ul>
      <!-- <li v-for="item in detail.tracks" :key="item.id">{{ item.name }}</li> -->
      <SongListItem
        v-for="(item, index) in detail.tracks"
        :key="item.id"
        :item="item"
        @change-current-song="
          $emit('change-current-song', item);
          $emit('change-current-play-list', detail.tracks);
        "
        :currentSongId="currentSongId"
        :playing="playing"
        :class="{ lt3: index < 3 }"
        >{{ index + 1 }}</SongListItem
      >
    </ul>
  </div>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";
export default {
  components: {
    SongListItem,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  filters: {
    parseCount: function (value) {
      // return value + "0";
      if (value > 100000000) {
        return (value / 100000000).toFixed(1) + "亿";
      } else if (value > 10000) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    },
  },
  data: function () {
    return {
      detail: null,
    };
  },
  methods: {
    getPlayListDetail: function (id) {
      this.axios
        .get("/playlist/detail", {
          params: {
            id,
          },
        })
        .then((res) => {
          console.log(res);
          this.detail = res.data.playlist;
        });
    },
  },

  created: function () {
    this.getPlayListDetail(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  padding: 30px 10px 30px 15px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  // filter: blur(30px);
  // background-color: skyblue;

  .content {
    display: flex;
    .left {
      width: 145px;
      height: 145px;
      position: relative;

      .song {
        position: absolute;
        top: 10px;
        left: 0;
        padding: 0 8px;
        height: 17px;
        color: #fff;
        font-size: 9px;
        text-align: center;
        line-height: 17px;
        background-color: rgba(217, 48, 48, 0.8);
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }

      .Playback {
        position: absolute;
        top: 3px;
        right: 3px;
        font-size: 10px;
        color: white;
      }
    }

    .right {
      -webkit-box-flex: 1;
      margin-left: 16px;
      flex: 1 1 auto;
      width: 1%;

      h2 {
        padding-top: 1px;
        font-size: 17px;
        line-height: 1.3;
        color: #fefefe;
        // color: skyblue;
        height: 44px;
        display: -webkit-box;
      }

      .creator {
        display: block;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        margin-top: 5px;

        .photo {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
          }
        }

        span {
          color: #e7e8e9;
        }
      }
    }
  }
}

h3 {
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
}
</style>