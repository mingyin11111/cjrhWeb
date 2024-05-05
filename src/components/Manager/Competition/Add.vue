<template>
    <el-container>
        <el-main v-loading="loading">
            <el-row>
                <el-col :span="24">


                    <el-card class="box-card">


                        <div class="grid-content bg-purple-dark">
                            <div style="display: inline; cursor: pointer">添加&gt;</div>
                            <div  style=" display: inline; float: right;  margin-top: -4px;  padding-right: 10px;  padding-bottom: 10px;  cursor: pointer; ">
{{ Edit_ModuleID }}
                            </div>
                        </div>
                        <div style="height: 10px;"></div>

                        <template>
                            <el-form :model="module" :rules="rules" ref="module">
                                <el-form-item label="标题" prop="Title" :label-width="formLabelWidth">
                                    <el-input v-model="module.Title" autocomplete="off"  maxlength="250" show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item label="摘要" prop="Abstract" :label-width="formLabelWidth">
                                    <el-input type="textarea" :rows="3" placeholder="请输入简介"  v-model="module.Abstract"  maxlength="2000" show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item label="类型" prop="Type" :label-width="formLabelWidth">
                                    <el-select v-model="module.Type" placeholder="请选择">
                                        <el-option key="行业专项竞赛" label="行业专项竞赛" value="行业专项竞赛"> </el-option>
                                        <el-option key="双创比赛" label="双创比赛" value="双创比赛"> </el-option>
                                        <el-option key="技能大赛" label="技能大赛" value="技能大赛"> </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态" prop="State" :label-width="formLabelWidth">
                                    <el-select v-model="module.State" placeholder="请选择">
                                        <el-option key="未开始" label="未开始" value="未开始"> </el-option>
                                        <el-option key="进行中" label="进行中" value="进行中"> </el-option>
                                        <el-option key="已结束" label="已结束" value="已结束"> </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="内容" prop="Content" :label-width="formLabelWidth">
                                    <el-input type="textarea" :rows="13" placeholder="请输入简介"
                                        v-model="module.Content"></el-input>
                                </el-form-item>
                                <el-form-item label="封面图" :label-width="formLabelWidth">
                                    <el-upload class="avatar-uploader" action="/api/upload/fileupload"
                                        :show-file-list="false" :on-success="UpLoadSuccess"
                                        :headers="{ 'token': tokenValue }">
                                        <img v-if="module.Pic" :src="module.Pic.split('*')[0]" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"
                                            style=" border-style: solid;    border-color: #a69fe2;    border-width: 1px;"></i>
                                    </el-upload>
                                </el-form-item>

                                <el-form-item label="附件" :label-width="formLabelWidth">
                                    <el-upload class="upload-demo" action="/api/upload/fileupload"
                                        :on-success="UpLoadSuccessAtta" :headers="{ 'token': tokenValue }" multiple
                                        :limit="3" :file-list="fileList">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip"> </div>
                                    </el-upload>

                                </el-form-item>
                            </el-form>
                        </template>
                        <span style="display: inline-block; width: 100%; text-align: center;">
                            <el-button v-if="Edit_ModuleID>0" type="danger" @click="CheckUpdate('module')" style="width: 40%;">保存</el-button>
                            <el-button v-else type="danger" @click="CheckAdd('module')" style="width: 40%;">发布</el-button>
                        </span>
                    </el-card>
                    <div style="height: 10px;"></div>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
import Vue from 'vue'
//imported directly to your code by require( '@ckeditor/ckeditor5-build-[name]' ).

