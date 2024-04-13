<template>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <div style="display: inline; cursor: pointer">资源共享&gt;</div>
              <div style="
                  display: inline;
                  float: right;
                  margin-top: -4px;
                  padding-right: 10px;
                  padding-bottom: 10px;
                  cursor: pointer;
                ">
              </div>
            </div>
            <template>
              <el-table :data="pageinfo.PageData" style="width: 100%" row-key="id" :row-style="rowStyle"
                :cellStyle="cellStyle" border default-expand-all highlight-current-row @current-change="handleCurrentChange"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column prop="封面" label="封面" width="120">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px; height: 100px;border-style: solid;border-width: 1px;border-color: #99a9bf;"
                      :src="scope.row.Attachment.split('*')[0]" fit="scale-down"></el-image>
                  </template>
                </el-table-column>
                <el-table-column prop="Title" label="标题">
                  <template slot-scope="scope">
                     {{formatLen(scope.row.Title,130)}}
                  </template>
                </el-table-column>
                <el-table-column prop="Type" label="类型"  width="150"> </el-table-column>
                <el-table-column prop="Content" label="内容"> 
                  <template slot-scope="scope">
                    {{formatLen(scope.row.Content,130)}}
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="发布日期"  width="150"> 
                  <template slot-scope="scope">
                    {{formatDate(scope.row.createdAt)}}
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                  <template slot-scope="scope">
                    <el-button @click="deleteRow(scope.row)" type="text" size="medium">
                      <i class="el-icon-delete-solid">删除</i>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <el-select v-model="pageinfo.PageSize" placeholder="请选择" style="display:block;float:right ;margin-top:5px"
              size="mini" @change="ChangePageSize">
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
   
      </el-main>
    </el-container>
  </template>
  
  <script>
  export default {
    name: "Unit_Company",
    data() {
      return {
        pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
        pageSizeOption: [10, 15, 20, 50, 100],
        tableData: [],
        editerdialogVisible: false,
        editerdialogTitle: "编辑",
        module: { id: 0, Name: "", Memo: "", LinkMan: "", Phone: "", Logo: "", Address: "" },
        formLabelWidth: "120px",
        childModuleFID: 0,
        currentRow: {},
        add_Mode: "SameLevel",
        loading: true,
      };
    },
    mounted() {
      this.GetList(1);
    },
    methods: {
      formatDate: function (dt) {
            dt = dt + "";
            if (dt == "" || dt == "null") {
                return "";
            }
            var t = new Date(dt);
            if (t.getFullYear() + "" == "NaN") return "";
            return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + (t.getDate()) + " "+(t.getHours())+":"+t.getMinutes()+":"+t.getMinutes();
        },
      formatLen: function (str, len) {
                    if (str == null)
                        return "";
                    var len11 = str.length; //row 表示一行数据,
                    if (len11 > len) {
                        return str.substring(0, len) + "...";
                    }
                    else {
                        return str;
                    }
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
          url: "/api/resource?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
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
        this.module.Logo = "/api/files/" + data.data;
      },
      Add_Company() {
        this.editerdialogTitle = "添加企业";
        this.add_Mode = "SameLevel";
        this.clear_info();
        this.editerdialogVisible = true;
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
      doCheckAdd(){
      /// 检查要添加的学校是否已存在
      this.$axios({
        method: "GET",
        url: "/api/company?Name="+this.module.Name,
      })
      .then((response) => {
        if (response.data.err == 0 && response.data.data.count>0 ) {
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
                message: "添加失败，请重试"+response.data.err,
              });
            }
            this.editerdialogVisible = false;
          })
          .catch((error) => {
            this.$message({ type: "info", message: error });
          });
          
      },
  
      deleteRow(row) {
        this.$confirm("确定要删除该资源吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }).then(() => {
          this.deleteResourc(row);
        })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      deleteResourc(row) {
        this.loading = true;
        var qs = require("qs");
        this.$axios({
          method: "DELETE",
          url: "/api//resource/" + row.id,
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
  