<template>
 <el-container>
            <el-aside width="300px">
                <div class="grid-content bg-purple-dark">
                    <div style="display:inline;cursor:pointer">组织机构</div>
                </div>
                <el-tree :data="TreeData" :props="defaultProps" node-key="id" @node-click="treeNodeClick"></el-tree>

            </el-aside>
            <el-main>
                <div class="grid-content bg-purple-dark">
                    <div style="display: inline; cursor: pointer">[{{Organize.OrgName}}]人员列表 </div>
                    <div style="display:inline;float:right; margin-top: -4px; padding-right:10px;padding-bottom:10px;cursor:pointer">
                        <el-button type="primary" size="mini" v-if="CurrentOrgID!=0" @click="Org_Add('Dep')">新建部门</el-button>
                        <el-button type="primary" size="mini" v-if="CurrentOrgID!=0" @click="Org_Edit()">修改部门</el-button>
                        <el-button type="primary" size="mini" v-if="CurrentOrgID!=0" @click="Org_Del()">删除部门</el-button>
                        <el-button type="primary" size="mini" v-if="CurrentOrgID!=0" @click="Member_Add()">添加人员</el-button>
                        <el-button type="primary" size="mini" v-if="CurrentOrgID!=0" @click="Member_Del()">删除人员</el-button>
                        <el-button type="primary" size="mini" v-if="CurrentOrgID!=0" @click="DownLoadTemplate()" style="margin-bottom:5px">下载模板</el-button>
                        <el-upload class="upload-demo" style="float: inherit;" v-if="CurrentOrgID!=0" action="../FileManager/FileUpLoad.ashx" :on-success="UpLoadSuccess" multiple :limit="100" :file-list="files">
                            &nbsp;&nbsp;<el-button size="mini" type="primary">导入人员</el-button>
                            <div slot="tip" class="el-upload__tip"> </div>
                        </el-upload>
                    </div>
                </div>
                <template>
                    <el-table :data="MemberListData" border style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-table-column type="selection"
                                         width="55">
                        </el-table-column>
                        <el-table-column prop="Name" label="姓名" width="100"> </el-table-column>
                        <el-table-column prop="Sex" label="性别" width="100"> </el-table-column>
                        <el-table-column prop="PhoneNumber"
                                         label="手机号码"
                                         width="180">
                        </el-table-column>
                        <el-table-column prop="Channel_Index"
                                         label="排序号"
                                         width="100">
                        </el-table-column>
                        <el-table-column prop="Channel_URL"
                                         label="栏目地址">
                        </el-table-column>
                        <el-table-column fixed="right"
                                         label="操作"
                                         width="150"
                                         align="center">
                            <template slot-scope="scope">
                                <el-button @click="changeToOrg(scope.row)"
                                           type="text"
                                           size="small">
                                    调动
                                </el-button>
                                <el-button @click="ToMember_Edit(scope.row)"
                                           type="text"
                                           size="small">
                                    编辑
                                </el-button>

                            </template>
                        </el-table-column>
                    </el-table>

                </template>
            </el-main>
       

        <el-dialog :title='editerdialogTitle' :visible.sync="Org_DialogVisible">
            <el-form :model="Organize" size="mini ">
                <el-form-item label="名称" :label-width="editerdialogFormLabelWidth">
                    <el-input v-model="Organize.OrgName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="editerdialogFormLabelWidth">
                    <el-input v-model="Organize.IndexNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <script id="editor" type="text/plain" style="width:100%; height:400px;">
                </script>
                <el-button @click="Org_DialogVisible = false">取 消</el-button>
                <el-button v-show="editerdialogTitle==='编辑'" type="primary" @click="doEditOrg">确 定</el-button>
                <el-button v-show="editerdialogTitle==='添加'" type="primary" @click="doAddOrg">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title='Member_DialogTitle' :visible.sync="Member_DialogVisible">
            <table style="width:100%">
                <tr>
                    <td style="width:100px" align="right">姓名</td>
                    <td> <el-input v-model="Member.Name" placeholder="请输入姓名"></el-input></td>
                </tr>
                <tr>
                    <td align="right">性别</td>
                    <td>
                        <el-radio v-model="Member.Sex" label="男">男</el-radio>
                        <el-radio v-model="Member.Sex" label="女">女</el-radio>
                    </td>
                </tr>
                <tr>
                    <td align="right">登录名</td>
                    <td>
                        <el-input v-model="Member.LoginName" v-if="Member_DialogTitle=='添加人员'" placeholder="请输入登录名"></el-input>
                        <el-input v-model="Member.LoginName" disabled=false v-if="Member_DialogTitle!='添加人员'" placeholder="请输入登录名"></el-input>
                    </td>
                </tr>
                <tr>
                    <td align="right">登录密码</td>
                    <td> <el-input disabled=false placeholder="默认密码为：1234567"></el-input></td>
                </tr>
                <tr>
                    <td align="right">手机号</td>
                    <td> <el-input v-model="Member.PhoneNumber" placeholder="请输入手机号码"></el-input></td>
                </tr>
                <tr>
                    <td align="right">办公室电话</td>
                    <td> <el-input v-model="Member.OfficePhone" placeholder="请输入办公室电话"></el-input></td>
                </tr>
                <tr>
                    <td align="right">备注信息</td>
                    <td> <el-input type="textarea" v-model="Member.Memo" placeholder="请输入备注信息"></el-input></td>
                </tr>
            </table>
            <div slot="footer" class="dialog-footer">
                <script id="editor" type="text/plain" style="width:100%; height:400px;">
                </script>
                <el-button @click="Member_DialogVisible = false">取 消</el-button>
                <el-button v-show="Member_DialogTitle==='编辑人员'" type="primary" @click="doEdit_Member">确 定</el-button>
                <el-button v-show="Member_DialogTitle==='添加人员'" type="primary" @click="doAdd_Member">确 定</el-button>
            </div>
        </el-dialog>
        
        <el-dialog :title='ChangeOrgdialogTitle' :visible.sync="ChangeOrg_DialogVisible">
            <table style="width:100%;height:300px;overflow-y:scroll">
                <tr>
                    <td valign="top">
                        <el-tree :data="TreeData" :props="defaultProps" node-key="id" @node-click="ChangeTotreeNodeClick"></el-tree>
                    </td>
                </tr>
                </table>
            <div slot="footer" class="dialog-footer">
                <script id="editor" type="text/plain" style="width:100%; height:400px;">
                </script>
                <el-button @click="ChangeOrg_DialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doChangeOrg">确 定</el-button>
            </div>
        </el-dialog>
 </el-container>
