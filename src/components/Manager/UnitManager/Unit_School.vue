<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div style="display: inline; cursor: pointer">学校&gt;</div>
            <div style="
                display: inline;
                float: right;
                margin-top: -4px;
                padding-right: 10px;
                padding-bottom: 10px;
                cursor: pointer;
              ">
              <el-button type="primary" size="mini" @click="Add_School">添加学校</el-button>

            </div>
          </div>
          <template>
            <el-table :data="pageinfo.PageData" style="width: 100%" row-key="id" :row-style="rowStyle"
              :cellStyle="cellStyle" border default-expand-all highlight-current-row
              @current-change="handleCurrentChange" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-table-column prop="Name" label="学校名称"> </el-table-column>
              <el-table-column prop="Memo" label="简介">
                <template slot-scope="scope">
                  {{ formatLen(scope.row.Memo, 150) }}
                </template>

              </el-table-column>
              <el-table-column prop="LinkMan" label="联系人" width="150"> </el-table-column>
              <el-table-column prop="Phote" label="联系电话" width="150"> </el-table-column>
              <el-table-column prop="Logo" label="Logo" width="120">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 100px;border-style: solid;border-width: 1px;border-color: #99a9bf;"
                    :src="scope.row.Logo" fit="scale-down"></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="State" label="状态" width="150"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="150" align="center">
                <template slot-scope="scope">
                  <el-button @click="Edit_School(scope.row)" type="text" size="medium">
                    <i class="el-icon-edit">编辑</i>
                  </el-button>
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

      <el-dialog :title="editerdialogTitle" :visible.sync="editerdialogVisible">
        <el-form :model="module">
          <el-form-item label="*学校名称" :label-width="formLabelWidth">
            <el-input v-model="module.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学校地址" :label-width="formLabelWidth">
            <el-input v-model="module.Address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input v-model="module.LinkMan" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" :label-width="formLabelWidth">
            <el-input v-model="module.Phote" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="7" placeholder="请输入简介" v-model="module.Memo"></el-input>
          </el-form-item>
          <el-form-item label="Logo" :label-width="formLabelWidth">
            <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="false"
              :on-success="UpLoadSuccess" :before-upload="beforeAvatarUpload" :headers="{ 'token': tokenValue }">
              <img v-if="module.Logo" :src="module.Logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"
                style=" border-style: solid;    border-color: #a69fe2;    border-width: 1px;"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editerdialogVisible = false">取 消</el-button>
          <el-button v-if="module.State === '待审核'" type="primary" @click="doShenHeTongGuo('审核通过')">审核通过</el-button>
          <el-button v-if="module.State === '待审核'" type="primary" @click="doShenHeTongGuo('审核不通过')">审核不通过</el-button>
          <el-button v-else type="primary" @click="doShenHeTongGuo('待审核')">取消审核</el-button>
          <el-button v-if="editerdialogTitle === '编辑'" type="primary" @click="doUpdate">确 定</el-button>
          <el-button v-if="editerdialogTitle != '编辑'" type="primary" @click="doCheckAdd">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Unit_School",
  data() {
    return {
      tokenValue: '',
      pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
      pageSizeOption: [10, 15, 20, 50, 100],
      tableData: [],
      editerdialogVisible: false,
      editerdialogTitle: "编辑",
      module: { id: 0, Name: "", Memo: "", LinkMan: "", Phote: "", Logo: "", Address: "" },
      formLabelWidth: "120px",
      childModuleFID: 0,
      currentRow: {},
      add_Mode: "SameLevel",
      loading: true,
    };
  },
  mounted() {
    this.tokenValue = localStorage.getItem('Token');
    this.GetList(1);
  },
  methods: {
    formatLen(str, len) {
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
    doShenHeTongGuo(state) {
      var _this = this;
      var qs = require("qs");
      this.$axios({
        method: "patch",
        url: "/api/school/" + this.module.id,
        data: qs.stringify({
          State: state
        }),
      })
        .then((response) => {
          if (response.data.data) {
            if(state=='审核通过')
            {
              this.ShenHeMember(this.module.id,'在职');
            }
            if(state=='审核不通过')
            {
              this.ShenHeMember(this.module.id,'审核不通过');
            }
            if(state=='待审核')
            {
              this.ShenHeMember(this.module.id,'待审核');
            }
            
          } else if (response.data == "ReLogin") {
            this.$message.error("你的登录已超时，请重新登录！！");
          } else {
            this.$message({
              type: "info",
              message: "审核失败，请重试",
            });
          }
          this.editerdialogVisible = false;
        })
        .catch(function (error) {
          _this.$message.error("出错了：" + error);
        });

    },
    ShenHeMember(id,state) {
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/systemMember?UserType=学校&RelationValue=" + id,
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            var list = res.data.data.rows;
            if (list.length == 0) {
              this.$message.error("审核完成，无用户需要审核");
              return;
            }
            this.$axios({
              method: "patch",
              url: "/api/systemMember/" + list[0].id,
              data: qs.stringify({
                State: state
              }),
            })
              .then((response) => {
                if (response.data.data) {
                  
                  this.$message({
                    type: "success",
                    message: "审核完成!",
                  });
                  this.GetList(this.pageinfo.CurrentPageNumber);
                } else if (response.data == "ReLogin") {
                  this.$message.error("你的登录已超时，请重新登录！！");
                } else {
                  this.$message({
                    type: "info",
                    message: "审核失败，请重试",
                  });
                }
                this.editerdialogVisible = false;
              })
              .catch(function (error) {
                _this.$message.error("出错了：" + error);
              });
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

    doUpdate() {
      var _this = this;
      var qs = require("qs");
      this.$axios({
        method: "patch",
        url: "/api/school/" + this.module.id,
        data: qs.stringify({
          Name: this.module.Name,
          IndexNumber: this.module.IndexNumber,
          Memo: this.module.Memo,
          LinkMan: this.module.LinkMan,
          Phote: this.module.Phote,
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
    Edit_School(row) {
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
        url: "/api/school?page=" + pageNumber + "&pageSize=" + this.pageinfo.PageSize,
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
      if (data.err > 0) {
        this.$message.error(data.errMsg);
      }
      else {
        this.module.Logo = "/api/files/" + data.data.split('*')[0];
      }
    },
    Add_School() {
      this.editerdialogTitle = "添加学校";
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
    doCheckAdd() {
      /// 检查要添加的学校是否已存在
      this.$axios({
        method: "GET",
        url: "/api/school?Name=" + this.module.Name,
      })
        .then((response) => {
          if (response.data.err == 0 && response.data.data.count > 0) {
            this.$message.error('该学校已存在，不能重复添加');
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
        url: "/api/school",
        data: qs.stringify({
          ID: this.currentRow.id,
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
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.GetList(1);
          } else {
            this.$message({
              type: "info",
              message: "添加失败，请重试",
            });
          }
          this.editerdialogVisible = false;
        })
        .catch((error) => {
          this.$message({ type: "info", message: error });
        });
    },

    deleteRow(row) {
      this.$confirm("删除该学校，该学校下的所有用户将被同步删除，确定要删除该学校吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        this.deleteSchool(row);
      })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteSchool(row) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "DELETE",
        url: "/api/school/" + row.id,
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
