<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" @on-click-menu="clickMenu" v-model="showMenu" show-cancel></actionsheet>
    </div>

    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="showMode"
      :placement="placement"
      :drawer-style="{'background-color':'#35495e', width: '200px',height:'auto'}">

      <!-- drawer content -->
      <div slot="drawer">
        <group title="图片管理" style="margin-top:20px;">
          <cell title="图片列表" link="/home/piclist" value="查看" @click.native="drawerVisibility = false">
          </cell>
          <cell title="上传图片" link="/home/uploadpic" value="上传" @click.native="drawerVisibility = false">
          </cell>
        </group>
      </div>

      <!-- main content -->
      <view-box ref="viewBox" body-padding-top="46px">

        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;"
                  :left-options="leftOptions"
                  :right-options="rightOptions"
                  :title="title"
                  :transition="headerTransition"
                  @on-click-more="onClickMore">
          <span v-if="path==='/home'" slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>

        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition
          @after-enter="afterEnter"
          :name="viewTransition" :css="!!direction">
          <router-view class="router-view"></router-view>
        </transition>
      </view-box>
    </drawer>
    <div v-show="piclist.showBottom"
         style="height:35px;text-align: center;width:100%;position:fixed;bottom:0;background-color: #f7f7fa">
      <flexbox :gutter="0">
        <flexbox-item :span="2">
          <check-icon :value.sync="piclist.checkAll">全选</check-icon>
        </flexbox-item>
        <flexbox-item :span="8"></flexbox-item>
        <flexbox-item :span="2" style="text-align: right">
          <x-button mini type="warn" @click.native="delPics">删除({{piclist.delCount}})</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import {
    ConfirmPlugin ,
    CheckIcon,
    XButton,
    Flexbox,
    FlexboxItem,
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    TransferDom
  } from 'vux'
  import Vue from 'vue'
  import {mapState, mapActions} from 'vuex'
  import {logout} from '../../util/beApi'

  Vue.use(ConfirmPlugin);

  export default {
    directives: {
      TransferDom
    },
    components: {
      CheckIcon,
      Flexbox,
      XButton,
      FlexboxItem,
      Radio,
      Group,
      Cell,
      Badge,
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      Loading,
      Actionsheet
    },
    methods: {
      onClickMore() {
        this.showMenu = true;
      },
      async clickMenu(menuKey, item) {
        if (item && item.label === '注销登陆') {
          let res = await logout();
          if (res.data.code === 1) {
            this.LOGOUT();
            this.$router.push('/');
          }
        }
      },
      afterEnter() {
        this.$vux && this.$vux.bus && this.$vux.bus.$emit('vux:after-view-enter');
      },
      ...mapActions({LOGOUT: state => state.LOGOUT}),
      delPics() {
        let self = this;
        this.$vux.confirm.show({
          title: '删除图片',
          content: '确定要全部删除？',
          confirmText: '确定',
          cancelText: '取消',
          onConfirm() {
            self.piclist.del = true;
          }
        })
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        deviceready: state => state.app.deviceready,
        demoTop: state => state.vux.demoScrollTop,
        isLoading: state => state.vux.isLoading,
        direction: state => state.vux.direction,
        piclist: state => state.piclist
      }),
      leftOptions() {
        return {
          showBack: this.path != '/home'
        }
      },
      rightOptions() {
        return {
          showMore: true
        }
      },
      headerTransition() {
        if (!this.direction) return ''
        return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
      },
      title() {
        return this.route.meta.title;
      },
      viewTransition() {
        if (!this.direction) return ''
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
    data() {
      return {
        showMenu: false,
        showMode: 'push',
        placement:
          'left',
        menus:
          {
            menu1: {
              label: '注销登陆',
              type:
                'warn'
            }
          }
        ,
        drawerVisibility: false,
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  body {
    background-color: #fbf9fe;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .demo-icon-22 {
    font-family: 'vux-demo';
    font-size: 22px;
    color: #888;
  }

  .demo-icon-22:before {
    content: attr(icon);
  }

  .vux-demo-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  @font-face {
    font-family: 'vux-demo';  /* project id 70323 */
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
    src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
    url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
  }

  .demo-icon {
    font-family: 'vux-demo';
    font-size: 20px;
    color: #04BE02;
  }

  .demo-icon-big {
    font-size: 28px;
  }

  .demo-icon:before {
    content: attr(icon);
  }

  .router-view {
    width: 100%;
    top: 46px;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .menu-title {
    color: #888;
  }
</style>
