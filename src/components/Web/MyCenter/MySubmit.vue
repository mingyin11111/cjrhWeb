<template>
    <el-container>
        <el-main v-loading="loading">
            <el-row>
                <el-col :span="24">
                    <span style="font-size: 14px;margin-top: 5px;display: inline-block;"><span style="cursor: pointer;">
                            我的投标</span> &gt; </span>

                    <el-card class="box-card" style="margin-top: 10px;margin-bottom: 10px;" v-loading="loading">
                        <div style="width: 100%;" v-for="item in pageinfo.PageData">
                            <table
                                style="width: 100%;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #ebeef5    ;">
                                <tr style="font-size: 20px;">
                                    <td style="width: 50%;padding-bottom: 10px;"> 投标时间：{{ formatDate(item.createdAt) }} </td>
                                    <td style="width: 50%;"> 投标金额：{{ item.Prise }}万
                                        <div v-if="item.Need && item.MemberID == item.Need.WinningID"
                                            style="width: 50px;height: 20px;border-width: 2px;border-style: solid;border-color: red;text-align: center;">
                                            中标</div>
                                    </td>

                                </tr>
                                <tr v-if="item.Need">
                                    <td style="padding-left: 20px;padding-bottom: 10px;"> 需求标题：<a href="#" @click="ToViewNeed(item)">{{ item.Need.Title }}</a></td>
                                    <td style=" padding-left: 20px; padding-bottom: 10px;"> 类型： {{ item.Need.Type }} </td>
                                </tr>
                                <tr v-if="item.Need">
                                    <td style="padding-left: 20px;">需方单位：{{ item.Need.MemberOrganize }}</td>
                                    <td style="padding-left: 20px;">预算金额：{{ item.Need.Budget }}万</td>
                                </tr>
                                <tr v-if="item.Need">
                                    <td colspan="2" style="padding-left: 20px;">
                                        需求状态：
                                        <div
                                            style="margin: 5px 5px; display: inline-block;width: 70px; text-align: center;padding: 3px;  color: #ff74ab;border-width: 1px;border-style: solid;border-color: #ff74ab;background-color: #ffd0e3;border-radius: 5px;">
                                            {{ item.Need.State }}</div>
                                           
                                            <el-button type="warning" style="float: right;" plain  @click="DeleteMySubmit(item)" size="small">删除</el-button>
                                            <el-button type="warning" style="float: right; margin-right: 10px;" plain  @click="ToViewNeed(item)" size="small">查看</el-button>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td colspan="2" style="height: 100px; padding-left: 20px; ">
                                        需方信息无法获取，或已删除
                                        <el-button type="warning" style="float: right;" plain  @click="DeleteMySubmit(item)" size="small">删除</el-button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div v-if="pageinfo.PageData.length == 0"
                            style="width: 100%;height: 50px;background-color: antiquewhite; text-align: center;padding-top: 20px;">
                            暂无内容
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
        formatDate  (date1) {
                    var t = new Date(date1);  
                    if (t.getFullYear() + "" == "NaN") return "";
                    return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + (t.getDate()) + " ";
                },
        DeleteMySubmit(item) {
            this.$confirm('确定要删除当前招标信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var qs = require("qs");
                this.$axios({
                method: "DELETE",
                url: "/api/needSubmit/"+item.id,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.$message({  type: 'success',message: '删除成功!'});
                        this.GetMyNeedList(1);
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
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        ToViewNeed(item)
        {
            this.$router.push({ path: '/Web/Need/NeedSubmit', query: { id: item.Need.id } })
        },
        viewMyNeed(item) {
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
                url: "/api/needSubmit?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize + "&MemberID=" + this.$store.state.MemberID,
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
                        this.loading = false;
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
 a{
    color:black;
    text-decoration: none
 }
 a:hover{
    color: dimgrey;
 }
</style>