export default {
    name: "Unit_Company",
    data() {
        return {
            Edit_ModuleID:0,
            tokenValue: '',
            pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
            pageSizeOption: [10, 15, 20, 50, 100],
            tableData: [],
            editerdialogVisible: false,
            editerdialogTitle: "编辑",
            module: { id: 0, Title: "", Type: "", Content: "", Attachment: "", MemberID: 0, Pic: '',Abstract:'' },
            formLabelWidth: "120px",
            childModuleFID: 0,
            currentRow: {},
            add_Mode: "SameLevel",
            loading: false,
            rules: {
                Title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                Type: [
                    { required: true, message: '请选择类型', trigger: 'blur' },
                ],
                Content: [
                    { required: true, message: '请输入内容', trigger: 'blur' },
                ],
            }
        };
    },
    mounted() {
        this.tokenValue = localStorage.getItem('Token');
        this.Edit_ModuleID=this.$route.query.id;
        if(this.Edit_ModuleID>0)
        {
            this.GetArticleDetail(this.Edit_ModuleID);
        }
    },
    methods: {
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
                        this.module = res.data.data;
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
        
        CheckUpdate(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.doUpdate();
                } else {
                    return false;
                }
            });
        },
        CheckAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.doAdd();
                } else {
                    return false;
                }
            });
        },
        doUpdate() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "PATCH",
                url: "/api/article/"+this.Edit_ModuleID,
                data: qs.stringify({
                    Title: this.module.Title,
                    Type: this.module.Type,
                    Content: this.module.Content,
                    Attachment: this.module.Attachment,
                    Pic: this.module.Pic,
                    MemberID: this.$store.state.MemberID,
                    MemberName: this.$store.state.Member,
                    State:this.module.State,
                    Abstract:this.module.Abstract,
                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                        this.$message({
                            type: "success",
                            message: "保存成功!",
                        });
                        this.$router.push({ path: '/Manager/Competition/CompetitionList' })
                    } else {

                        this.$message({
                            type: "info",
                            message: "保存失败，请重试" + response.data.err + response.data.errMsg,
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                    this.loading = false;
                });

        },

        doAdd() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "post",
                url: "/api/article",
                data: qs.stringify({
                    Title: this.module.Title,
                    Type: this.module.Type,
                    Content: this.module.Content,
                    Attachment: this.module.Attachment,
                    Pic: this.module.Pic,
                    MemberID: this.$store.state.MemberID,
                    MemberName: this.$store.state.Member,
                    State:this.module.State,
                    Abstract:this.module.Abstract,
                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                        this.$router.push({ path: '/Manager/Competition/CompetitionList' })

                    } else {

                        this.$message({
                            type: "info",
                            message: "添加失败，请重试" + response.data.err + response.data.errMsg,
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                    this.loading = false;
                });

        },

        UpLoadSuccess(data) {
            if (data.err > 0) {
                this.$message.error(data.errMsg);
            }
            else {
                this.module.Pic = "/api/files/" + data.data;
            }
        },
        UpLoadSuccessAtta(data) {
            if (data.err > 0) {
                this.$message.error(data.errMsg);
            }
            else {
                this.module.Attachment = "/api/files/" + data.data;
            }
        },



        clear_info() {
            //module: { ID: 0, Name: '', IndexNumber: 0, FacID: 0, Memo: '' },
            this.module.ID = 0;
            this.module.Name = "";
            this.module.IndexNumber = 0;
            this.module.FacID = 0;
            this.module.Memo = "";
        },



        deleteRow(row) {
            this.$confirm("删除该企业，该企业下的所有用户将被同步删除，确定要删除该学校吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.deleteCompany(row);
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        deleteCompany(row) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "DELETE",
                url: "/api/company/" + row.id,
            })
                .then((response) => {
                    if (response.data.err == 0) {
                        this.$message({ type: "success", message: "删除成功!" });
                        this.GetList(1);
                    } else {
                        this.$message({
                            type: "info",
                            message: "添加失败，请重试",
                        });
                    }
                })
                .catch((error) => {
                    this.$message.error("登录中出错！");
                    console.log(error);
                    this.loading = false;
                });
        },


        rowStyle({ row, rowIndex }) {
            return "height:20px";
        },
        cellStyle({ row, rowIndex }) {
            return "padding:0";
        },
    },

};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>
.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    min-height: 30px;
    padding-top: 10px;
    text-align: left;
    padding-left: 10px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #a69fe2;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.el-icon-plus avatar-uploader-icon {
    border-style: solid;
    border-color: #a69fe2;
    border-width: 1px;
}
</style>