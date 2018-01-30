<template>
  <div>
    <scroller lock-x scrollbar-y use-pullup height="100%" @on-scroll-bottom="loadMore" ref="picScroll"
              :scroll-bottom-offst="200">
      <div class="demo-list-box" id="demo_list_box" style="height: 100%">

        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(pic,index) in pics" :key="index"
                        class="pics cbox vux-1px-t vux-tap-active">
            <div v-if="!longTap" class="vux-1px-r cbox-inner" @click.native="show(index)" @touchstart="touchStart"
                 @touchend="touchEnd">
              <img :src="pic.src" width="100%" height="100%">
            </div>
            <div v-else :class="delPics[index]?'demo5-item-selected':'demo5-item'" @click="update(index)">
              <img :src="pic.src" width="100%" height="100%">
            </div>
            <!--<checker v-else-->
            <!--v-model="delPics[index]"-->
            <!--type="checkbox"-->
            <!--default-item-class="demo5-item"-->
            <!--selected-item-class="demo5-item-selected">-->
            <!--<checker-item @on-item-click="del" :value="index"><img :src="pic.src" width="100%" height="100%">-->
            <!--</checker-item>-->
            <!--</checker>-->
          </flexbox-item>
        </flexbox>
      </div>
    </scroller>

    <div v-transfer-dom>
      <previewer :list="pics" ref="previewer" :options="options">
      </previewer>
    </div>
  </div>
</template>


<script>
  import {
    XButton,
    Icon,
    Scroller,
    Flexbox,
    FlexboxItem,
    LoadMore,
    Previewer,
    TransferDom
  } from 'vux'
  import {mapState} from 'vuex'
  import {getImgs, delImgs} from "../../util/beApi";

  export default {
    directives: {
      TransferDom
    },
    components: {
      XButton,
      Icon,
      Scroller,
      Flexbox,
      FlexboxItem,
      LoadMore, Previewer, TransferDom
    },
    activated() {
      document.querySelector('#demo_list_box').scrollTop = this.demoTop
    },
    methods: {
      show(index) {
        this.$refs.previewer.show(index)
      },
      delPic() {
        for (let index in this.delPics) {
          if (this.delPics[index]) {
            this.ids.push(this.pics[index].id);
            this.pics.slice(index, 1);
          }
        }
        delImgs(this.ids);
      },
      update(index) {
        this.$set(this.delPics, index, !this.delPics[index]);
        if (this.delPics[index]) {
          this.delCount++;
        }
      },
      loadMore() {
        if (!this.onFetching) {
          this.onFetching = true
          setTimeout(() => {
            this.index++;
            this.getPics();
            this.$nextTick(() => {
              this.$refs.picScroll.reset()
            });
            this.onFetching = false
          }, 1000)
        }
      },
      async getPics() {
        let res = await getImgs(15, this.index);
        this.pics = this.pics.concat(res.data.data);
      },
      touchStart() {
        var self = this;
        timeout = setTimeout(function (e) {
          self.longTap = true;
          self.$parent.showBottom = true;
        }, 800);  //长按时间超过800ms，则执行传入的方法
      },
      touchEnd() {
        clearTimeout(this.timeout);
      },
      checkAll() {
        for (let index in this.delPics) {
          this.update(index);
        }
      }
    },
    data() {
      return {
        height: window.innerHeight - 46 - 53,
        pics: [],
        timeout: null,
        index: 0,
        longTap: true,
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.pics')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
        ids: [],
        delPics: [],
      }
    },
    mounted() {
      this.getPics();
    },
    computed: {
      ...mapState({
        demoTop: state => state.vux.demoScrollTop,
        del: state => state.piclist.del,
        checkAll: state => state.piclist.checkAll,
        delCount: state => state.piclist.delCount
      })
    },
    watch: {
      del(val) {
        if (val) {
          this.delPic();
        }
      },
      checkAll(val) {
        if (val) {
          this.checkAll();
        }
      }
    }
  }
</script>

<style scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }

  /*.cbox {*/
  /*text-align: center;*/
  /*}*/
  /*.cbox-inner {*/
  /*padding: 15px 0;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*}*/
  /*.demo-list-box {*/
  /*margin-bottom: 10px;*/
  /*background-color: #fff;*/
  /*width: 100%;*/
  /*overflow: scroll;*/
  /*-webkit-overflow-scrolling: touch;*/
  /*}*/
  .demo5-item {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }

  .demo5-item-selected {
    background: #ffffff url('../../assets/active.png') no-repeat right bottom;
    border: 1px solid #ff4a00;
  }
</style>
