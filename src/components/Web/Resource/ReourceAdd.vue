<template>
  <el-container>
    <el-main v-loading="loading">
      <el-row>
        <el-col :span="24">
           

          <el-card class="box-card">


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
            <div style="height: 10px;"></div>

            <template>
              <el-form :model="module" :rules="rules" ref="module">
                <el-form-item label="标题" prop="Title" :label-width="formLabelWidth">
                  <el-input v-model="module.Title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="Type" :label-width="formLabelWidth">
                  <el-select v-model="module.Type" placeholder="请选择">
                    <el-option key="行业动态" label="行业动态" value="行业动态"> </el-option>
                    <el-option key="政策法规" label="政策法规" value="政策法规"> </el-option>
                    <el-option key="调研报告" label="调研报告" value="调研报告"> </el-option>
                    <el-option key="科技前瞻" label="科技前瞻" value="科技前瞻"> </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="内容" prop="Content" :label-width="formLabelWidth">
                  <el-input type="textarea" :rows="13" placeholder="请输入简介" v-model="module.Content"></el-input>
                </el-form-item>
                <el-form-item label="封面图" :label-width="formLabelWidth">
                  <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="false"
                    :on-success="UpLoadSuccess" :headers="{ 'token': tokenValue }">
                    <img v-if="module.Attachment" :src="module.Attachment.split('*')[0]" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"
                      style=" border-style: solid;    border-color: #a69fe2;    border-width: 1px;"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </template>
            <span style="display: inline-block; width: 100%; text-align: center;"><el-button type="danger"
                @click="CheckResourceAdd('module')" style="width: 40%;">发布</el-button></span>
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
      tokenValue: '',
      pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
      pageSizeOption: [10, 15, 20, 50, 100],
      tableData: [],
      editerdialogVisible: false,
      editerdialogTitle: "编辑",
      module: { id: 0, Title: "", Type: "", Content: "", Attachment: "", MemberID: 0 },
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
    //this.GetList(1);
    this.tokenValue = localStorage.getItem('Token');
  },
  methods: {

    CheckResourceAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.doAdd();
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
        url: "/api/resource",
        data: qs.stringify({
          Title: this.module.Title,
          Type: this.module.Type,
          Content: this.module.Content,
          Attachment: this.module.Attachment,
          MemberID: this.$store.state.MemberID,
        }),
      })
        .then((response) => {
          if (response.data.err == 0) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });

          } else {

            this.$message({
              type: "info",
              message: "添加失败，请重试" + response.data.err+response.data.errMsg,
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