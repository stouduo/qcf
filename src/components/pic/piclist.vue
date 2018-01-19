<template>
  <div >
    <group-title>2 columns</group-title>
    <grid>
      <grid-item label="xx" v-for="i in 3" :key="i">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
    </grid>
    <div>
      <load-more tip="正在加载"></load-more>
      <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
      <load-more :show-loading="false" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>



<script>
  import { Grid, GridItem, GroupTitle,LoadMore } from 'vux'

  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle,
      LoadMore
    },
    methods: {
      onItemClick () {
        console.log('on item click')
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
</style>