</template>
<script>
export default {
  data() {
    return {
       loading: false,
      multipleSelection: [],
      Member_DialogTitle: '添加人员',
      Member_DialogVisible: false,
      ChangeOrg_DialogVisible: false,
      ChangeOrgdialogTitle: '调整部门',
      ChangeToOrgID: 0,
      ChangeMemberID:0,
      CurrentOrgID: 0,
      MemberListData: [],
      Organize: { ID: 0, OrgName: '', FacID: 0, IndexNumber: 0, OrgType: '', Org_Top_PositionID: 0 },
      Member: { ID: 0, Name: '', LoginName: '', LoginPwd: '', Sex: '', PhoneNumber: '', Fax: '', OfficePhone: '', GUID: '', RelationKEY: '', RelationValue: '', Memo: '', RoleID: 0 },
      Org_DialogVisible: false,
      editerdialogTitle: '添加',
      editerdialogFormLabelWidth: '100px',
      TreeData: [],
      defaultProps: {
          children: 'children',
          label: 'label'
      },
      files:[]
    };
  },
  mounted() {
                this.getTreeNodes();
            },
            methods:
            {
                doChangeOrg() {
                    this.$axios({
                        method: "post",
                        url: "Member_ChangeOrg.ashx",
                        data: qs.stringify({
                            MemberID: this.ChangeMemberID,
                            ToOrgID: this.ChangeToOrgID,
                            CurrentOrgID: this.CurrentOrgID

                        })
                    }).then(response => {
                        if (response.data == "ReLogin") {
                            this.$message.error('你的登录已过期，请重新登录！');
                        }
                        else if (response.data == "Success") {
                            this.$message({ type: 'success', message: '更新成功!' });
                            this.MemberList(this.Organize.ID);
                        }
                        else {
                            this.$message({ type: 'info', message: response.data });
                        }
                        this.ChangeOrg_DialogVisible = false;
                    }).catch(error => {
                        this.$message({ type: 'info', message: error });
                    });
                },
                ChangeTotreeNodeClick(data) {
                    this.ChangeToOrgID = data.id;
                    
                },
                changeToOrg(row) {
                    this.ChangeOrg_DialogVisible = true;
                    this.ChangeMemberID = row.ID;
                },
                doEdit_Member() {
                    this.$axios.get('/api/WebInterface/System/OrganizeManager/Member_Update.ashx', {
                        params: {
                            ID: this.Member.ID,
                            Name: this.Member.Name,
                            LoginName: this.Member.LoginName,
                            LoginPwd: this.Member.LoginPwd,
                            Sex: this.Member.Sex,
                            PhoneNumber: this.Member.PhoneNumber,
                            Fax: this.Member.Fax,
                            OfficePhone: this.Member.OfficePhone,
                            GUID: this.Member.GUID,
                            RelationKEY: this.Member.RelationKEY,
                            RelationValue: this.Member.RelationValue,
                            RoleID: this.Member.RoleID,
                            Memo: this.Member.Memo,
                            OrgID: this.Organize.ID,
                        }
                    })
                        .then(response => {
                            if (response.data == "ReLogin") {
                                this.$message.error('你的登录已超时，请重新登录！！');
                            }
                            else if (response.data == "Success") {
                                this.$message({ type: 'success', message: '更新成功!' });
                                this.MemberList(this.Organize.ID);
                            }
                            else {
                                this.$message({ type: 'error', message: response.data });
                            }
                            this.Member_DialogVisible = false;
                        })
                        .catch(function (error) {
                            this.$message.error('出错了：' + error);
                        });
                },
                ToMember_Edit(row) {
                    this.Member_DialogVisible = true;
                    this.Member_DialogTitle = "编辑人员";
                    this.Member.ID = row.ID;
                    this.Member.Name = row.Name;
                    this.Member.LoginName = row.LoginName;
                    this.Member.LoginPwd = row.LoginPwd;
                    this.Member.Sex = row.Sex;
                    this.Member.PhoneNumber = row.PhoneNumber;
                    this.Member.Fax = row.Fax;
                    this.Member.OfficePhone = row.OfficePhone;
                    this.Member.GUID = row.GUID;
                    this.Member.RelationKEY = row.RelationKEY;
                    this.Member.RelationValue = row.RelationValue;
                    this.Member.RoleID = row.RoleID;
                    this.Member.Memo = row.Memo;
                },
                DownLoadTemplate() {
                    document.location.href = "Import_Template/Template.xls";
                },
                UpLoadSuccess(response, file, fileList) {
                    var o = eval("(" + fileList[0].response + ")");
                    var path = o.FilePath;
                    this.ImportMember(path, this.CurrentOrgID);
                    fileList=[];
                },
                ImportMember(path, CurrentOrgID) {
                    this.$axios({
                        method: "post",
                        url: "Member_Import_Excel.ashx",
                        data: qs.stringify({
                            p: path,
                            OrgID: CurrentOrgID
                        })
                    }).then(response => {
                        if (response.data == "ReLogin") {
                            this.$message.error('你的登录已过期，请重新登录！');
                        }
                        else {
                            this.$message({ type: 'info', message: response.data });
                            this.MemberList(this.Organize.ID);
                        }
                    }).catch(error => {
                        this.$message({ type: 'info', message: error });
                    });
                },

                handleSelectionChange(val) {
                    this.multipleSelection = val;
                },
                Member_Del() {
                    var _this = this;
                    var ids = "";
                    for (var i = 0; i < this.multipleSelection.length; i++) {
                        ids += this.multipleSelection[i].ID + ",";
                    }
                    ids += "0";
                    this.$axios.get('/api/WebInterface/System/OrganizeManager/Member_Del.ashx', {
                        params: {
                            ids: ids,
                            OID: this.CurrentOrgID
                        }
                    })
                        .then(response => {
                            if (response.data == "ReLogin") {
                                this.$message.error('你的登录已超时，请重新登录！！');
                            }
                            else {
                                if (response.data.errorlist.length == 0) {
                                    _this.$message({ type: 'info', message: response.data.msg });

                                }
                                else {
                                    _this.$message({ type: 'info', message: response.data.errorlist });
                                }
                                _this.MemberList(_this.Organize.ID);
                            }
                        })
                        .catch(function (error) {
                            _this.$message.error('出错了：' + error);

                        });
                },
                doAdd_Member() {
                    this.$axios.get('/api/WebInterface/System/OrganizeManager/Member_Add.ashx', {
                        params: {
                            Name: this.Member.Name,
                            LoginName: this.Member.LoginName,
                            LoginPwd: this.Member.LoginPwd,
                            Sex: this.Member.Sex,
                            PhoneNumber: this.Member.PhoneNumber,
                            Fax: this.Member.Fax,
                            OfficePhone: this.Member.OfficePhone,
                            GUID: this.Member.GUID,
                            RelationKEY: this.Member.RelationKEY,
                            RelationValue: this.Member.RelationValue,
                            RoleID: this.Member.RoleID,
                            Memo: this.Member.Memo,
                            OrgID: this.Organize.ID,
                        }
                    })
                        .then(response => {
                            if (response.data == "ReLogin") {
                                this.$message.error('你的登录已超时，请重新登录！！');
                            }
                            else if (response.data == "Success") {
                                this.$message({ type: 'success', message: '添加成功!' });
                                this.MemberList(this.Organize.ID);
                            }
                            else {
                                this.$message({ type: 'error', message: response.data });
                            }
                            this.Member_DialogVisible = false;
                        })
                        .catch(function (error) {
                            this.$message.error('出错了：' + error);
                        });

                },
                Member_Add() {
                    this.Member_DialogVisible = true;
                    this.Member.ID = 0;
                    this.Member.Name = '';
                    this.Member.LoginName = '';
                    this.Member.LoginPwd = '';
                    this.Member.Sex = '';
                    this.Member.PhoneNumber = '';
                    this.Member.Fax = '';
                    this.Member.OfficePhone = '';
                    this.Member.GUID = '';
                    this.Member.RelationKEY = '';
                    this.Member.RelationValue = '';
                    this.Member.RoleID = 0;
                    this.Member.Memo = '';
                },
                Org_Del() {
                    this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios.get('/api/WebInterface/System/OrganizeManager/Org_Del.ashx', {
                            params: {
                                OID: this.Organize.ID,
                            }
                        })
                            .then(response => {
                                if (response.data == "ReLogin") {
                                    this.$message.error('你的登录已超时，请重新登录！！');
                                }
                                else if (response.data == "Success") {
                                    this.$message({ type: 'success', message: '删除成功!' });
                                    this.getTreeNodes();
                                }
                                else {
                                    this.$message({ type: 'error', message: response.data });
                                }
                            })
                            .catch(function (error) {
                                _this.$message.error('出错了：' + error);

                            });

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                },
                doEditOrg() {
                    var _this = this;
                    this.$axios.get('/api/WebInterface/System/OrganizeManager/Org_Update.ashx', {
                        params: {
                            OID: this.Organize.ID,
                            OrgName: this.Organize.OrgName,
                            IndexNumber: this.Organize.IndexNumber,
                        }
                    })
                        .then(response => {
                            if (response.data == "ReLogin") {
                                this.$message.error('你的登录已超时，请重新登录！！');
                            }
                            else if (response.data == "Success") {
                                this.$message({ type: 'success', message: '更新成功!' });
                                this.getTreeNodes();
                            }
                        })
                        .catch(function (error) {
                            _this.$message.error('出错了：' + error);

                        });
                    this.Org_DialogVisible = false;
                },
                Org_Edit() {
                    var _this = this;
                    this.$axios.get('/api/WebInterface/System/OrganizeManager/Org_info.ashx', {
                        params: {
                            OID: this.CurrentOrgID,
                        }
                    })
                        .then(response => {
                            if (response.data == "ReLogin") {
                                this.$message.error('你的登录已超时，请重新登录！！');
                            }
                            else {
                                //Organize: { ID: 0, OrgName: '', FacID: 0, IndexNumber: 0, OrgType: '', Org_Top_PositionID: 0 },
                                this.Organize.OrgName = response.data.OrgName;
                                this.Organize.IndexNumber = response.data.IndexNumber;
                                this.Organize.ID = response.data.ID;
                            }
                        })
                        .catch(function (error) {
                            _this.$message.error('出错了：' + error);
                        });
                    this.Org_DialogVisible = true;
                    this.editerdialogTitle = '编辑';
                },
                Org_Add(Type) {
                    this.Org_DialogVisible = true;
                    this.editerdialogTitle = "添加";
                },
                doAddOrg() {
                    //  Organize: { ID: 0, OrgName: '', FacID: 0, IndexNumber: 0, OrgType: '', Org_Top_PositionID: 0 },
                    this.$axios.get('/api/WebInterface/System/OrganizeManager/Org_Add.ashx', {
                        params: {
                            OrgName: this.Organize.OrgName,
                            IndexNumber: this.Organize.IndexNumber,
                            FacID: this.CurrentOrgID,
                        }
                    })
                        .then(response => {
                            if (response.data == 'Success') {
                                this.$message({
                                    type: 'success',
                                    message: '更新成功!'
                                });
                                this.getTreeNodes();
                            }
                            else if (response.data == "ReLogin") {
                                this.$message.error('你的登录已超时，请重新登录！！');
                            }
                            else {
                                this.$message({
                                    type: 'info',
                                    message: '更新失败，请重试'
                                });

                            }
                            this.Org_DialogVisible = false;
                        })
                        .catch(function (error) {
                            _this.$message.error('出错了：' + error);
                        });
                },
                getTreeNodes() {
                    this.$axios.get('/api/systemOrganize/systemOrganizeTree?facid=0', {
                        params: {
                        }
                    }).then(response => {
                        if (response.data != "[]") {
                            this.TreeData = eval("(" + response.data.data + ")");
                        }
                    }).catch(error => {
                        this.$message({
                            type: 'info',
                            message: error
                        });
                    });
                },
                 
                treeNodeClick(data) {
                    this.CurrentOrgID = data.id;
                    this.Organize.OrgName = data.label;
                    this.Organize.ID = data.id;
                    this.MemberList(data.id);
                },
                MemberList(OrgID) {
                    this.loading = true;
                    this.$axios.get('/api/WebInterface/System/OrganizeManager/Member_List.ashx?OrgID=' + OrgID, {
                        params: {}
                    }).then(response => {
                        if (response.data == "ReLogin") {
                            this.$message.error('你的登录已超时，请重新登录！！');
                        }
                        else if ((response.data + "") != "[]") {
                            this.MemberListData = response.data
                        }
                        
                        this.loading = false;
                    }).catch(error => {
                        this.$message({ type: 'info',  message: error  });
                        this.loading = false;
                    });
                },
                Article_Add() {
                    this.editerdialogVisible = true;
                },
    rowStyle({ row, rowIndex }) {
      return "height:20px";
    },
    cellStyle({ row, rowIndex }) {
      return "padding:0";
    }
  },
 
};
</script>
 
<style scoped >
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
.el-header {
  padding: 0px;
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 5px;
  height: 50px;
}
.el-aside {
  background-color: #fff;
  color: #333;
  text-align: left;

  padding: 0px;
  margin-left: 5px;
  width: "200px";
}
.el-main {
  background-color: #fff;
  color: #333;
  margin-left: 5px;
  margin-right: 5px;
}

el-table td,
.el-table th {
  padding: 0px 0;
}
</style>

 