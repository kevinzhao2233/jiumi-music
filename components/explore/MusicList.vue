<template>
  <div class="e-container">
    <div class="left-box">
      <h3 class="tit">每日歌曲推荐</h3>
      <ul class="list-box">
        <li class="item" v-for="(item, index) in mscList" :key="item.id">
          <div class="left">
            <span class="num">{{
              index + 1 < 10 ? `0${index + 1}` : index + 1
            }}</span>
            <i class="n-btn"></i>
            <i
              class="pic"
              :style="{
                background: `url(${item.album.picUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }"
            ></i>
            <div class="content">
              <span class="msc-name">{{ item.name }}</span>
              <div class="msc-art">
                <span
                  class="name"
                  v-for="(art, index) in item.artists"
                  :key="art.id"
                >
                  {{ art.name }}
                  <span
                    class="placeholder"
                    v-if="index < item.artists.length - 1"
                    >/</span
                  >
                </span>
              </div>
            </div>
          </div>
          <div class="right">
            <span class="time">{{
              parseInt(item.duration / 60000) +
                ':' +
                parseInt(
                  (item.duration / 60000 - parseInt(item.duration / 60000)) * 60
                )
            }}</span>
            <i class="btn"></i>
            <i class="btn"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="right-box item-box"></div>
  </div>
</template>
<script>
export default {
  name: 'MusicList',
  data() {
    return {
      mscList: [
        {
          name: '说客',
          id: 13759205060,
          artists: [
            {
              name: '音阙诗听',
              id: 12174521
            },
            {
              name: '新乐尘符',
              id: 12503194
            }
          ],
          album: {
            name: '说客',
            id: 80218150,
            picId: 109951164192393040,
            blurPicUrl:
              'http://p1.music.126.net/DTfwf48BEF1wTCqjWp2kgA==/109951164192393040.jpg',
            pic: 109951164192393040,
            picUrl:
              'http://p1.music.126.net/DTfwf48BEF1wTCqjWp2kgA==/109951164192393040.jpg'
          },
          duration: 233333,
          reason: '根据你可能喜欢的单曲 藏'
        },
        {
          name: '说客',
          id: 13759205061,
          artists: [
            {
              name: '音阙诗听',
              id: 12174521
            },
            {
              name: '新乐尘符',
              id: 12503194
            }
          ],
          album: {
            name: '说客',
            id: 80218150,
            picId: 109951164192393040,
            blurPicUrl:
              'http://p1.music.126.net/DTfwf48BEF1wTCqjWp2kgA==/109951164192393040.jpg',
            pic: 109951164192393040,
            picUrl:
              'http://p1.music.126.net/DTfwf48BEF1wTCqjWp2kgA==/109951164192393040.jpg'
          },
          duration: 233333,
          reason: '根据你可能喜欢的单曲 藏'
        },
        {
          name: '说客',
          id: 13759205062,
          artists: [
            {
              name: '音阙诗听',
              id: 12174521
            },
            {
              name: '新乐尘符',
              id: 12503194
            }
          ],
          album: {
            name: '说客',
            id: 80218150,
            picId: 109951164192393040,
            blurPicUrl:
              'http://p1.music.126.net/DTfwf48BEF1wTCqjWp2kgA==/109951164192393040.jpg',
            pic: 109951164192393040,
            picUrl:
              'http://p1.music.126.net/DTfwf48BEF1wTCqjWp2kgA==/109951164192393040.jpg'
          },
          duration: 233333,
          reason: '根据你可能喜欢的单曲 藏'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/config.scss';

.e-container {
  display: flex;
  margin-top: 12px;
  padding: 0 48px;
  width: 100%;

  .left-box {
    flex: 1;
    height: 2000px;

    .tit {
      margin-bottom: 16px;
      font-weight: 600;
      letter-spacing: 2px;
    }

    .list-box {
      margin: 0 40px 200px 0;

      .item {
        display: flex;
        justify-content: space-between;
        margin: 4px 0;
        padding: 0 12px;
        width: 100%;
        height: 58px;
        border-radius: 6px;
        color: $mid-7;
        transition: background-color 0.3s ease;
        overflow: hidden;

        .left {
          display: flex;
          align-items: center;
          overflow: hidden;

          .num {
            text-align: center;
            width: 24px;
            height: 24px;
            font-size: 12px;
            line-height: 24px;
            font-weight: 500;
          }

          .n-btn {
            width: 24px;
            height: 24px;
            background-color: #fff;
            border-radius: 4px;
            display: none;
          }

          .pic {
            margin: 0 16px 0 8px;
            width: 36px;
            height: 36px;
            border-radius: 6px;
          }

          .content {
            width: 150px;
            display: flex;
            flex-direction: column;

            .msc-name {
              width: 100%;
              display: inline-block;
              font-size: 14px;
              font-weight: 600;
              color: $mid-10;
              line-height: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .msc-art {
              width: 100%;
              display: inline-block;
              font-size: 13px;
              line-height: 16px;
              overflow: hidden;
              white-space: nowrap;

              .name {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:hover {
                  text-decoration: underline;
                  cursor: pointer;
                }
              }

              .placeholder {
                color: $mid-5;
              }
            }
          }
        }

        .right {
          display: flex;
          align-items: center;

          .time {
            padding: 0 20px;
            font-size: 14px;
            font-weight: 500;
          }

          .btn {
            margin: 0 4px;
            width: 28px;
            height: 28px;
            background-color: #ddd;
            border-radius: 4px;
          }
        }

        &:hover {
          background-color: $main-6;
          color: $main-2;

          .left {
            .content .msc-name {
              color: $mid-1;
            }
            .n-btn {
              display: block;
            }

            .num {
              display: none;
            }
          }
        }
      }
    }
  }

  .right-box {
    flex: 0 0 460px;
    width: 460px;
    height: 500px;
    background-color: #fff;
  }
}
</style>
