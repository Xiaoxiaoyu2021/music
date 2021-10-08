<template>
  <div class="search" @scroll="scroll">
    <input
      type="text"
      placeholder="搜索歌曲、歌手、专辑"
      v-model.trim="value"
      @keyup.enter="value && (searching = true)"
      @focus="inputing = true"
      @blur="inputing = false"
    />

    <section class="hots" v-if="!value && !searching">
      <h5>热门搜索</h5>
      <ul>
        <li
          v-for="hot in hots"
          :key="hot.first"
          @click="
            searching = true;
            value = hot.first;
          "
        >
          {{ hot.first }}
        </li>
      </ul>
      <ol>
        <li
          v-for="h in history"
          :key="h"
          @click="
            searching = true;
            value = h;
          "
        >
          {{ h }}
          <span @click.stop="deleteHistory"></span>
        </li>
      </ol>
    </section>

    <section class="suggests" v-if="value && !searching">
      <h5>搜索建议</h5>
      <ul>
        <li
          class="searchSuggestions"
          v-for="(sug, index) in suggests"
          :key="index"
          @click="
            searching = true;
            value = sug.keyword;
          "
        >
          <div class="loupe"></div>
          {{ sug.keyword }}
        </li>
      </ul>
    </section>

    <section class="suggests" v-if="searching">
      <h5>搜索结果</h5>
      <ul>
        <SongListItem
          v-for="(item, index) in searchResults"
          :key="index"
          :item="item"
          :currentSongId="currentSongId"
          :playing="playing"
          @change-current-song="
            $emit('change-current-song', item);
            $emit('change-current-play-list', searchResults);
          "
        >
        </SongListItem>
      </ul>
      <p v-if="!hasMore">没有更多了</p>
    </section>
  </div>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";

export default {
  components: {
    SongListItem,
  },
  props: {
    playing: Boolean,
    currentSongId: {
      type: Number,
    },
  },
  data: function () {
    return {
      hots: [],
      suggests: [],
      searchResults: [],
      value: "",
      searching: false,
      inputing: false,
      page: 0,
      hasMore: false,
      history: JSON.parse(window.localStorage.getItem("history")) || [],
    };
  },
  methods: {
    scroll: function (event) {
      //   console.log(event);
      if (this.hasMore) {
        if (
          event.target.offsetHeight + event.target.scrollTop ===
          event.target.scrollHeight
        ) {
          console.log("触底");

          this.getSearch();
        }
      } else {
        console.log("没有更多了");
      }
    },

    getSearch: function () {
      this.axios
        .get("/search", {
          params: {
            keywords: this.value,
            limit: 30,
            offset: this.page * 30,
          },
        })
        .then((res) => {
          // console.log(res.data.result.songs);
          this.searchResults.push(...res.data.result.songs);
          this.page++;
          this.hasMore = res.data.result.hasMore;
        });

      // 记录
      // this.history.push(this.value);
      this.history = [...new Set([...this.history, this.value])];
      window.localStorage.setItem("history", JSON.stringify(this.history));
    },

    deleteHistory:function(index){
      this.history.splice(index,1);
      window.localStorage.setItem("history", JSON.stringify(this.history));
    }
  },

  created: function () {
    this.axios.get("/search/hot").then((res) => {
      this.hots = res.data.result.hots;
    });
  },

  watch: {
    value: function (n) {
      if (this.inputing) {
        this.searching = false;
      }
      if (n && !this.searching) {
        this.axios
          .get("/search/suggest", {
            params: {
              keywords: n,
              type: "mobile",
            },
          })
          .then((res) => {
            this.suggests = res.data.result.allMatch;
          });
      } else {
        this.suggests = [];
      }
    },
    searching: function (n) {
      if (n && this.value) {
        this.getSearch();
      } else {
        this.searchResults = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  padding: 10px;
  input {
    width: 100%;
    height: 30px;
    background: #ebecec;
    border: 1px solid #ebecec;
    padding: 15px 10px;
    border-radius: 20px;
    margin-bottom: 15px;
    margin-top: 5px;
    outline: medium;
  }

  .hots {
    border-top: 2px solid #f2f2f2;
    h5 {
      font-size: 12px;
      color: #7e7e7e;
      margin: 10px 0 10px;
    }
    ul {
      overflow: hidden;
      margin: 10px 0 7px;
      li {
        height: 32px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 14px;
        line-height: 32px;
        color: #333;
        float: left;
        border: 1px solid #e5e6e9;
        border-radius: 20px;
        font-size: 14px;
      }
    }

    ol {
      li {
        list-style: none;
        border-top: 2px solid #f2f2f2;
        height: 40px;
        padding-right: 10px;
        font-size: 15px;
        line-height: 40px;
        color: #333;
        position: relative;
        span {
          display: inline;
          float: right;
          width: 12px;
          height: 12px;
          position: absolute;
          top: 14px;
          right: 10px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
        }
      }
    }
  }

  .suggests {
    border-top: 2px solid #f2f2f2;
    h5 {
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      color: #507daf;
    }

    ul {
      li {
        border-top: 2px solid #f2f2f2;
        padding-right: 10px;
        font-size: 15px;
        color: #333;
      }

      li.searchSuggestions {
        height: 40px;
        line-height: 40px;
        .loupe {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=);
        }
      }
    }
  }
}
</style>