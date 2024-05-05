<template>
    <el-container>
        <el-main v-loading="loading">
            <el-row>
                <el-col :span="24">

                    <el-row :gutter="12">
                        <el-col :span="12" v-for="item in pageinfo.PageData" :key="item.id"
                            style="margin-bottom: 10px;">
                            <el-card shadow="hover">
                                <table>
                                    <tr>
                                        <td valign="top">
                                            <img v-if="item.Pic" :src="item.Pic.split('*')[0]"
                                                style="cursor: pointer;;width: 200px;height: 150px;"
                                                @click="ToShowCompetitionContent(item)">
                                            <img v-else src=" " style="cursor: pointer;;width: 200px;height: 150px;"
                                                @click="ToShowCompetitionContent(item)">
                                        </td>
                                        <td valign="top" style="padding: 10px;">
                                            <div style=" cursor: pointer;font-size: 16px;font-weight: bold;margin-bottom: 10px;height: 40px;"
                                                @click="ToShowCompetitionContent(item)">{{ subStr(item.Title,40) }}</div>
                                            <span
                                                style="font-size: 14px;  color: dimgray; height: 70px; display: block; overflow: hidden;">{{
                                                subStr(item.Abstract,70 )}}</span>
                                                <span style="font-size: 14px;  color: dimgray; height: 20px; display: block; overflow: hidden;">
                                                {{ item.State}}</span>
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
            activeName: '成员-学校',
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
        this.changePage(1);
    },
    methods: {
        subStr(str, len) {
            str=str+"";
            if (str.length <= len) {
                return str;
            }
            else {
                return str.substring(0, len) + '...';
            }
        },
        ChangeTab() {
            this.changePage(1);
        },
        ToShowCompetitionContent(item) {
            this.$router.push({ path: '/Web/Competition/ShowContent', query: { id: item.id } })
        },
        ToInformationDetail_Company(item) {
            this.$router.push({ path: '/Web/InformationPublish/InformationDetail_Company', query: { id: item.id } })
        },
        ToViewDetail(item) {
            this.$router.push({ path: '/Web/InformationPublish/InformationDetail', query: { id: item.id } })
        },
        changePage(p) {
            this.pageinfo.CurrentPageNumber = p;
            this.GetInUnitSchoolList(p);
        },
        ChangePageSize(option) {
            this.pageinfo.PageSize = option;
            this.changePage(1);
        },
        GetInUnitSchoolList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/article?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
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
        GetInUnitCompanyList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api//company?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
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
<style scoped>
ul li {
    float: left;
    list-style: none;
}

.father2 {
    /*方法二*/
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

    position: absolute;
    /*方法遥*/
    top: 50%;
    /*方法二 */
    left: 50%;
    /*方法二*/
    transform: translate(-50%, -50%);
    /*方法二定位*/
    -webkit-transform: translate(-50%, -50%);
    /*兼容谷歌*/
    -ms-transform: translate(-50%, -50%);
    /*兼容IE*/
    -moz-transform: translate(-50%, -50%);
    /*兼容火狐*/
}

li {
    line-height: 30px;
}
</style>