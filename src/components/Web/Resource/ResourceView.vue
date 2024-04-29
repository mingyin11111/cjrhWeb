<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div style="height: 80px;"></div>
          <el-card class="box-card" v-loading="loading">

            <div style="text-align: center; padding: 10px;font-size: 18px;font-weight: bold;">
              {{ module.Title }}
            </div>
            <div style="text-align: center;  padding: 10px;">
              发布日期：{{ formatDate(module.createdAt) }}
            </div>
            <div>
              {{ module.Content }}
            </div>
          </el-card>
          <div style="height: 10px;"></div>
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
      module: { id: 0, Title: "", Type: "", Content: "", Attachment: "", MemberID: 0 },
      loading: true,
      pageinfo: { PageSize: 10, CurrentPageNumber: 1, RecordCount: 0, PageData: [] },
    };
  },
  mounted() {
    this.module.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api//resource?id=" + this.module.id,
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            if (res.data.data.rows.length > 0) {
              this.module = res.data.data.rows[0];
              this.pageinfo.RecordCount = res.data.data.count;
              this.loading = false;
            }
            else {
              this.$message.error("错误：未取得数据，或资源不存在");
            }

          }
          else {
            this.$message.error("错误：" + res.data.err);
            this.loading = false;
          }

        })
        .catch((error) => {
          this.$message.error("登录中出错！");
          console.log(error);
          this.loading = false;
        });
    }
    ,
    formatDate: function (dt) {
      dt = dt + "";
      if (dt == "" || dt == "null") {
        return "";
      }
      var t = new Date(dt);
      if (t.getFullYear() + "" == "NaN") return "";
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + (t.getDate()) + " " + (t.getHours()) + ":" + t.getMinutes() + ":" + t.getMinutes();
    },

  }
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