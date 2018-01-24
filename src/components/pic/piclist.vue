<template>
  <scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
    <div class="demo-list-box" id="demo_list_box" :style="{height: `${height}px`}">
      <flexbox :gutter="0">
        <flexbox-item :span="1/3" v-for="(pic,index) in pics" :key="index" class="pics cbox vux-1px-t vux-tap-active"
                      @click.native="show(index)">
          <div class="vux-1px-r cbox-inner">
            <img :src="pic.src">
          </div>
        </flexbox-item>
      </flexbox>
      <load-more v-if="!hasNoRecords" tip="正在加载"></load-more>
      <load-more v-if="hasNoRecords" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
    </div>
    <div v-transfer-dom>
      <previewer :list="pics" ref="previewer" :options="options">
        <template slot="button-after">
          <span class="previewer-delete-icon-box">
            <img src="#" width="22" height="22" class="previewer-delete-icon"
                 @click.prevent.stop="delPic">
          </span>
        </template>
      </previewer>
    </div>
  </scroller>
</template>


<script>
  import {Scroller, Flexbox, FlexboxItem, LoadMore, Previewer, TransferDom} from 'vux'
  import {mapState} from 'vuex'
  import {getImgs} from "../../util/beApi";

  export default {
    directives: {
      TransferDom
    },
    components: {
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
        let index = this.$refs.previewer.getCurrentIndex();
        this.ids.push(this.pics[index].id);
        this.pics.slice(index,1);
      },
      onScrollBottom() {
        if (!this.onFetching) {
          this.onFetching = true
          setTimeout(() => {
            this.index++;
            this.pics.push(this.getPics());
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 1000)
        }
      },
      async getPics() {
        let ret = await getImgs(9, this.index).data;
        this.hasNoRecords = !ret || ret.length == 0;
        return ret;
      }
    },
    data() {
      return {
        height: window.innerHeight - 46 - 53,
        pics: [],
        hasNoRecords: true,
        index: 0,
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.pics')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          },
          isClickableElement: function (el) {
            return /previewer-delete-icon/.test(el.className)
          }
        },
        ids: []
      }
    },
    mounted() {
      this.getPics();
    },
    computed: {
      ...mapState({
        demoTop: state => state.vux.demoScrollTop
      })
    }
  }
</script>

<style scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
</style>
