<template>
  <div style="height:100%;">
    <x-header :left-options="{showBack: false}" >QC</x-header>
    <scroller lock-x scrollbar-y use-pullup height="100%" @on-scroll-bottom="loadMore" ref="picScroll"
              :scroll-bottom-offst="200">
      <div style="height:100%;width:100%" id="vux_view_box_body">
        <flexbox  :gutter="1" wrap="wrap">
          <flexbox-item :span="2.97" class="pics" v-for="(pic,index) in pics" @click.native="show(index)" :key="index"
                        style="text-align: center">
            <x-img :src="pic.src" @on-success="success" @on-error="error" class="ximg-demo"
                   error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
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
  import {Scroller, XHeader, FlexboxItem, Flexbox, Previewer, XImg, TransferDom} from "vux";
  import {getImgs} from "../../util/beApi";

  export default {
    components: {Scroller, XHeader, FlexboxItem, Flexbox, Previewer, XImg, TransferDom},
    name: "anoymous",
    directives: {
      TransferDom
    },
    data() {
      return {
        pics: [],
        index: 0,
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.pics')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
      }
    },
    mounted() {
      this.getPics();
    },
    methods: {
      show(index) {
        this.$refs.previewer.show(index);
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
      success() {

      },
      error() {

      }
    }
  }
</script>

<style>
  body{
    line-height: 1;
  }
  .ximg-demo {
    width: 100%;
    height: auto;
  }
</style>
