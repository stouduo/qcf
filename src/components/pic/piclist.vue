<template>
  <div style="overflow: hidden;">
    <group-title>2 columns</group-title>
    <grid>
      <grid-item label="xx" v-for="i in 3" :key="i">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
    </grid>
    <group-title>3 columns</group-title>
    <grid>
      <grid-item link="/component/cell" label="$t('Go to Cell')">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" label="$t('Go to Cell')">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="onItemClick">
        <img slot="icon" src="../../assets/logo.png">
        <span slot="label">xx</span>
      </grid-item>
    </grid>
    <group-title>4 columns</group-title>
    <grid>
      <grid-item label="$t('Grid')" v-for="i in 4" :key="i">
        <img slot="icon" src="../../assets/logo.png">
      </grid-item>
    </grid>
    <group-title> xx </group-title>
    <grid>
      <grid-item v-for="i in 5" :key="i">
        <span class="grid-center">{{i}}</span>
      </grid-item>
    </grid>
    <group-title> xxxx </group-title>
    <grid :cols="3">
      <grid-item v-for="i in 6" :key="i">
        <span class="grid-center">{{i}}</span>
      </grid-item>
    </grid>
  </div>
</template>



<script>
  import { Grid, GridItem, GroupTitle } from 'vux'

  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle
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
