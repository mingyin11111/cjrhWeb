<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <div style="display: inline; cursor: pointer">权限设定&gt;</div>
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
              <el-button type="primary" size="mini" @click="SaveConfig"
                >保存</el-button
              >
            </div>
          </div>
          <template>
            <el-tree
              :data="tableData"
              show-checkbox
              default-expand-all
              :default-checked-keys="defaultcheckedkeys"
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
            >
            </el-tree>
          </template>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "RoleManager",
  data() {
    return {
      currentRoleID: 0,
      tableData: [],
      defaultcheckedkeys: [1, 6, 7],
      editerdialogVisible: false,
      editerdialogTitle: "编辑",
      module: { ID: 0, Name: "", IndexNumber: 0, FacID: 0, Memo: "" },
      formLabelWidth: "120px",
      childModuleFID: 0,
      currentRow: {},
      add_Mode: "SameLevel",
      loading: true,
      defaultProps: {
        id: "id",
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    this.currentRoleID = this.$route.params.RoleID;
    this.GetTreeData(this.currentRoleID);
  },
  methods: {
    GetTreeData(RoleID) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_Config_Data.ashx",
        data: qs.stringify({
          RoleID: RoleID,
        }),
      })
        .then((res) => {
          var obj = eval(res.data);
          this.defaultcheckedkeys = obj.choose;
          this.tableData = obj.tree;
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.defaultcheckedkeys);
          });
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error(error);
          console.log(error);
          this.loading = false;
        });
    },
    GetList() {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Module/GetModuleList.ashx",
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
    },
    SaveConfig() {
      var MIDS = this.$refs.tree.getCheckedKeys();
      var HalfID=this.$refs.tree.getHalfCheckedKeys();
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Role/Role_Config_Save.ashx",
        data: qs.stringify({
          RID: this.currentRoleID,
          MID: MIDS.join(","),
          HID:HalfID.join(",")
        }),
      })
        .then((response) => {
          if (response.data == "Success") {
            this.$message({ message: '保存成功',type: 'success'});
          } else {
            this.$message.error(response.data);
          }
        })
        .catch((error) => {
          this.$message({
            type: "info",
            message: error,
          });
        });
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
