<template>
    <el-container>
        <el-main v-loading="loading">
            <span style="font-size: 14px;margin-top: 5px;display: inline-block;"><span @click="ToMyNeedList" style="cursor: pointer;"> 我的需求</span> &gt; 需求详情&nbsp;&nbsp;|&nbsp;{{
                NeedModel.Title }}</span>
            <el-card class="box-card" style="margin-top: 13px;">

                <el-row>
                    <el-col :span="24">
                        <div style="width: 100%; text-align: left;font-size: 18px;padding: 10px 10px;">
                            {{ NeedModel.Title }}
                            <div
                                style="margin: 15px 5px; display: inline-block;width: 70px; text-align: center;padding: 3px;  color: #ff74ab;border-width: 1px;border-style: solid;border-color: #ff74ab;background-color: #ffd0e3;border-radius: 5px; font-size: 14px;">
                                {{ NeedModel.State }}</div>
                        </div>
                        <div style="width:100%;display: inline-block;align-content: center;">
                            <el-steps :active="0">
                                <el-step title="发布需求" description="2024-01-22"></el-step>
                                <el-step title="报名投标" description=" "></el-step>
                                <el-step title="中标公示" description=" "></el-step>
                                <el-step title="项目执行" description=" "></el-step>
                                <el-step title="验收交付" description=" "></el-step>
                            </el-steps>
                            <table style="width:99%;margin:auto;margin-top: 20px; ">
                                <tr>
                                    <td style="color: rgb(129, 128, 128); width: 100px; word-break: break-all; ">需求描述</td>
                                    <td style="padding: 10px; word-break: break-all;">{{ NeedModel.Memo }}</td>
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
                                        <ul style="list-style: none;margin: 0px;padding-left: 0px;" v-if="NeedModel.Attachment">
                                            <li  v-for="item in NeedModel.Attachment.split('|')" 
                                                @click="DownLoadSubmitFile(item.split('*')[0])"
                                                style="cursor: pointer;color: cornflowerblue;padding-bottom: 5px;">
                                                {{ item.split('*')[1] }}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr v-if="NeedModel.State=='退回'">
                                    <td style="color: rgb(129, 128, 128);  ">退回原因</td>
                                    <td style="padding: 10px;">
                                        {{ NeedModel.Reason }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div style="width: 100%; text-align: center; padding-top: 20px;">
                            <span style="display: inline-block; width: 100%; text-align: center;"  v-if="NeedModel.State == '待审核' ||NeedModel.State == '退回'">
                                <el-button type="primary" style="width: 30%;" @click="ToEdit">修改</el-button>
                                <el-button type="danger" style="width: 30%;" @click="ToDelete">删除</el-button>
                            </span>
                        </div>
                    </el-col>

                </el-row>
            </el-card>

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
            loading: false,
            editerdialogVisible: false,
            editerdialogTitle: '请输入原因',
            NeedID: 0,
            AttachList: [],
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
        this.GetAttachList(1);
        this.GetNeedDetail(this.NeedID);
    },
    methods: {
        doDelete()
        {
            var qs = require("qs");
            this.$axios({
                method: "DELETE",
                url: "/api/need/" + this.NeedID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                                this.$message({ type: 'success ', message: '操作完成' });
                                this.goBack();
                            } else {
                                this.$message.error('错误：' + res.data.err);
                            }
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });

        },
        ToDelete()
        {
            this.$confirm("确定在删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.doDelete();
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "操作已取消",
                    });
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
        ToEdit()
        {
            this.$router.push({ path: '/Web/MyCenter/EditMyNeed', query: { id: this.NeedID } })
        },
        ToMyNeedList()
        {
            this.$router.push({ path: '/Web/MyCenter/MyCenter' })
        },
        DownLoadFile(item)
        {
            var qs = require("qs");
            this.$axios({
                method: "get",
                responseType: 'blob',
                url: "/api/upload/export?filename="+item.AttachMentPath.replace("/api/files/",""),
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
        downloadFile (res) {
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
        GetAttachList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/systemAttachment?page=1&pageSize=9000&RelationModuleName=t_need&RelationKey="+this.NeedID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                         this.AttachList = res.data.data.rows;
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
        doCheckReason(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var qs = require("qs");
                    this.$axios({
                        method: "PATCH",
                        url: "/api/need/" + this.NeedID,
                        data: qs.stringify({
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
        doApprove() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "PATCH",
                url: "/api/need/" + this.NeedID,
                data: qs.stringify({
                    State: '审核通过'
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
            this.$router.push({ path: '/Web/MyCenter/MyCenter' })
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
 }</style>
  