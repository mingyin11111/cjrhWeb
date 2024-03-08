<template>
    <el-container>
        <el-main v-loading="loading">
            <el-row>
                <el-col :span="24">
                    <el-tabs v-model="activeName"  >
                        <el-tab-pane label="我的需求" name="我的需求">
                            <el-card class="box-card" style="margin-top: 10px;margin-bottom: 10px;">
                                <div style="width: 100%;" v-for="item in pageinfo.PageData">
                                    <table
                                        style="width: 100%;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #ebeef5    ;">
                                        <tr>
                                            <td>
                                                <div style="margin: 15px 5px;cursor: pointer;" @click="viewMyNeed(item)">【{{ item.Type }}】{{ item.Title }}</div>
                                            </td>
                                            <td rowspan="2" style="width: 150px; font-weight:bold;color: red;">  ￥ {{ item.Budget }}万
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                &nbsp; <div
                                                    style="margin: 15px 5px; display: inline-block;width: 70px; text-align: center;padding: 3px;  color: #ff74ab;border-width: 1px;border-style: solid;border-color: #ff74ab;background-color: #ffd0e3;border-radius: 5px;">
                                                    {{ item.State }}</div>
                                            </td>

                                        </tr>
                                    </table>
                                </div>

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
                            </el-card>

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
            activeName: '我的需求',
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
        let urlTemp = "assets/mainpic.png";
        this.imgUrl = require("@/" + urlTemp);
        this.imgQRCode = require("@/" + "assets/qrcocedemo.png");
    },
    mounted() {
        this.GetMyNeedList(1);
    },
    methods: {
        viewMyNeed(item)
        {
            this.$router.push({ path: '/Web/MyCenter/ViewMyNeed', query: { id: item.id } })
        },
        changePage(p) {
            this.pageinfo.CurrentPageNumber = p;
            this.GetMyNeedList(p);
        },
        ChangePageSize(option) {
            this.pageinfo.PageSize = option;
            this.changePage(1);
        },
        GetMyNeedList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/need?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize+"&MemberID="+this.$store.state.MemberID,
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
 }</style>
  