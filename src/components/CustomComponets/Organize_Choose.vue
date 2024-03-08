<template>
  <el-dialog
    title="选择"
    :visible.sync="visible"
    width="900px"
    @close="closeMe()"
    @opened="opendialog()"
  >
    <el-container style="height:400px">
      <el-aside width="30%">
        <el-tree
          :data="TreeData"
          :props="defaultProps"
          @node-click="TreeNodeClick"
          default-expand-all
          :render-content="Tree_renderContent"
        ></el-tree>
      </el-aside>
      <el-main>
        <el-transfer v-model="value" :data="data" style="display:inline;width:300px" width="300px"></el-transfer>
      </el-main>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeMe(false)">取 消</el-button>
      <el-button type="primary" @click="closeMe(false)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      TreeData: [],
      data: [],
      value: [1, 4]
    };
  },
  methods: {
    opendialog() {
      this.changeWidth();
    },
    closeMe(v) {
      this.$emit("closeEvent", false);
    },
    GetTreeData() {
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/org/OrganizeAction_GetOrgTree.action",
        data: qs.stringify({
          ROLENAME: "a"
        })
      })
        .then(res => {
          if (res.data == "Fail") {
            this.$message.error("组织机构数据获取失败！");
          } else {
            this.TreeData = eval("(" + unescape(res.data) + ")");
          }
        })
        .catch(error => {
          this.$message.error("在操作过程中出错：" + error);
        });
    },
    TreeNodeClick(c) {
      this.TreeNode_Current = c;
      this.GetChildNodes(c.id);
    },
    Tree_renderContent(h, { node, data, store }) {
      return <i class={data.type}> &nbsp;{data.label}</i>;
    },
    changeWidth() {
      let element = document.querySelector(".el-transfer__buttons");

      element.style.padding = "5px";
      element.style.width = "75px";
//el-transfer-panel
let element_transfer_panel = document.querySelectorAll(".el-transfer-panel");
element_transfer_panel[0].style.height = "100%";
element_transfer_panel[1].style.height = "100%";


      let element_button = document.querySelector("button:nth-child(2) ");
       element_button.style.margin = "5px";
    }
  },
  mounted() {
    this.GetTreeData();
  },

  props: [ "visible"]
};
</script>
<style scoped>
.el-transfer__button {
  margin-left: 10px !important;
}
.el-transfer__buttons {
  padding: 2px;
  width: 75px;
}
.el-transfer__button:first-child {
  margin-bottom: 50px !important;
}
</style>
<style >
</style>
 