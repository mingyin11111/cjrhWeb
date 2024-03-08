<template>

  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.menuId + ''">
    <template slot="title">
      <i :class="menu.icon"></i>
      <span slot="title">{{menu.name}}</span>
    </template>
    <LeftMenu v-for="item in menu.children" :key="item.menuId" :menu="item"></LeftMenu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{menu.name}}</span>
  </el-menu-item>

 
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      
    }
  },
  props:['menu'],
   methods: {
    say: function () {
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
