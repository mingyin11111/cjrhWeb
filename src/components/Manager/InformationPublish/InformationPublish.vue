<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <!--div style="display: inline; cursor: pointer">用户管理&gt;</div-->
                        <table style="margin-bottom: 10px;">
                            <tr>
                                <td>名称</td>
                                <td> <el-input size="small" v-model="search_Name" placeholder="请输入内容"></el-input></td>
                                
                                <td style="padding-left: 20px;"><el-button type="primary" size="mini">搜索</el-button></td>
                                <td style="padding-left: 20px;"> <el-button type="primary" size="mini" @click="To_Publish">添加</el-button></td>
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
                            <el-table-column prop="NeedName" label="需求名称"  > </el-table-column>
                            <el-table-column prop="NeedType" label="需求类型"  > </el-table-column>
                            <el-table-column prop="WinningName" label="中标方" width="250"> </el-table-column>
                            <el-table-column prop="State" label="状态" width="150"> </el-table-column>
                            <el-table-column fixed="right" label="操作" width="300" align="center">
                                <template slot-scope="scope">
                                    <el-button @click="toviewDetail(scope.row)" type="text" size="medium">
                                        <i class="el-icon-edit">详情</i>
                                    </el-button>
                                    <el-button @click="Edit_Company(scope.row)" type="text" size="medium">
                                        <i class="el-icon-edit">修改</i>
                                    </el-button>
                                    <el-button @click="deleteRow(scope.row)" type="text" size="medium">
                                        <i class="el-icon-delete-solid">删除</i>
                                    </el-button>
                                    <el-button  v-if="scope.row.State=='已发布'" @click="UnDoPublish(scope.row)" type="text" size="medium">
                                        <i class="el-icon-delete-solid">取消发布</i>
                                    </el-button>
                                    <el-button v-if="scope.row.State=='待发布'" @click="DoPublish(scope.row)" type="text" size="medium">
                                        <i class="el-icon-delete-solid">发布</i>
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
                                <el-form-item label="需求类型" prop="NeedType">
                                    <el-select v-model="module.NeedType" placeholder="请选择" style="width: 100%;" @change="NeedTypeChange">
                                        <el-option key="课程开发" label="课程开发" value="课程开发"></el-option>
                                        <el-option key="虚拟仿真" label="虚拟仿真" value="虚拟仿真"></el-option>
                                        <el-option key="微课制作" label="微课制作" value="微课制作"></el-option>
                                        <el-option key="教师教学能力大赛" label="教师教学能力大赛" value="教师教学能力大赛"></el-option>
                                        <el-option key="实训室建设" label="实训室建设" value="实训室建设"></el-option>
                                        <el-option key="智能硬件" label="智能硬件" value="智能硬件"></el-option>
                                        <el-option key="其他" label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="需求名称" prop="NeedID">
                                    <el-select v-model="module.NeedID" placeholder="请选择" style="width: 100%;"   >
                                        <el-option v-for="item in NeedsList" :key="item.id" :label="item.Title"  :value="item.id">  </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="附件"  >
                                    <el-row :gutter="10" v-loading="loading">
                                        <el-col :span="5" v-for="item in fileList" :key="item">
                                            <div style="width: 100%; overflow: hidden" v-on:mousemove="MouseMove(item)">
                                                <table  style="width: 100%; margin-top: 5px;  border-style:solid; border-width: thin; height: 110px;  z-index: 90; position: relative;">
                                                    <tr>
                                                        <td align="center" style="line-height: normal;">
                                                            <el-image style="width: 70px; height: 70px" :src="item.split('*')[0]" fit="scale-down"></el-image>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr >
                                                        <td style="height:35px;overflow: hidden;">
                                                            <div v-show="currentFileItem==item" style="height:35px;overflow: hidden;">
                                                                <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                                                                    <el-button type="danger" icon="el-icon-delete" size="mini" alt="删除" @click="deletePic(item)" circle></el-button>
                                                                </el-tooltip>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label=" " :label-width="formLabelWidth">
                                    <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="false"
                                    :on-success="UpLoadSuccess"  >
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>

                            </el-form>
                        </td>
                    </tr>
                </table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editerdialogVisible = false">取 消</el-button>
                    <el-button v-if="editerdialogTitle === '编辑'" type="primary" @click="doCheckUpdate('module')">确 定</el-button>
                    <el-button v-if="editerdialogTitle != '编辑'" type="primary" @click="doCheckAdd('module')">确 定</el-button>
                </div>
            </el-dialog>
          
        </el-main>
    </el-container>
