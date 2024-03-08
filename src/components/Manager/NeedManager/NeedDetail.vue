<template>
    <el-container>
        <el-main v-loading="loading">
            <el-page-header @back="goBack" content="详情页面"></el-page-header>
            <el-row>
                <el-col :span="24">
                    <div style="width: 100%; text-align: center;">
                        <h3> {{ NeedModel.Title }}</h3>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div style="width:100%;display: inline-block;align-content: center;">
                        <table style="width:90%;margin:auto; ">
                            <tr>
                                <td style="color: rgb(129, 128, 128); width: 100px; ">需求描述</td>
                                <td style="padding: 10px;word-break: break-all;">{{ NeedModel.Memo }}</td>
                            </tr>
                            <tr>
                                <td style="color: rgb(129, 128, 128);  ">项目预算</td>
                                <td style="padding: 10px;">{{ NeedModel.Budget }}</td>
                            </tr>
                            <tr>
                                <td style="color: rgb(129, 128, 128);  ">项目周期</td>
                                <td style="padding: 10px;">{{ NeedModel.Period }}</td>
                            </tr>
                            <tr>
                                <td style="color: rgb(129, 128, 128);  ">附件</td>
                                <td style="padding: 10px;">
                                    <ul style="list-style: none;margin: 0px;padding-left: 0px;">
                                            <li v-for="item in NeedModel.Attachment.split('|')" 
                                                @click="DownLoadSubmitFile(item.split('*')[0])"
                                                style="cursor: pointer;color: cornflowerblue;padding-bottom: 5px;">
                                                {{ item.split('*')[1] }}
                                            </li>
                                        </ul>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div style="width: 100%; text-align: center; padding-top: 20px;">
                        <el-button type="primary" v-if="NeedModel.State=='待审核'" @click="ToUnApprove">拒绝审批</el-button>
                        <el-button type="primary" v-if="NeedModel.State=='待审核'" @click="ToApprove">审批通过</el-button>
                    </div>
                </el-col>

            </el-row>
        </el-main>
        <el-dialog :title="editerdialogTitle" :visible.sync="editerdialogVisible" width="600px">
            <el-form :model="module" :rules="rules" ref="module" label-width="100px" class="demo-ruleForm">
                <el-form-item label="拒绝原因" prop="Reason">
                    <el-input type="textarea" v-model="module.Reason" :rows="4"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editerdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doCheckReason('module')">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>
  
<script>
export default {
    name: "NeedDetail",
    data() {
        return {
            loading:false,
            editerdialogVisible: false,
            editerdialogTitle: '请输入原因',
            NeedID: 0,
            imageList: [],
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
        this.NeedID = this.$route.query.id;
        this.GetImageList(1);
        this.GetNeedDetail(this.NeedID);
    },
    methods: {
        doCheckReason(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var qs = require("qs");
                    this.$axios({
                        method: "PATCH",
                        url: "/api/need/" + this.NeedID,
                        data: qs.stringify({
                            Reason: this.module.Reason,
                            State:'退回',
                            StepNumber:0
                        }),
                    })
                        .then((response) => {
                            if (response.data.err == 0  ) {
                                this.$message({ type: 'success ', message:'操作完成' });
                               this. goBack();
                            } else {
                                this.$message.error('错误：'+response.data.err);
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
        doApprove() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "PATCH",
                url: "/api/need/" + this.NeedID,
                data: qs.stringify({
                    State: '审核通过',
                    StepNumber:1
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
        GetNeedDetail(ID) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/need/" + ID,
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
   
<style scoped> table {
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
  