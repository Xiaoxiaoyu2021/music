<template>
  <div class="hot">
    <div class="picture">
      <div class="hotImg"></div>
      <p>更新日期：{{todayDate()}}</p>
    </div>

    <ul>
      <li
        class="songItem"
        v-for="(item, index) in songLists"
        :key="item.al.id"
        :item="item"
        :playing="playing"
        :currentSongId="currentSongId"
        @click="
          $emit('change-current-song', item);
          $emit('change-current-play-list', songLists);
        "
      >
        {{ (index + 1).toString().padStart(2, "0") }}
        <div class="songDetail">
          <div class="song">
            {{ item.name }}
            <span v-for="a in item.alia" :key="a">{{ a }}</span>
          </div>
          <div class="singer">
            <i class="artist" v-for="artist in item.ar" :key="artist.id">
              {{ artist.name }}
            </i>

            <b>{{ item.al.name }}</b>
          </div>
        </div>
        <div class="icon">
          <div
            class="play"
            :class="{ current: currentSongId === item.id, playing: playing }"
          >
            <i></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    playing: Boolean,
    currentSongId: {
      type: Number,
    },
  },
  data: function () {
    return {
      songLists: null,
      hotSong: null,
    };
  },
  methods: {
    todayDate:function() {
      const date = new Date();
      var day = date.getDate();
      var month = date.getMonth();

      if(day < 10){
        return `${month + 1}月0${day}日`;
      }else{
        return `${month + 1}月${day}日`;
      }
    },
  },
  created: function () {
    this.axios
      .get("http://apis.netstart.cn/music/playlist/detail/", {
        params: {
          id: 3778678,
        },
      })
      .then((res) => {
        // console.log(res);
        this.hotSong = res.data.playlist;
        var song = res.data.playlist.tracks;
        // console.log(song);
        this.songLists = song.splice(0, 20);
        // console.log(this.songLists);
      });
  },
};
</script>

<style lang="less" scoped>
.hot {
  width: 100%;
  height: auto;
  .picture {
    width: 100%;
    background: skyblue;
    padding-left: 20px;
    background-size: cover;
    background-image: url(https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=);
    background-repeat: no-repeat;
    padding-top: 30px;
    padding-bottom: 30px;

    .hotImg {
      width: 142px;
      height: 67px;
      background-size: 166px 97px;
      background-position: -24px -30px;
      background-image: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=);
    }
    p {
      font-size: 10px;
      color: #fff;
      margin-top: 12px;
    }
  }

  ul {
    .songItem {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 2px solid rgb(240, 240, 240);
      margin-top: 5px;
      padding-left: 12px;
      font-size: 17px;
      display: flex;
      flex: 1;
      margin-right: 23px;

      .songDetail {
        margin-left: 20px;
        width: 80%;
        .song {
          height: 25px;
          line-height: 25px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;

          span {
            color: #888;
            &::before {
              content: "(";
            }
            &::after {
              content: ")";
            }
          }
        }

        .singer {
          font-size: 12px;
          color: #888;
          line-height: 1.8;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;

          i.artist {
            font-style: normal;
            &:after {
              content: "/";
              margin: 0 3px;
            }
            &:last-of-type {
              &::after {
                content: "-";
                margin: 0 5px;
              }
            }
          }

          b {
            font-weight: normal;
          }
        }
      }

      .icon {
        width: 22px;
        height: 22px;
        margin-top: 12px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .play {
          width: 100%;
          height: 100%;
          background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png");
          background-repeat: no-repeat;
          background-size: 166px auto;
          background-position: -24px 0;
        }
      }
    }
  }
}
</style>
