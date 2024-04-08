
<template>
    <el-container>
         
        <el-main v-loading="loading">
            <el-row>
                <el-col :span="24">
                    <div style="height: 80px;"></div>
                    <el-image :src="imgUrl" style="width: 100%;height: 200px;" ></el-image>
                    <el-tabs v-model="activeName" @tab-click="ChangeTab" >
                        
                        <el-tab-pane label="成果展示" name="成果展示">
                            <el-row :gutter="12">
                            <el-col :span="8"  v-for="item in pageinfo.PageData" key="item">
                                <el-card shadow="hover">
                                <table style="width: 100%;height: 300px;">
                                    <tr>
                                        <td style="height: 40px;" colspan="2">
                                            <span @click="ToViewDetail(item)"  style="font-weight: bold;cursor: pointer; white-space: nowrap; display: inline-block;   overflow: hidden;    text-overflow: ellipsis;    width:300px;"  >
                                                {{item.NeedName}}
                                            </span>
                                            <div style="float: right;overflow: hidden;margin-top: -41px;margin-right: -70px; padding-left: 40px;padding-top: 20px;width: 80px;height: 30px;transform: rotate(45deg);background-color: red;color: white;display: inline-block;">中标</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;"        >
                                            <div class="father2" style="border-width: 1px;border-style: solid; width: 200px;height: 200px; vertical-align: middle;margin-top: auto;">
                                                <el-image  class="son2" :src="imgUrl" fit="fill" ></el-image>
                                            </div>
                                        </td>
                                        <td style="width: 40%;" valign="top">
                                            <ul style="display: inline-grid;padding-left: 0px; width: 100%;padding-top: 15px;">
                                                <li>金额：<span>ddd</span></li>
                                                <li>关注：<span>ddd</span></li>
                                                <li>投标：<span>ddd</span></li>
                                                <li>中标：<span>{{item.WinningName }}</span></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </table>
                                </el-card>
                            </el-col>
                            
                            </el-row>
                                <el-select v-model="pageinfo.PageSize" placeholder="请选择"
                                    style="display:block;float:right ;margin-top:5px" size="mini" @change="ChangePageSize">
                                    <el-option v-for="item in pageSizeOption" :key="item" :label="'每页' + item + '条记录'"
                                        :value="item">
                                    </el-option>
                                </el-select>
                                <div style="text-align: center;padding:5px">
                                    <el-pagination background layout="prev, pager, next" :page-size="pageinfo.PageSize"
                                        :pager-count="7" :total="pageinfo.RecordCount" @current-change="changePage">
                                    </el-pagination>
                                </div>
                        </el-tab-pane>
                        <el-tab-pane label="成员单位" name="成员单位">
                            <el-row :gutter="12">
                            <el-col :span="12"  v-for="item in pageinfo.PageData" :key="item.id" style="margin-bottom: 10px;">
                                <el-card shadow="hover"  >
                                    <table>
                                        <tr>
                                            <td valign="top">
                                                <img :src="item.Logo" style="width: 200px;height: 150px;">
                                            </td>
                                            <td valign="top" style="padding: 10px;">
                                                <div style="font-size: 16px;font-weight: bold;margin-bottom: 10px;">{{item.Name}}</div>
                                                <span style="font-size: 14px;color:dimgray;">{{item.Memo}}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </el-card>
                            </el-col>
                            
                            </el-row>
                                <el-select v-model="pageinfo.PageSize" placeholder="请选择"
                                    style="display:block;float:right ;margin-top:5px" size="mini" @change="ChangePageSize">
                                    <el-option v-for="item in pageSizeOption" :key="item" :label="'每页' + item + '条记录'"
                                        :value="item">
                                    </el-option>
                                </el-select>
                                <div style="text-align: center;padding:5px">
                                    <el-pagination background layout="prev, pager, next" :page-size="pageinfo.PageSize"
                                        :pager-count="7" :total="pageinfo.RecordCount" @current-change="changePage">
                                    </el-pagination>
                                </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>
  
<script>
import VueRouter from 'vue-router';

export default {
    name: "NeedList",
    data() {
        return {
            activeName: '成果展示',
            loading: true,
            imgUrl: '',
            imgQRCode: '',
            NeedTypes: ['课程开发', '虚拟仿真', '微课制作', '教师技能大赛'],
            CurrentType: '全部',
            pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
            pageSizeOption: [10, 15, 20, 50, 100],
        };
    },
    created() {
        let urlTemp = "components/img/bg.jpg";
        this.imgUrl = require("@/" + urlTemp);
        this.imgQRCode = require("@/" + "assets/qrcocedemo.png");
    },
    mounted() {
        this.GetInformationList(1);
    },
    methods: {
        ChangeTab()
        {
            this.changePage(1);
        },
        ToViewDetail(item)
        { 
                this.$router.push({ path: '/Web/InformationPublish/InformationDetail', query: { id: item.id } })
        },
        changePage(p) {
            this.pageinfo.CurrentPageNumber = p;
            if(this.activeName== '成果展示')
            {
                this.GetInformationList(p);
            }
            else{
                this.GetInUnitList(p);
            }
            
        },
        ChangePageSize(option) {
            this.pageinfo.PageSize = option;
            this.changePage(1);
        },
        GetInUnitList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/school?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.pageinfo.PageData = res.data.data.rows;
                        this.pageinfo.RecordCount = res.data.data.count;
                        this.loading = false;
                    }
                    else {
                        this.$message.error("错误：" + res.data.err);
                    }

                })
                .catch((error) => {
                    this.$message.error("登录中出错！");
                    console.log(error);
                    this.loading = false;
                });

        },
        GetInformationList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api//informationPublish?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.pageinfo.PageData = res.data.data.rows;
                        this.pageinfo.RecordCount = res.data.data.count;
                        this.loading = false;
                    }
                    else {
                        this.$message.error("错误：" + res.data.err);
                    }

                })
                .catch((error) => {
                    this.$message.error("登录中出错！");
                    console.log(error);
                    this.loading = false;
                });

        },
        changeType(item) {
            alert(item);
        },
        ToLogin() {
            this.$router.push({ path: '/Web/Login' });
        },
        ToPublish() {
            this.$router.push({ path: '/Web/Need/Publish' });
        }
    },
    components: { VueRouter }
};
</script>
<style scoped> ul li {
     float: left;
     list-style: none;
 }
 
 .father2 { /*方法二*/
        margin-top: 10px;
        width: 300px;
        height: 300px;
        border: 5px solid blue;
        position: relative;
    }

    .son2 {
        border: 1px solid rgb(80, 80, 78);
        background-color: rgb(187, 187, 182);
        height: 200px;
        width: 200px;
        /*左右margin:auto;居中*/

        position: absolute; /*方法遥*/
        top: 50%; /*方法二 */
        left: 50%; /*方法二*/
        transform: translate(-50%,-50%); /*方法二定位*/
        -webkit-transform: translate(-50%,-50%); /*兼容谷歌*/
        -ms-transform: translate(-50%,-50%); /*兼容IE*/
        -moz-transform: translate(-50%,-50%); /*兼容火狐*/
    }
 
 li{
     line-height: 30px;
 }
 </style>
  