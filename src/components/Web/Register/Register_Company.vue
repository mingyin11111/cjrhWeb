<template>
    <el-container>
        <el-main v-loading="loading">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark" style="margin-bottom: 10px;">
                        <div style="display: inline; cursor: pointer">企业注册&gt;</div>
                        <div
                            style="  display: inline;  float: right;  margin-top: -4px;  padding-right: 10px;  padding-bottom: 10px;  cursor: pointer; ">
                        </div>
                    </div>
                    <template>
                        <el-form :model="module" :rules="rules" ref="module">
                            <el-form-item label="学校名称" prop="Name" :label-width="formLabelWidth">
                                <el-input v-model="module.Name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="学校地址" prop="Address" :label-width="formLabelWidth">
                                <el-input v-model="module.Address" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人" prop="LinkMan" :label-width="formLabelWidth">
                                <el-input v-model="module.LinkMan" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人电话" prop="Phote" :label-width="formLabelWidth">
                                <el-input v-model="module.Phote" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="简介" prop="Memo" :label-width="formLabelWidth">
                                <el-input type="textarea" :rows="3" placeholder="请输入简介"
                                    v-model="module.Memo"></el-input>
                            </el-form-item>
                            <el-form-item label="Logo" prop="Logo" :label-width="formLabelWidth">
                                <el-upload class="avatar-uploader" action="/api/upload/fileupload"
                                    :show-file-list="false" :on-success="UpLoadSuccess">
                                    <img v-if="module.Logo" :src="module.Logo" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"
                                        style=" border-style: solid;    border-color: #a69fe2;    border-width: 1px;"></i>
                                </el-upload>
                            </el-form-item>

                            <el-form-item label="登录用户名" prop="LoginName" :label-width="formLabelWidth">
                                <el-input v-model="module.LoginName"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                                <el-input placeholder="默认密码：123abc" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" prop="MemberName" :label-width="formLabelWidth">
                                <el-input v-model="module.MemberName"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="Sex" :label-width="formLabelWidth">
                                <el-select v-model="module.Sex" placeholder="请选择">
                                    <el-option key="男" label="男" value="男"></el-option>
                                    <el-option key="女" label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号" prop="PhoneNumber" :label-width="formLabelWidth">
                                <el-input v-model="module.PhoneNumber"></el-input>
                            </el-form-item>
                        </el-form>
                    </template>
                    <div style="width: 100%;text-align: center;margin-bottom: 10px;">
                        <el-button type="success" @click="CheckRegisterInfo('module')"
                            style="display: inline-block;width: 50%;">注册</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
            pageSizeOption: [10, 15, 20, 50, 100],
            tableData: [],
            editerdialogVisible: false,
            editerdialogTitle: "编辑",
            module: { id: 0, Name: "", Memo: "", LinkMan: "", Phone: "", Logo: "", Address: "", LoginName: "", MemberName: "", Sex: "", PhoneNumber: "" },
            formLabelWidth: "120px",
            childModuleFID: 0,
            currentRow: {},
            add_Mode: "SameLevel",
            loading: true,
            rules: {
                Name: [
                    { required: true, message: '请输入学校名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                Memo: [
                    { required: true, message: '请输入简介', trigger: 'blur' },
                ],
                LinkMan: [
                    { required: true, message: '请输入学校联系人', trigger: 'blur' },
                ],
                Phote: [
                    { required: true, message: '请输入学校联系电话', trigger: 'blur' },
                ],
                Logo: [
                    { required: true, message: '请上传学校LOGO', trigger: 'blur' },
                ],
                Sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                Address: [
                    { required: true, message: '请输入学校地址', trigger: 'blur' }
                ],

                LoginName: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                ],
                MemberName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                PhoneNumber: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
                ],
                UnitName: [
                    { required: true, message: '请输入单位名称', trigger: 'blur' },
                ],
                State: [
                    { required: true, message: '请选择状态', trigger: 'blur' }
                ],
            }
        };
    },
    mounted() {
        this.GetList(1);
    },
    methods: {
        CheckRegisterInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        method: "GET",
                        url: "/api/school?Name=" + this.module.Name,
                    })
                        .then((response) => {
                            if (response.data.err == 0 && response.data.data.count > 0) {
                                this.$message.error('该学校已存在，不能重复添加');
                            } else {
                                //检查用户是否存在
                                this.checkUserIsHave();
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
        checkUserIsHave() {
            this.$axios({
                method: "GET",
                url: "/api/systemMember?LoginName=" + this.module.LoginName,
            })
                .then((response) => {
                    if (response.data.err == 0 && response.data.data.count > 0) {
                        this.$message.error('该登录名已被使用！');
                    } else {
                        this.doAddSchool();
                    }
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                });
        },
        doAddSchool() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "post",
                url: "/api/school",
                data: qs.stringify({
                    Name: this.module.Name,
                    Phote: this.module.Phote,
                    LinkMan: this.module.LinkMan,
                    Logo: this.module.Logo,
                    Memo: this.module.Memo,
                    Address: this.module.Address,
                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                       let  schoolID=response.data.data.id;
                        this.doAddMember(schoolID)
                    } else {
                        this.$message({
                            type: "info",
                            message: "添加失败，请重试",
                        });
                        this.loading = false;
                    }
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                    this.loading = false;
                });
        },
        doAddMember(schoolID)
        {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "post",
                url: "/api/systemMember",
                data: qs.stringify({
                    Name: this.module.MemberName,
                    Sex: this.module.Sex,
                    LoginName: this.module.LoginName,
                    PhoneNumber: this.module.PhoneNumber,
                    UnitName: this.module.Name,
                    State: '在职',
                    RelationKEY: 'T_School',
                    RelationValue: schoolID,
                    UserType: '学校',
                    LoginPwd: '123abc',
                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                       
                        this.$alert('你的注册已成功，请登录系统', '注册成功', {
                        confirmButtonText: '确定',
                        callback: action => {
                             this.$router.push({ path: '/Web/Login'  })
                        }
                        });
                         
                    } else {
                        this.loading = false;
                        this.$message({
                            type: "info",
                            message: "添加失败，请重试" + response.data.err,
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                    this.loading = false;
                });

        

        },
        doUpdate() {
            var _this = this;
            var qs = require("qs");
            this.$axios({
                method: "patch",
                url: "/api/company/" + this.module.id,
                data: qs.stringify({
                    Name: this.module.Name,
                    IndexNumber: this.module.IndexNumber,
                    Memo: this.module.Memo,
                    LinkMan: this.module.LinkMan,
                    Phone: this.module.Phone,
                    Logo: this.module.Logo,
                    Address: this.module.Address,
                }),
            })
                .then((response) => {
                    if (response.data.data) {
                        this.$message({
                            type: "success",
                            message: "更新成功!",
                        });
                        this.GetList(this.pageinfo.CurrentPageNumber);
                    } else if (response.data == "ReLogin") {
                        this.$message.error("你的登录已超时，请重新登录！！");
                    } else {
                        this.$message({
                            type: "info",
                            message: "更新失败，请重试",
                        });
                    }
                    this.editerdialogVisible = false;
                })
                .catch(function (error) {
                    _this.$message.error("出错了：" + error);
                });
        },
        Edit_Company(row) {
            this.module = row;
            this.editerdialogTitle = "编辑";
            this.editerdialogVisible = true;
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
            this.$axios({
                method: "get",
                url: "/api/company?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
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
            ///////////////////////////////////////////////////////////////
        },
        UpLoadSuccess(data) {
            this.module.Logo = "/api/files/" + data.data.split('*')[0];
        },
        Add_Company() {
            ///Web/Resource/ReourceAdd
            this.$router.push("/Web/Resource/ReourceAdd");
        },

        clear_info() {
            //module: { ID: 0, Name: '', IndexNumber: 0, FacID: 0, Memo: '' },
            this.module.ID = 0;
            this.module.Name = "";
            this.module.IndexNumber = 0;
            this.module.FacID = 0;
            this.module.Memo = "";
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        doCheckAdd() {
            /// 检查要添加的学校是否已存在
            this.$axios({
                method: "GET",
                url: "/api/company?Name=" + this.module.Name,
            })
                .then((response) => {
                    if (response.data.err == 0 && response.data.data.count > 0) {
                        this.$message.error('该企业已存在，不能重复添加');
                    } else {
                        this.doAdd();
                    }
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                });
        },
        doAdd() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "post",
                url: "/api/company",
                data: qs.stringify({
                    ID: this.currentRow.id,
                    Name: this.module.Name,
                    Phone: this.module.Phone,
                    LinkMan: this.module.LinkMan,
                    Logo: this.module.Logo,
                    Memo: this.module.Memo,
                    Address: this.module.Address,
                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                        this.GetList(1);
                    } else {
                        this.loading = false;
                        this.$message({
                            type: "info",
                            message: "添加失败，请重试" + response.data.err,
                        });
                    }
                    this.editerdialogVisible = false;
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                });

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