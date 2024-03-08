<template>
    <el-container>
        <el-main>
            <el-row  >
                <el-col :span="24">
                    <table style="width:100%;  font-size: medium; ">
                        <tr>
                            <td align="left" style="width:40%">
                                <el-input placeholder="请输入内容"   class="input-with-select">
                                    <el-button slot="append" type="primary" style="background-color: #66b1ff;color: white;">
                                        搜索</el-button>
                                </el-input>
                            </td>
                            <td> &nbsp; &nbsp;<span style="color: white;">或</span> &nbsp; &nbsp;<el-button type="primary" @click="ToPublish">
                                    发布需求</el-button></td>
                        </tr>
                    </table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                     <ul style="padding-left: 0px;height: 20px;">
                        <li>需求类型：</li>
                        <li v-for="item in  NeedTypes" @click="changeType(item)" style="padding-left: 20px;cursor:pointer;color: #66b1ff;">{{item}}</li>
                     </ul> 
                </el-col>
                <el-card class="box-card" style="margin-top: 10px;margin-bottom: 10px;">
                    <div style="width: 100%;"  v-for="item in pageinfo.PageData">
                        <table style="width: 100%;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #ebeef5    ;">
                            <tr>
                                <td  >
                                        <div style="margin: 15px 5px;cursor: pointer;" @click="viewNeed(item)">【{{item.Type}}】{{ item.Title }}</div>
                                </td>
                                <td rowspan="2" style="width: 150px; font-weight:bold;color: red;">
                                   ￥ {{ item.Budget }}万
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;  <div style="margin: 15px 5px; display: inline-block;width: 70px; text-align: center;padding: 3px;  color: #ff74ab;border-width: 1px;border-style: solid;border-color: #ff74ab;background-color: #ffd0e3;border-radius: 5px;">{{ item.State }}</div> 
                                </td>
                               
                            </tr>
                        </table>
                    </div>
                    <div v-if="pageinfo.PageData.length==0" style="width: 100%;height: 50px;background-color: antiquewhite; text-align: center;padding-top: 20px;">
                            暂无内容
                    </div>
                    <el-select v-model="pageinfo.PageSize" placeholder="请选择"
                        style="display:block;float:right ;margin-top:5px" size="mini" @change="ChangePageSize">
                        <el-option v-for="item in pageSizeOption" :key="item" :label="'每页' + item + '条记录'" :value="item">
                        </el-option>
                    </el-select>
                    <div style="text-align: center;padding:5px">
                        <el-pagination background layout="prev, pager, next" :page-size="pageinfo.PageSize" :pager-count="7"
                            :total="pageinfo.RecordCount" @current-change="changePage">
                        </el-pagination>
                    </div>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>
  
<script>
import url from 'postcss-url';
import VueRouter from 'vue-router';

export default {
    name: "NeedList",
    data() {
        return {
            loading: true,
            imgUrl: '',
            imgQRCode: '',
            NeedTypes:['全部','课程开发','虚拟仿真','微课制作','教师教学能力大赛','实训室建设','智能硬件','其他'],
            //课程开发、虚拟仿真、微课制作、教师教学能力大赛、实训室建设、智能硬件、其他
            CurrentType:'全部',
            pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
            pageSizeOption: [10, 15, 20, 50, 100],
        };
    },
    created() {
        let urlTemp = "assets/mainpic.png";
        this.imgUrl = require("@/" + urlTemp);
        this.imgQRCode = require("@/" + "assets/qrcocedemo.png");
    },
    mounted() {
        this.GetList(1);
    },
    methods: {

        viewNeed(item)
        {
            this.$router.push({ path: '/Web/Need/NeedSubmit', query: { id: item.id } })
        },
        changePage(p) {
      this.pageinfo.CurrentPageNumber = p;
      this.GetList(p);
    },
    ChangePageSize(option) {
      this.pageinfo.PageSize = option;
      this.changePage(1);
    },
        GetList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            var tstr="&Type="+this.CurrentType  ;
            if(this.CurrentType=='全部')
            {
                tstr="";
            }
            
            this.$axios({
                method: "get",
                url: "/api/need?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize+tstr,
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
        changeType(item)
        {
            this.CurrentType=item;
            this.GetList(1);
            
        },
        ToLogin() {
            this.$router.push({ path: '/Web/Login' });
        },
        ToPublish()
        {
            this.$router.push({ path: '/Web/Need/Publish' });
        }
    },
    components: { VueRouter }
};
</script>
<style scoped> 
 ul li {
    float: left;
    list-style: none;
 }
 
</style>
  