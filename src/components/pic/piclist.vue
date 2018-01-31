<template>
  <div>
    <scroller lock-x scrollbar-y use-pullup height="100%" @on-scroll-bottom="loadMore" ref="picScroll"
              :scroll-bottom-offst="200">
      <div class="demo-list-box" id="demo_list_box" style="height: 100%">

        <flexbox :gutter="0" wrap="wrap">
          <flexbox-item :span="1/3" v-for="(pic,index) in pics" :key="index"
                        class="pics cbox vux-1px-t vux-tap-active">
            <div v-if="!longTap" class="vux-1px-r cbox-inner" @touchstart="touchStart(index)"
                 @touchend="touchEnd" @click="show(index)">
              <img :src="pic.src" width="100%" height="100%">
            </div>
            <div v-else :class="delPics[index]?'demo5-item-selected':'demo5-item'" @click="update(index)">
              <img :src="pic.src" width="100%" height="100%">
            </div>
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
  import {mapState, mapMutations} from 'vuex'
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
      ...mapMutations([
        'RESET_PICLIST',
      ]),
      show(index) {
        this.$refs.previewer.show(index)
      },
      async delPic() {
        for (let index in this.delPics) {
          if (this.delPics[index]) {
            this.ids.push(this.pics[index].id);
          }
        }
        let res = await delImgs(this.ids);
        if (res.data.code == 1) {
          this.pics = [];
          this.getPics();
          this.ids = [];
          this.delPics = [];
          this.RESET_PICLIST();
        }
      },
      update(index, checkAll, del) {
        this.$set(this.delPics, index, checkAll ? del : !this.delPics[index]);
        if (this.delPics[index]) {
          this.piclist.delCount++;
        } else {
          this.piclist.delCount--;
        }
        // this.piclist.checkAll = this.piclist.delCount == this.pics.length;
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
      touchStart(index) {
        var self = this;
       this.timeout = setTimeout(function (e) {
          self.longTap = true;
          self.piclist.showBottom = true;
        }, 800);  //长按时间超过800ms，则执行传入的方法
      },
      touchEnd() {
        clearTimeout(this.timeout);
      },
      checkAllPic(check) {
        this.piclist.delCount = check ? 0 : this.pics.length;
        for (let index in this.pics) {
          this.update(index, true, check);
        }
      }
    },
    data() {
      return {
        height: window.innerHeight - 46 - 53,
        pics: [],
        timeout: null,
        index: 0,
        longTap: false,
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
      this.piclist.showBottom = this.longTap;
    },
    computed: {
      ...mapState({
        demoTop: state => state.vux.demoScrollTop,
        piclist: state => state.piclist,
        del: state => state.piclist.del,
        checkAll: state => state.piclist.checkAll,
        showBottom: state => state.piclist.showBottom
      })
    },
    watch: {
      del(val) {
        if (val) {
          this.delPic();
        }
      },
      checkAll(val) {
        this.checkAllPic(val);
      },
      showBottom(val) {
        if (!val) {
          this.longTap = val;
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
