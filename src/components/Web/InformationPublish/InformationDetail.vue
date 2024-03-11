<template>
    <el-container>
        <el-main v-loading="loading">
             
            <el-row>
                <el-col :span="24">
                    <div style="width: 100%; text-align: left;padding: 10px;">
                       信息中心	&gt;成果展示| {{InformationModel.NeedName}} 
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div style="padding: 10px;">
                        <div>{{ InformationModel.NeedName}}</div>
                        <div>发布时间：{{ InformationModel.createdAt }}</div>
                        <div style="width: 100%;background-color: antiquewhite;margin-top: 15px;padding: 10px;">
                            <el-carousel height="350px" style="width: 80%;margin: auto;background-color: white;">
                                <el-carousel-item v-for="item in InformationModel.Attachment.split('|')"  :key="item">
                                    <img :src="item.split('*')[0]">
                                </el-carousel-item>
                            </el-carousel>
                            <div style="width: 100%; text-align: center;padding: 20px;"> 中标都作品展示【开发者：{{NeedModel.WinningOrganize}}】 </div>
                        </div>
                        <div>
                             <span style="font-size: 14px; font-weight: bold; margin-top: 10px;">任务需求：</span>
                             <div style="padding: 10px; word-break: break-all;">项目预算金额： {{ NeedModel.Budget }}万</div>
                             <div style="padding: 10px; word-break: break-all;"> 项目周期：{{ NeedModel.Period }}</div>
                             <div style="padding: 10px; word-break: break-all;"> 需求描述：{{ NeedModel.Memo }}</div>
                        </div>
                    </div>
                     
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
            loading:false,
            editerdialogVisible: false,
            editerdialogTitle: '请输入原因',
            InformationID: 0,
            imageList: [],
            InformationModel: {},
            NeedModel:{},
            module: { Reason: '' },
            rules: {
                Reason: [
                    { required: true, message: '请输入原因', trigger: 'change' }
                ],
            }
        }
    },
    mounted() {
        this.InformationID = this.$route.query.id;
       // this.GetImageList(1);
        this.GetInformationDetail(this.InformationID);
    },
    methods: {
        doCheckReason(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var qs = require("qs");
                    this.$axios({
                        method: "PATCH",
                        url: "/api/need/" + this.InformationID,
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
                url: "/api/need/" + this.InformationID,
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
        getNeedModel(ID)
        {
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
        GetInformationDetail(ID) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/informationPublish/" + ID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.InformationModel = res.data.data;
                        this.loading = false;
                        this.getNeedModel(this.InformationModel.NeedID);
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
  