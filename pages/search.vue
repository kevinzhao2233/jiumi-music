<template>
  <div class="container">
    <div class="header">
      <div class="search-box"></div>
      <div class="tip-box">
        <div class="tip">
          <span class="tit">热门搜索：</span>
          <span class="keywords" v-for="(item, index) in keywords" :key="index">{{ item }}</span>
        </div>
        <div class="tip">
          <span class="tit">历史搜索：</span>
          <span class="keywords" v-for="(item, index) in keywords" :key="index">{{ item }}</span>
          <i class="icon iconfont icon-trash"></i>
        </div>
      </div>
    </div>
    <div class="hot">
      
    </div>
    <div class="list-box"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: ['李荣浩新歌', '树读', '歌手', '我们的乐队', '吉卜力']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/config.scss';
.container {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 256px;
    background: no-repeat url('~static/img/banner-1.jpg');

    .search-box {
      width: 640px;
      height: 52px;
      background-color: $mid-1;
      border-radius: 15px;
    }

    .tip-box {
      margin-top: 24px;
      color: $mid-1;

      .tip {
        margin: 12px 0;
        white-space: nowrap;

        .keywords {
          margin: 0 4px;
        }

        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border-radius: 40%;
          margin: 0 0 0 12px;
          transition: all 0.2s ease-out;
          cursor: pointer;

          &:hover {
            background-color: #fff;
            color: $main-6;
            box-shadow: 0 4px 24px -4px $mid-7;
          }
          &:active {
            box-shadow: 0 4px 24px -4px $mid-2;
          }
        }
      }
    }
  }
}
</style>
