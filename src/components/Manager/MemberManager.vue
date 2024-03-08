<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <!--div style="display: inline; cursor: pointer">用户管理&gt;</div-->
                        <table style="margin-bottom: 10px;">
                            <tr>
                                <td>姓名</td>
                                <td> <el-input size="small" v-model="search_Name" placeholder="请输入内容"></el-input></td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>手机号码</td>
                                <td> <el-input size="small" v-model="search_PhoneNumber" placeholder="请输入内容"></el-input>
                                </td>
                                <td style="padding-left: 20px;"><el-button type="primary" size="mini">搜索</el-button></td>
                                <td style="padding-left: 20px;"> <el-button type="primary" size="mini"
                                        @click="Add_Member">添加</el-button></td>
                                <td style="padding-left: 20px;"> <el-button type="primary" size="mini">批量导入</el-button></td>
                                <td style="padding-left: 20px;"> <el-button type="primary" @click="DeleteSelRow"
                                        size="mini">批量删除</el-button></td>
                            </tr>
                        </table>


                    </div>
                    <template>
                        <el-table :data="pageinfo.PageData" style="width: 100%" row-key="id" :row-style="rowStyle"
                            :cellStyle="cellStyle" border default-expand-all highlight-current-row
                            @current-change="handleCurrentChange" @selection-change="handleSelectionChange"
                            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" v-loading="loading"
                            element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)">
                            <el-table-column type="selection" width="55"> </el-table-column>
                            <el-table-column label="序号" width="70" type="index" :index="rowNumberMethod"> </el-table-column>
                            <el-table-column prop="LoginName" label="用户名" width="150"> </el-table-column>
                            <el-table-column prop="Name" label="姓名" width="150"> </el-table-column>
                            <el-table-column prop="Sex" label="性别" width="150"> </el-table-column>
                            <el-table-column prop="PhoneNumber" label="手机号码" width="150"> </el-table-column>
                            <el-table-column prop="UnitName" label="单位"> </el-table-column>
                            <el-table-column prop="State" label="状态" width="100"> </el-table-column>

                            <el-table-column fixed="right" label="操作" width="150" align="center">
                                <template slot-scope="scope">
                                    <el-button @click="Edit_Company(scope.row)" type="text" size="medium">
                                        <i class="el-icon-edit">修改</i>
                                    </el-button>
                                    <el-button @click="deleteRow(scope.row)" type="text" size="medium">
                                        <i class="el-icon-delete-solid">删除</i>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
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
                </el-col>
            </el-row>

            <el-dialog :title="editerdialogTitle" :visible.sync="editerdialogVisible" width="600px">
                <table style="width:100%">
                    <tr>
                        <td align="left">
                            <el-form :model="module" :rules="rules" ref="module" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="姓名" prop="Name">
                                    <el-input v-model="module.Name"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" prop="Sex">
                                    <el-select v-model="module.Sex" placeholder="请选择">
                                        <el-option key="男" label="男" value="男"></el-option>
                                        <el-option key="女" label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="手机号" prop="PhoneNumber">
                                    <el-input v-model="module.PhoneNumber"></el-input>
                                </el-form-item>
                                <el-form-item label="登录用户名" prop="LoginName">
                                    <el-input v-if="editerdialogTitle != '编辑'" v-model="module.LoginName"></el-input>
                                    <span v-if="editerdialogTitle == '编辑'">{{ module.LoginName }}</span>
                                </el-form-item>
                                <el-form-item label="单位" prop="UnitName">
                                    <el-autocomplete style="width: 100%;" v-model="module.UnitName"
                                        :fetch-suggestions="querySearch" placeholder="请输入姓名"
                                        @select="handleSelect"></el-autocomplete>
                                </el-form-item>
                                <el-form-item label="状态" prop="State">
                                    <el-select v-model="module.State" placeholder="请选择">
                                        <el-option key="在职" label="在职" value="在职"></el-option>
                                        <el-option key="离职" label="离职" value="离职"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </td>
                    </tr>
                </table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editerdialogVisible = false">取 消</el-button>

                    <el-button v-if="editerdialogTitle === '编辑'" type="primary" @click="doCheckUpdate('module')">确
                        定</el-button>
                    <el-button v-if="editerdialogTitle != '编辑'" type="primary" @click="doCheckAdd('module')">确 定</el-button>
                </div>
            </el-dialog>
            
        </el-main>
    </el-container>
