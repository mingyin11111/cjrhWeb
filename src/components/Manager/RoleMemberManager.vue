<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div style="display: inline; cursor: pointer">人员配置-【{{currentRoleName}}】&gt;</div>
            <div
              style="
                display: inline;
                float: right;
                margin-top: -4px;
                padding-right: 10px;
                padding-bottom: 10px;
                cursor: pointer;
              "
            >
              <el-button type="primary" size="mini" @click="Add_Role"
                >添加同级</el-button
              >
              <el-button type="primary" size="mini" @click="Add_Child_Role"
                >添加子级</el-button
              >
            </div>
          </div>
          <template>
            <el-table
              :data="tableData"
              style="width: 100%"
              row-key="id"
              :row-style="rowStyle"
              :cellStyle="cellStyle"
              border
              default-expand-all
              highlight-current-row
              @current-change="handleCurrentChange"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            >
              <el-table-column prop="label" label="名称"> </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="350"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="Edit_Role(scope.row)"
                    type="text"
                    size="medium"
                  >
                    <i class="el-icon-user-solid">人员</i>
                  </el-button>
                  <el-button
                    @click="Edit_Role(scope.row)"
                    type="text"
                    size="medium"
                  >
                    <i class="el-icon-edit">编辑</i>
                  </el-button>
                  <el-button
                    @click="deleteRow(scope.row)"
                    type="text"
                    size="medium"
                  >
                    <i class="el-icon-delete-solid">删除</i>
                  </el-button>
                  <el-button
                    @click="Config(scope.row)"
                    type="text"
                    size="medium"
                  >
                    <i class="el-icon-s-tools">权限配置</i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-col>
      </el-row>

      <el-dialog :title="editerdialogTitle" :visible.sync="editerdialogVisible">
        <el-form :model="module">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="module.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序号" :label-width="formLabelWidth">
            <el-input
              v-model="module.IndexNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="module.Memo" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editerdialogVisible = false">取 消</el-button>
          <el-button
            v-if="editerdialogTitle === '编辑'"
            type="primary"
            @click="doUpdate"
            >确 定</el-button
          >
          <el-button
            v-if="editerdialogTitle != '编辑'"
            type="primary"
            @click="doAdd"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <ogranizechoose :visible="visible"></ogranizechoose>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "RoleManager",
  data() {
    return {
        visible:false,
      currentRoleID:0,
      currentRoleName:'',
      tableData: [],
      editerdialogVisible: false,
      editerdialogTitle: "编辑",
      module: { ID: 0, Name: "", IndexNumber: 0, FacID: 0, Memo: "" },
      formLabelWidth: "120px",
      childModuleFID: 0,
      currentRow: {},
      add_Mode: "SameLevel",
      loading: true,
    };
  },
   mounted() {
      this.currentRoleID = this.$route.params.RoleID;
      this.currentRoleName = this.$route.params.RoleName;
      
        this.GetList();
  },
  methods: {
    Config(row) {
      //RoleConfig.html
      this.$router.push("/Manager/RoleConfig/" + row.id);
    },
    Edit_Role(row) {
      this.$axios
        .get("/api/WebInterface/System/Role/Role_Info.ashx", {
          params: {
            ID: row.id,
          },
        })
        .then((response) => {
          if (response.data == "ReLogin") {
            this.$message.error("你的登录已超时，请重新登录！！");
          } else {
            var ob = response.data;
            this.module = ob;
            this.editerdialogTitle = "编辑";
            this.editerdialogVisible = true;
          }
        })
        .catch((error) => {
          this.$message({
            type: "info",
            message: error,
          });
        });
    },
    Add_Role() {
      this.visible=true;
    },
    Add_Child_Role() {
      this.editerdialogTitle = "添加子级角色";
      this.add_Mode = "ChildLevel";
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
    doAdd() {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_Add.ashx",
        data: qs.stringify({
          ID: this.currentRow.id,
          Name: this.module.Name,
          IndexNumber: this.module.IndexNumber,
          FacID: this.module.FacID,
          Memo: this.module.Memo,
          AddMode: this.add_Mode,
        }),
      })
        .then((response) => {
          if (response.data == "Success") {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.GetList();
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
    GetList() {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_List.ashx",
        data: qs.stringify({}),
      })
        .then((res) => {
          this.tableData = eval(res.data);
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error("登录中出错！");
          console.log(error);
          this.loading = false;
        });
      ///////////////////////////////////////////////////////////////
    },
    deleteRow(row) {
      let _this = this;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_Delete_Check.ashx",
        data: qs.stringify({
          ID: row.id,
        }),
      })
        .then((response) => {
          if (response.data == "Success") {
            this.$confirm("此操作将永久删除角色, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              center: true,
            })
              .then(() => {
                this.deleteRole(row);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除",
                });
              });
          } else {
            this.$message({
              type: "info",
              message: "删除失败：" + response.data,
            });
          }
          this.editerdialogVisible = false;
        })
        .catch((error) => {
          _this.$message.error("出错了：" + error);
        });
    },
    deleteRole(row) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_Delete.ashx",
        data: qs.stringify({
          ID: row.id,
        }),
      })
        .then((response) => {
          if (response.data == "Success") {
            this.$message({ type: "success", message: "删除成功!" });
            this.GetList();
          } else {
            this.$message({
              type: "info",
              message: "删除失败：" + response.data,
            });
          }
        })
        .catch((error) => {
          this.$message.error("登录中出错！");
          console.log(error);
          this.loading = false;
        });
    },
    Edit_QuestionType(index, rows) {
      this.module.ID = rows[index].ID;
      this.module.TypeName = rows[index].TypeName;
      this.editerdialogTitle = "编辑";
      this.editerdialogVisible = true;
    },
    Add_QuestionType() {
      this.module.ID = "";
      this.module.TypeName = "";
      this.editerdialogTitle = "添加";
      this.editerdialogVisible = true;
    },
    doUpdate() {
      var _this = this;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_Update.ashx",
        data: qs.stringify({
          ID: this.currentRow.id,
          Name: this.module.Name,
          IndexNumber: this.module.IndexNumber,
          Memo: this.module.Memo,
        }),
      })
        .then((response) => {
          if (response.data == "Success") {
            this.$message({
              type: "success",
              message: "更新成功!",
            });
            this.GetList();
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
</style>
