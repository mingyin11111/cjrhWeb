<template>
  <el-container>
    <el-main>
      <div class="grid-content bg-purple-dark">
        <div style="display: inline; cursor: pointer">模块管理</div>
        <div style="display:inline;float:right;margin-top:-4px;padding-right:10px;padding-bottom:10px;cursor:pointer" >
          <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="AddModule">添加同级</el-button>
          <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="AddModule_Child">添加子级</el-button>
        </div>
      </div>
      <el-table
        :data="ModuleListData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="loadChildren"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :row-style="rowStyle"
        :cellStyle="cellStyle"
         highlight-current-row
         @current-change="handleCurrentChange" 
        v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="label" label="模块名称" width="220"></el-table-column>
         <el-table-column prop="url" label="路径"  ></el-table-column>
        <el-table-column prop="px" label="排序号" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="DelModule(scope.row)">
              <i class="el-icon-delete" size="medium"></i>
            </el-button>
            <el-button type="text" @click="ToEditModule(scope.row)">
              <i class="el-icon-edit" size="medium"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog :title="dialogTitle_ModuleAE" :visible.sync="dialog_ModuleAE_visible">
      <el-form :model="Row" ref="Row">
        <el-form-item label="模块名称" :label-width="dialog_LabelWidth" prop="Name"  :rules="[{ required: true, message: '模块名称不能为空'}] " >
          <el-input v-model="Row.Name" autocomplete="off"></el-input>
          <el-input v-model="Row.ID" autocomplete="off" style="display:none"></el-input>
        </el-form-item>
         <el-form-item label="模块路径" :label-width="dialog_LabelWidth" prop="Url"  :rules="[{ required: true, message: '模块路径不能为空'}] " >
          <el-input v-model="Row.Url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序号"  :label-width="dialog_LabelWidth" prop="PiaXu"  :rules="[{ required: true, message: '排序号不能为空'},{ type: 'number', message: '排序号必须为数字值'} ]" >
          <el-input type="LimitTime" v-model.number="Row.PiaXu" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" dialog_ModuleAE_visible  = false">取 消</el-button>
        <el-button type="primary" @click="DoAE">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "RoleManager",
  data() {
    return {
      loading:false,
      dialog_Delete_Confirm_visible: false,
      dialog_ModuleAE_visible: false,
      dialog_LabelWidth: "100px",
      Row: { ID: "", Name: "", PiaXu: 20, FacID: "" ,Url:"",Pic:""},
      CurrentRow: [],
      ModuleListData: [],
      dialogTitle_ModuleAE: "",
      select_options: [{ value: "0", label: "最顶级" }],
      select_selected: "0",
      add_Mode: "ChildLevel"
    };
  },
   mounted() {
    this.GetModuleList();
  },
  methods: {
    handleCurrentChange(val) {
       this.CurrentRow = val;
    },
    loadChildren(tree, treeNode, resolve) {
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/module/ModuleAction_getList.action",
        data: qs.stringify({
          parentid: tree.moduleid
        })
      })
        .then(res => {
          if (res.data == "Login ERR") {
            this.$message.error("登录失败，请重试！");
          } else {
            var _d = eval("(" + unescape(res.data) + ")");
            resolve(_d);
          }
        })
        .catch(error => {
          this.$message.error(error);
          console.log(error);
        });
    },

    DelModule(row) {
      this.$confirm("此操作将永久删除该模块, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var qs = require("qs");
          this.$axios({
            method: "post",
            url: "/api/WebInterface/System/Module/Module_Delete.ashx",
            data: qs.stringify({
              ModuleID: row.id
            })
          })
            .then(res => {
              if (res.data == "Fail") {
                this.$message.error("删除失败！请重试");
              } else if (res.data == "Success") {
                this.GetModuleList();
                this.$message({ message: "删除成功!", type: "success" });
              }
              else{
                 this.$message.error(res.data);
              }
            })
            .catch(error => {
              this.$message.error("在操作过程中出错：" + error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ToEditModule(row) {
      this.dialog_ModuleAE_visible = true;
      this.Row.ID =row.id;
      this.Row.Name=row.label;
      this.Row.PiaXu=parseInt(row.px);
      this.Row.Url=row.url;
    },
    GetModuleList() {
      this.loading=true;
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Module/GetModuleList.ashx",
        data: qs.stringify({
          parentid: ""
        })
      })
        .then(res => {
          this.loading=false;
          if (res.data == "Login ERR") {
            this.$message.error("登录失败，请重试！");
          } else {
            //this.ModuleListData =  res.data  ;
            this.ModuleListData = eval(res.data);
          }
        })
        .catch(error => {
          this.$message.error(error);
          console.log(error);
        });
    },
    AddModule() {
      this.ClearRow();
      this.dialogTitle_ModuleAE = "添加新模块";
      this.add_Mode = "SameLevel";
      this.dialog_ModuleAE_visible = true;
    },
    AddModule_Child()
    {
      this.ClearRow();
      this.dialogTitle_ModuleAE = "添加新模块";
      this.add_Mode = "ChildLevel";
      this.dialog_ModuleAE_visible = true;
    },
    DoAE() {
      var _this=this;
      this.$refs.Row.validate(valid => {
        if (valid) {
        } else {
          this.$message.error("必填项目没有填写完整！");
          return;
        }
        if (_this.Row.ID == "") {
          this.DoAddModule();
        } else {
          this.DoUpdateModule();
        }
      });
    },
    DoUpdateModule() {
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Module/Module_Update.ashx",
        data: qs.stringify({
          ID:this.Row.ID,
          Na: this.Row.Name,
          Ur:this.Row.Url,
          PaiXu: this.Row.PiaXu,
        })
      }).then(res => {
          if (res.data == "Fail") {
            this.$message.error("更新失败！请重试");
          } else {
            this.$message({ message: "更新完成!", type: "success" });
            this.GetModuleList();
            this.ClearRow();
            this.dialog_ModuleAE_visible = false;
          }
        }).catch(error => {
          this.$message.error("在操作过程中出错：" + error);
        });
    },
    DoAddModule() {
      var qs = require("qs");
      this.$axios({
        method: "post",
        url: "/api/WebInterface/System/Module/Module_Add.ashx",
        data: qs.stringify({
          Na: this.Row.Name,
          Ur:this.Row.Url,
          PaiXu: this.Row.PiaXu,
          FacID: this.Row.FacID,
          CWID: this.CurrentRow.id,
          AddMode:this.add_Mode,
        })
      })
        .then(res => {
          if (res.data == "Fail") {
            this.$message.error("添加失败！请重试");
          } else {
            this.$message({ message: "新模块添加成功!", type: "success" });
            this.GetModuleList();
            this.ClearRow();
            this.dialog_ModuleAE_visible = false;
          }
        })
        .catch(error => {
          this.$message.error("在操作过程中出错：" + error);
        });
    },
    ClearRow() {
       this.Row.ID='';
       this.Row.Name='';
       this.Row.PaiXu=20;
       this.Row.FacID='0'; 
       this.Row.Url="";
       this.Row.Pic="";
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