</template>
  
<script>
export default {
    name: "MemberManager",
    data() {
        return {
            choose: "",
            search_PhoneNumber: '',
            search_Name: '',
            pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
            pageSizeOption: [10, 15, 20, 50, 100],
            tableData: [],
            editerdialogVisible: false,
            editerdialogTitle: "添加用户",
            module: { id: 0, Name: "", LoginName: "", LoginPwd: "", Sex: "", PhoneNumber: "", Logo: "", Address: "", State: "", UnitName: "", RelationKEY: '', RelationValue: '', UserType: '' },
            formLabelWidth: "120px",
            childModuleFID: 0,
            currentRow: {},
            add_Mode: "SameLevel",
            loading: true,
            Unit_School_Company_List: [],
            multipleSelection: [],
            rules: {
                Name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                Sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                LoginName: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
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
        }
    },
    mounted() {
        this.Unit_School_Company_List = [];
        this.GetList(1);
        this.GetUnitSchoolList();
        this.GetUnitCompanyList();
    },
    methods: {
        deleteMembers(rows){
            var qs = require("qs");
            let ids="";
           for(var i=0;i<rows.length;i++)
           {
            ids+=rows[i].id+","
           }
           ids+="0";
            this.$axios({
                method: "post",
                url: "/api/systemMember/DeleteMemberS/" + ids,
                data: qs.stringify({
                    ids: ids,
                }),
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
                    this.$message.error(" 出错 " + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        DeleteSelRow() {
            if(this.multipleSelection.length==0)
            {
                this.$message({  type: "info",message: "请选择要删除的行"});
                return ;
            }
            this.$confirm("确定要删除选定的这些人员吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.deleteMembers(this.multipleSelection);
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteRow(row) {
            this.$confirm("确定要删除当前用户吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.deleteMember(row);
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        deleteMember(row) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "DELETE",
                url: "/api/systemMember/" + row.id,
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
                    this.$message.error(" 出错 " + error);
                    console.log(error);
                    this.loading = false;
                });
        },

        doCheckUpdate(formName) {

            // 判断用户选择的单位名称是否存在
            var isRight = false;
            for (var i = 0; i < this.Unit_School_Company_List.length; i++) {
                if (this.Unit_School_Company_List[i].type == this.module.UserType && this.Unit_School_Company_List[i].name == this.module.UnitName && this.Unit_School_Company_List[i].id == this.module.RelationValue) {
                    isRight = true;
                    break;
                }
            }
            if (!isRight) {
                this.$message.error('你输入的单位不存在，请重新选择');
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    /// 检查要添加的学校是否已存在
                    this.$axios({
                        method: "GET",
                        url: "/api/systemMember?PhoneNumber=" + this.module.PhoneNumber,
                    })
                        .then((response) => {
                            if (response.data.err == 0 && response.data.data.count > 1) {
                                this.$message.error('该手机号码存在，不能重复添加');
                            } else {
                                this.doUpdate();
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
        doUpdate() {
            var _this = this;
            var qs = require("qs");
            this.$axios({
                method: "patch",
                url: "/api/systemMember/" + this.module.id,
                data: qs.stringify({
                    Name: this.module.Name,
                    Sex: this.module.Sex,
                    PhoneNumber: this.module.PhoneNumber,
                    RelationKEY: this.module.RelationKEY,
                    RelationValue: this.module.RelationValue,
                    UserType: this.module.UserType,
                    UnitName: this.module.UnitName,
                    State: this.module.State,
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
        doCheckAdd(formName) {

            // 判断用户选择的单位名称是否存在
            var isRight = false;
            for (var i = 0; i < this.Unit_School_Company_List.length; i++) {
                if (this.Unit_School_Company_List[i].type == this.module.UserType && this.Unit_School_Company_List[i].name == this.module.UnitName && this.Unit_School_Company_List[i].id == this.module.RelationValue) {
                    isRight = true;
                    break;
                }
            }
            if (!isRight) {
                this.$message.error('你输入的单位不存在，请重新选择');
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    /// 检查要添加的学校是否已存在
                    this.$axios({
                        method: "GET",
                        url: "/api/systemMember?PhoneNumber=" + this.module.PhoneNumber,
                    })
                        .then((response) => {
                            if (response.data.err == 0 && response.data.data.count > 0) {
                                this.$message.error('该手机号码存在，不能重复添加');
                            } else {
                                this.doAdd();
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

        doAdd() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "post",
                url: "/api/systemMember",
                data: qs.stringify({
                    ID: this.currentRow.id,
                    Name: this.module.Name,
                    Sex: this.module.Sex,
                    LoginName: this.module.LoginName,
                    PhoneNumber: this.module.PhoneNumber,
                    UnitName: this.module.UnitName,
                    State: this.module.State,
                    RelationKEY: this.module.RelationKEY,
                    RelationValue: this.module.RelationValue,
                    UserType: this.module.UserType,
                    LoginPwd: '123abc',
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


        GetUnitSchoolList() {
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/school?page=1&pageSize=90000",
                data: qs.stringify({
                }),
            })
                .then((res) => {

                    if (res.data.err == 0) {
                        var llst = res.data.data.rows;
                        for (var i = 0; i < llst.length; i++) {
                            var o = { id: llst[i].id, name: llst[i].Name, type: '学校' };
                            this.Unit_School_Company_List.push(o);
                        }

                    }
                    else {
                        this.$message.error("获取部门（学校）信息错误：" + res.data.err);
                    }
                })
                .catch((error) => {
                    this.$message.error(" 出错：" + error);
                    console.log(error);

                });
        },
        GetUnitCompanyList() {
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/company?page=1&pageSize=90000",
                data: qs.stringify({
                }),
            })
                .then((res) => {

                    if (res.data.err == 0) {
                        var llst = res.data.data.rows;
                        for (var i = 0; i < llst.length; i++) {
                            var o = { id: llst[i].id, name: llst[i].Name, type: '公司' };
                            this.Unit_School_Company_List.push(o);
                        }

                    }
                    else {
                        this.$message.error("获取部门（公司）信息错误：" + res.data.err);
                    }
                })
                .catch((error) => {
                    this.$message.error(" 出错：" + error);
                    console.log(error);

                });
        },
        GetList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/systemMember?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
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
        handleSelect(item) {
            console.log(item);
            this.module.UnitName = item.value;
            if (item.type == '公司') {
                this.module.RelationKEY = "T_Company";
            }
            else if (item.type == '学校') {
                this.module.RelationKEY = "T_School";
            }
            this.module.RelationValue = item.id;
            this.module.UserType = item.type;

        },
        querySearch(queryString, cb) {
            var restaurants = this.Unit_School_Company_List.map((v) => {
                return {
                    value: v.name,
                    id: v.id,
                    type: v.type
                };
            });
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            };
        },
        clear_info() {
            //module: { id: 0, Name: "", LoginName: "", Sex: "", PhoneNumber: "", Logo: "", Address: "" ,State:""},
            this.module.ID = 0;
            this.module.Name = "";
            this.module.LoginName = "";
            this.module.LoginPwd = "";
            this.module.Sex = "";
            this.module.IndexNumber = 0;
            this.module.FacID = 0;
            this.module.UnitName = "";
            this.module.PhoneNumber = "";
            this.module.State = "";
            this.module.RelationKEY = "";
            this.module.RelationValue = "";
            this.module.UserType = "";
        },
        Add_Member() {
            this.editerdialogTitle = "添加用户";
            this.add_Mode = "SameLevel";
            this.clear_info();
            this.module.State = "在职";
            this.editerdialogVisible = true;
        },
        rowNumberMethod(index) {
            return (index + 1) + (this.pageinfo.PageSize * (this.pageinfo.CurrentPageNumber - 1));
        },
        ///////////////////////////////////////////////////////////////////////////////////////////

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

        UpLoadSuccess(data) {
            this.module.Logo = "/api/files/" + data.data;
        },



        handleCurrentChange(val) {
            this.currentRow = val;
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
  