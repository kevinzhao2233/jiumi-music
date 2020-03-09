<template>
  <div class="k-box">
    <Card>
      <h3 slot="title">云音乐榜</h3>
      <a class="link" slot="controls" href="/">更多</a>
      <ul class="content">
        <li class="list" v-for="item in toplist" :key="item.id" :title="item.name">
          <div
            class="img"
            :style="{
              background: `url(${item.coverImgUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }"
          ></div>
          <div
            class="img-bg"
            :style="{
              background: `url(${item.coverImgUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }"
          ></div>
        </li>
      </ul>
    </Card>
    <Card>
      <h3 slot="title">歌手榜</h3>
      <a class="link" slot="controls" href="/">更多</a>
      <ul class="content">
        <li class="list" v-for="item in artists" :key="item.id">
          <div
            class="img"
            :style="{
              background: `url(${item.picUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }"
          ></div>
          <div
            class="img-bg"
            :style="{
              background: `url(${item.picUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }"
          ></div>
          <div class="script-box">
            <span class="script">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/common/Card.vue'

export default {
  name: 'Ranking',
  components: {
    Card
  },
  data() {
    return {
      toplist: [
        {
          coverImgUrl: 'http://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg',
          name: '云音乐新歌榜',
          id: 0
        },
        {
          coverImgUrl: 'http://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg',
          name: '云音乐热歌榜',
          id: 1
        },
        {
          coverImgUrl: 'http://p2.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg',
          name: '网易原创歌曲榜',
          id: 2
        },
        {
          coverImgUrl: 'http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg',
          name: '云音乐飙升榜',
          id: 3
        },
        {
          coverImgUrl: 'http://p2.music.126.net/MJdmNzZwTCz0b4IpHJV6Wg==/109951162865487429.jpg',
          name: '云音乐歌手榜',
          id: 4
        }
      ],
      artists: [
        {
          name: '隔壁老樊',
          id: 12429072,
          picUrl:
            'https://p4.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg?param=120y120'
        },
        {
          name: '华晨宇',
          id: 861777,
          picUrl:
            'https://p4.music.126.net/tMH2KjUioNW57zbixCA5Pg==/109951164158510116.jpg?param=120y120'
        },
        {
          name: '薛之谦',
          id: 5781,
          picUrl:
            'https://p3.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg?param=120y120'
        },
        {
          name: '花粥',
          id: 8103,
          picUrl:
            'https://p4.music.126.net/KLsHaBhm7QSejQa8JB9ZtA==/109951162845812387.jpg?param=120y120'
        },
        {
          name: '毛不易',
          id: 12138269,
          picUrl:
            'https://p3.music.126.net/An-jp5B4VPsBT4QoteeGfA==/109951164528320422.jpg?param=120y120'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.link {
  color: $main-5;

  &:visited {
    color: $main-5;
  }

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: $main-7;
  }
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .list {
    position: relative;
    width: 17%;
    padding-top: 17%;
    text-align: center;

    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      z-index: 10;
      cursor: pointer;
    }

    .img-bg {
      position: absolute;
      top: 24%;
      left: 10%;
      width: 80%;
      height: 80%;
      border-radius: 40%;
      filter: blur(24px);
    }

    .script-box {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30%;
      background: linear-gradient(transparent, $main-4);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      z-index: 20;
      opacity: 0;
      transition: opacity 0.3s ease;

      .script {
        margin-bottom: 4px;
        color: $mid-2;
      }
    }

    &:hover {
      .script-box {
        opacity: 1;
      }
    }
  }
}
</style>
