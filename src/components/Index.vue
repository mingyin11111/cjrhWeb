<template>
  <el-container style="height: 100%">
    <el-header style="text-align: left">
      <table style="width: 100%">
        <tr>
          <td>
            <h1>{{ msg }}</h1>
          </td>
          <td style="text-align: right">
            <el-button
              type="danger"
              icon="el-icon-switch-button"
              circle
              @click="LoginOut()"
            ></el-button>
          </td>
        </tr>
      </table>
    </el-header>

    <el-container>
      <el-aside width="200px" height="100%" style="text-align: left;">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <LeftMenu v-if="menu.length>0" v-for="item in menu" :key="item.id" :menu="item"></LeftMenu>
          
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>成员单位</span>
            </template>
            <el-menu-item index="/Manager/UnitManager/UnitSchool">学校</el-menu-item>
            <el-menu-item index="/Manager/UnitManager/UnitCompany">企业</el-menu-item>
             
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>信息发布</span>
            </template>
            <el-menu-item index="/Manager/InformationPublish/InformationPublish">成果展示</el-menu-item>
          </el-submenu>
          <el-menu-item index="/Manager/NeedManager/NeedList">
            <i class="el-icon-menu"></i>
            <span slot="title">需求管理</span>
          </el-menu-item>
          <el-menu-item index="/Manager/ResourceManager/ResourceList">
            <i class="el-icon-document"></i>
            <span slot="title">资源共享</span>
          </el-menu-item>
          <el-menu-item index="config">
            <i class="el-icon-s-tools"></i>
            <span slot="title">专项竞赛</span>
          </el-menu-item>
          <el-menu-item index="/Manager/MemberManager">
            <i class="el-icon-s-tools"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/Manager/RoleManager">角色管理</el-menu-item>
            <el-menu-item index="/Manager/Organize">组织机构</el-menu-item>
            <el-menu-item index="/Manager/Module">模块管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations } from "vuex";
import axios from 'axios';
import qs from 'qs';
export default {
  name: "index",
  data() {
    return {
      msg: "产教融合供需对接管理端",
      menu:[]
     // menu:[{menuId:'0',name:'asdf',icon:''},{menuId:'11',name:'1111f',icon:'',children:[{menuId:'32',name:'1-1',icon:''},{menuId:'42',name:'1-2',icon:''}]}],
    };
  },
  mounted() {
    this.GetLeftMenu();
  },
  methods: {
    ...mapMutations(["changeToken"]),
    LoginOut() {
      this.$confirm("确定要注销登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.changeToken("");
          this.$router.push("/Login");
        })
        .catch(() => {});
    },
    GetLeftMenu() {
      //this.menu=["aaaaa","bbbbb","cccccc",["c1","c2"]];
       var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_Config_Data.ashx",
        data: qs.stringify({
          RoleID: RoleID,
        }),
      })
        .then((res) => {
          var obj = eval(res.data);
          this.defaultcheckedkeys = obj.choose;
          this.tableData = obj.tree;
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.defaultcheckedkeys);
          });
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error(error);
          console.log(error);
          this.loading = false;
        });

    },
    Main_alert(a) {
      alert(a);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  vertical-align: top;
  padding: 5px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-aside {
  display: block;
  position: relative;
  overflow-y: hidden;
}
</style>
 