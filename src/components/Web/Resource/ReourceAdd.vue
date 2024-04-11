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
                <el-button type="primary" size="mini" @click="Add_Company">添加</el-button>
  
              </div>
            </div>

            <div style="border: 1px solid #ccc;">
              <div id="editor"></div>

            </div>

            <template>
                <el-form :model="module">
            <el-form-item label="*企业名称" :label-width="formLabelWidth">
              <el-input v-model="module.Name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业地址" :label-width="formLabelWidth">
              <el-input v-model="module.Address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth">
              <el-input v-model="module.LinkMan" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" :label-width="formLabelWidth">
              <el-input v-model="module.Phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="简介" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="3" placeholder="请输入简介" v-model="module.Memo"></el-input>
            </el-form-item>
            <el-form-item label="Logo" :label-width="formLabelWidth">
              <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="false"
                :on-success="UpLoadSuccess"  >
                <img v-if="module.Logo" :src="module.Logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"
                  style=" border-style: solid;    border-color: #a69fe2;    border-width: 1px;"></i>
              </el-upload>
            </el-form-item>
          </el-form>
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
  
        <el-dialog :title="editerdialogTitle" :visible.sync="editerdialogVisible">
          <el-form :model="module">
            <el-form-item label="*企业名称" :label-width="formLabelWidth">
              <el-input v-model="module.Name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业地址" :label-width="formLabelWidth">
              <el-input v-model="module.Address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth">
              <el-input v-model="module.LinkMan" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" :label-width="formLabelWidth">
              <el-input v-model="module.Phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="简介" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="3" placeholder="请输入简介" v-model="module.Memo"></el-input>
            </el-form-item>
            <el-form-item label="Logo" :label-width="formLabelWidth">
              <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="false"
                :on-success="UpLoadSuccess"  >
                <img v-if="module.Logo" :src="module.Logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"
                  style=" border-style: solid;    border-color: #a69fe2;    border-width: 1px;"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editerdialogVisible = false">取 消</el-button>
            <el-button v-if="editerdialogTitle === '编辑'" type="primary" @click="doUpdate">确 定</el-button>
            <el-button v-if="editerdialogTitle != '编辑'" type="primary" @click="doCheckAdd">确 定</el-button>
          </div>
        </el-dialog>
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
      ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => {
            console.error( error );
        } );
    },
    methods: {
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
        this.module.Logo = "/api/files/" + data.data;
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
  