</template>
  
<script>
export default {
    name: "InformationPublish",
    data() {
        return {
            NeedsList:[],
            fileList:[],
            currentFileItem:'',
            choose: "",
            search_PhoneNumber: '',
            search_Name: '',
            pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
            pageSizeOption: [10, 15, 20, 50, 100],
            tableData: [],
            editerdialogVisible: false,
            editerdialogTitle: "添加成果展示",
            module: { id: 0, NeedName: "", NeedType: "", WinningName: "", State: "未发布", NeedID:  0 },
            formLabelWidth: "120px",
            childModuleFID: 0,
            currentRow: {},
            add_Mode: "SameLevel",
            loading: true,
            Unit_School_Company_List: [],
            multipleSelection: [],
            rules: {
                NeedID: [
                    { required: true, message: '请选择需求名称', trigger: 'blur' },
                ],
                NeedType: [
                    { required: true, message: '请选择类型', trigger: 'change' }
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
    },
    methods: {
        
        NeedTypeChange(T)
        {
             // NeedsList
             this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "GET",
                url: "/api/need?skipPaging&Type="+T,
            })
                .then((response) => {
                    if (response.data.err == 0) {
                       this.NeedsList= response.data.data.rows;
                    } else {
                        this.$message({
                            type: "info",
                            message: "添加失败，请重试",
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.$message.error(" 出错 " + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        To_Publish() {
            this.editerdialogTitle = "添加成功展示";
            this.add_Mode = "SameLevel";
            this.clear_info();
            this.editerdialogVisible = true;
           
           

        },
        toviewDetail(row) {
            this.$router.push({path:'/Manager/InformationPublish/InformationPublishDetail',query:{informationID:row.id}})
             
        },
        deletePic(item)
        {
            for(var i=0;i<this.fileList.length;i++)
            {
                if(item==this.fileList[i])
                {
                    this.fileList.splice(i,1);
                }
            }
        },
        MouseMove(item)
        {
            this.currentFileItem=item;
        },
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
            this.$confirm("确定要删除当前行吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.deleteInformation(row);
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        deleteInformation(row) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "DELETE",
                url: "/api//informationPublish/" + row.id,
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
        UnDoPublish(row) {
            var _this = this;
            var qs = require("qs");
            this.$confirm("确定要取消发布吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.$axios({
                method: "patch",
                url: "/api/informationPublish/" + row.id,
                data: qs.stringify({
                    State: "待发布",
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

            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });

           
        },
        DoPublish(row) {
            var _this = this;
            var qs = require("qs");
            this.$axios({
                method: "patch",
                url: "/api//informationPublish/" + row.id,
                data: qs.stringify({
                    State: "已发布",
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this. doAdd();
                } else {
                    return false;
                }
            });
        },

        doAdd() {
            if(this.module.NeedID==0)
            {
                this.$message.error("请选择项目名称"  );
                return;
            }
            let currrentNeed={};
            for(var i=0;i<this.NeedsList.length;i++)
            {
                if(this.NeedsList[i].id==this.module.NeedID)
                {
                    currrentNeed=this.NeedsList[i];
                }
            }
            this.module.WinningName=currrentNeed.WinningOrganize;
            this.module.State="待发布";
            let AttachmentSubmit = "";
            for (var i = 0; i < this.fileList.length; i++) {
                AttachmentSubmit += this.fileList[i]
                if (i < this.fileList.length - 1) {
                    AttachmentSubmit += "|"
                }
            }

            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "post",
                url: "/api/informationPublish",
                data: qs.stringify({
                    NeedName: currrentNeed.Title,
                    NeedType: this.module.NeedType,
                    WinningName: this.module.WinningName,
                    State: this.module.State,
                    NeedID: this.module.NeedID,
                    Attachment:AttachmentSubmit
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

 
        GetList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/informationPublish?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
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
            //module: { id: 0, NeedName: "", NeedType: "", WinningName: "", State: "", NeedID: 0 },
            this.module.ID = 0;
            this.module.NeedName = "";
            this.module.NeedType = "";
            this.module.WinningName = "";
            this.module.State = "";
            this.module.NeedID = 0;
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
           this.fileList.push("/api/files/" + data.data);
        },

        UpLoadChange(file,list) {
           this.fileList=list;
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
    display: inline-table;
}

.el-icon-plus avatar-uploader-icon {
    border-style: solid;
    border-color: #a69fe2;
    border-width: 1px;
}
</style>
  