<template>
    <el-container>
        <el-main v-loading="loading">
            <el-row>
                <el-col :span="24">
                    <div style=" text-align: left;padding: 10px;">
                        专项竞赛 &gt 
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-card class="box-card">
                        <div style="padding: 10px;">
                            <div style="text-align: center; padding: 10px;font-size: 18px;font-weight: bold;">
                            {{ ArticleModel.Title}}
                            </div>
                            <div style="background-color: antiquewhite;margin-top: 15px;padding: 10px;">
                                <div style=" text-align: center;padding: 20px;">
                                    更新日期：{{ formatDate(ArticleModel.updatedAt) }}
                                 </div>
                            </div>
                            <div>
                                <div style="padding: 10px; word-break: break-all;" v-html="ArticleModel.Content"> </div>
                            </div>
                            <div>
                                <div style="display: inline-block;margin-left: 5px;">
                                            <div v-for="atta in ArticleModel.Attachment.split('|')"
                                                @click="DownLoadSubmitFile(atta.split('*')[0])"
                                                style="cursor: pointer;color: cornflowerblue;padding-bottom: 5px;">
                                                {{ atta.split('*')[1] }}
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </el-card>

<div style="height: 10px;"></div>
                </el-col>
            </el-row>

        </el-main>

    </el-container>
</template>

<script>
export default {
    name: "NeedDetail",
    data() {
        return {
            loading: false,
            editerdialogVisible: false,
            editerdialogTitle: '请输入原因',
            ArticleID: 0,
            imageList: [],
            ArticleModel: {},
            NeedModel: {},
            module: { Reason: '' },
            rules: {
                Reason: [
                    { required: true, message: '请输入原因', trigger: 'change' }
                ],
            }
        }
    },
    mounted() {
        this.ArticleID = this.$route.query.id;
        // this.GetImageList(1);
        this.GetArticleDetail(this.ArticleID);
    },
    methods: {
        DownLoadSubmitFile(item) {
            var qs = require("qs");
            this.$axios({
                method: "get",
                responseType: 'blob',
                url: "/api/upload/export?filename=" + item.replace("/api/files/", ""),
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    this.downloadFile(res)
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        doCheckReason(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var qs = require("qs");
                    this.$axios({
                        method: "PATCH",
                        url: "/api/need/" + this.ArticleID,
                        data: qs.stringify({
                            Reason: this.module.Reason,
                            State: '退回',
                            StepNumber: 0
                        }),
                    })
                        .then((response) => {
                            if (response.data.err == 0) {
                                this.$message({ type: 'success ', message: '操作完成' });
                                this.goBack();
                            } else {
                                this.$message.error('错误：' + response.data.err);
                            }
                        })
                        .catch((error) => {
                            this.$message({ type: "info", message: error });
                        });
                } else {
                    return false;
                }
            });
        },
        ToUnApprove() {
            this.editerdialogVisible = true;

        },
        ToApprove() {
            this.$confirm("该需求确定要审核通过吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.doApprove();
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "操作已取消",
                    });
                });
        },
        formatDate: function (dt) {
      dt = dt + "";
      if (dt == "" || dt == "null") {
        return "";
      }
      var t = new Date(dt);
      if (t.getFullYear() + "" == "NaN") return "";
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + (t.getDate()) + " " + (t.getHours()) + ":" + t.getMinutes() + ":" + t.getMinutes();
    },
        doApprove() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "PATCH",
                url: "/api/need/" + this.ArticleID,
                data: qs.stringify({
                    State: '审核通过',
                    StepNumber: 1
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.$router.push({ path: '/Manager/NeedManager/NeedList' })
                        this.loading = false;
                    }
                    else {
                        this.$message.error("错误：" + res.data.err);
                    }
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        goBack() {
            this.$router.push({ path: '/Manager/NeedManager/NeedList' })
        },
        getNeedModel(ID) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/Need/" + ID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.NeedModel = res.data.data;
                        this.loading = false;
                    }
                    else {
                        this.$message.error("错误：" + res.data.err);
                    }
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        GetArticleDetail(ID) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/article/" + ID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.ArticleModel = res.data.data;
                        this.loading = false;
                        // this.getNeedModel(this.ArticleModel.NeedID);
                    }
                    else {
                        this.$message.error("错误：" + res.data.err);
                    }
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        DownLoadSubmitFile(item) {
            var qs = require("qs");
            this.$axios({
                method: "get",
                responseType: 'blob',
                url: "/api/upload/export?filename=" + item.replace("/api/files/", ""),
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    this.downloadFile(res)
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        downloadFile(res) {
            if (!res) {
                return;
            }
            const fileName = res.headers["content-disposition"].split("=")[1];
            const blob = new Blob([res.data], {
                type: 'application/zip'
            });
            const url = window.URL.createObjectURL(blob);
            const aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;
            aLink.setAttribute("download", decodeURI(fileName));
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
            window.URL.revokeObjectURL(url);
        },
        GetImageList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/systemAttachment?page=1&pageSize=9000&RelationModuleName=t_informationpublish1",
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.imageList = res.data.data.rows;
                        this.loading = false;
                    }
                    else {
                        this.$message.error("错误：" + res.data.err);
                    }
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
    },

};
</script>

<style scoped>
 table {
     border-collapse: collapse;
 }

 table,
 table tr td {
     border: 1px solid #ccc;
 }

 table tr td {
     padding: 5px 10px;
 }
</style>