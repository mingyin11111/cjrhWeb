<template>
  <el-container>
    <el-main>
 
      <div  class="hot_services wow animate__animated animate__zoomIn">
        <span
          style=" font-size: 38px;font-weight: bold;text-align: center;display: inline-block; width: 100%;padding: 10px;">
          热门服务
        </span>
        <el-row :gutter="10" justify="space-between" style="text-align: center;padding-bottom: 10px;">
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn">
              <div class="zi zi1" style="cursor: pointer;" @click="LinkTo('课程开发')"> </div>
              <h3 style="cursor: pointer;" @click="LinkTo('课程开发')">课程开发</h3>
           </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn">
            <div class="zi zi2" style="cursor: pointer;" @click="LinkTo('虚拟仿真')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('虚拟仿真')"> 虚拟仿真</h3>
          </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn"> 
            <div class="zi  zi3" style="cursor: pointer;" @click="LinkTo('微课制作')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('微课制作')"> 微课制作</h3>
          </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn"> 
            <div class="zi  zi4" style="cursor: pointer;" @click="LinkTo('教师教学能力大赛')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('教师教学能力大赛')">教学能力</h3>
          </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn">
            <div class="zi zi5" style="cursor: pointer;" @click="LinkTo('实训室建设')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('实训室建设')">实训室建设</h3>
          </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn">
            <div class="zi zi6" style="cursor: pointer;" @click="LinkTo('智能硬件')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('智能硬件')">智能硬件</h3>
          </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn">
            <div class="zi zi7" style="cursor: pointer;" @click="LinkTo('其他')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('其他')">ppt制作</h3>
          </el-card>
          </el-col>
          <el-col :span="3">
            <el-card shadow="hover" class="showfindIn">
            <div class="zi zi8" style="cursor: pointer;" @click="LinkTo('其他')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('其他')">视频制作</h3>
          </el-card>
          </el-col>
        </el-row>
      </div>
      <div style="height: 10px;"></div>
      <div style="background-color: #8cc5ff;" class="wow animate__animated animate__zoomIn">
        <span
          style=" font-size: 38px;font-weight: bold;text-align: center;display: inline-block; width: 100%;padding: 10px;">
          热门任务推荐
        </span>
        <el-row :gutter="10" justify="space-between" style="margin: 0px;padding: 0px;">
          <el-col :span="8" class="elcol-l">
            <div style="font-size: 20px;font-weight: bold;">课程开发</div>
            <ul>
              <li v-for="item4 in List_KeChengKaiFa" :key="item4.id"><el-link :underline="false"  @click="ToIneedDetail(item4)"  >{{item4.Title}}</el-link></li>
            </ul>
          </el-col>
          <el-col :span="8" class="elcol-l">
            <div style="font-size: 20px;font-weight: bold;">虚拟仿真</div>
            <ul>
              <li v-for="item5 in List_XuNiFangZhen" :key="item5.id"><el-link :underline="false"  @click="ToIneedDetail(item5)"  >{{item5.Title}}</el-link></li>
            </ul>
          </el-col>
          <el-col :span="8" class="elcol-l">
            <div style="font-size: 20px;font-weight: bold;">微课制作</div>
            <ul>
              <li v-for="item6 in List_WeiKeZhiZuo" :key="item6.id">
                <el-link :underline="false"  @click="ToIneedDetail(item6)"  >{{item6.Title}}</el-link> </li>
            </ul>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="space-between">
          <el-col :span="8" class="elcol-l">
            <div style="font-size: 20px;font-weight: bold;">教师教学能力大赛</div>
            <ul>
              <li v-for="item7 in List_JiaoXueNengLi" :key="item7.id">
                <el-link :underline="false"  @click="ToIneedDetail(item7)"  >{{item7.Title}}</el-link>
               </li>
            </ul>
          </el-col>
          <el-col :span="8" class="elcol-l">
            <div style="font-size: 20px;font-weight: bold;">实训室建设</div>
            <ul>
              <li v-for="item8 in List_ShiXunShiJianShe" :key="item8.id">
                <el-link :underline="false"  @click="ToIneedDetail(item8)"  >{{item8.Title}}</el-link>
                </li>
            </ul>
          </el-col>
          <el-col :span="8" class="elcol-l">
            <div style="font-size: 20px;font-weight: bold;">其它类型</div>
            <ul>
              <li v-for="item9 in List_PPTZhiZuo" :key="item9.id">
                <el-link :underline="false"  @click="ToIneedDetail(item9)"  >{{item9.Title}}</el-link>
                </li>
            </ul>
          </el-col>
        </el-row>
 
        

                  
      </div>
     
      <div class="wow animate__animated animate__zoomIn" >
        <span
          style=" font-size: 38px;font-weight: bold;text-align: center;display: inline-block; width: 100%;padding: 10px;">
          优质服务商
        </span>
        <el-row :gutter="10" justify="space-between">

          <el-col :span="6" class="elcol-l2" v-for="item in SchoolList" :key="item.id" style="text-align: center;"> 
            <el-card shadow="always" style="margin-bottom: 10px;" class="showfindIn">
              <p style="text-align: left;cursor:pointer;" @click="ToInformationDetail_School(item)">
                <img :src="item.Logo"
                  style="position: absolute; margin-top: 13px; height: 25px;width: 25px;border: 1px solid #99a9bf;border-radius: 50%;display: inline-block;align-content: center;  vertical-align: middle;">
                  <span   style="display: flex;  align-items: center;   justify-content: left;   height: 50px; width: 80%;margin-left: 35px; ">{{ item.Name }}</span>
              </p>
              <p style="color: #8c6266; text-align: left;  padding-left: 33px;">
                 联系人:{{ item.LinkMan }}
              </p>
              <p style="color: #8c6266;text-align: left;  padding-left: 33px;">电话：{{ item.Phote }}</p>
            </el-card>
            
          </el-col>

        </el-row>
      </div>

      
    </el-main>
  </el-container>
</template>

<script>
import VueRouter from 'vue-router';
import {WOW} from 'wowjs'  
export default {
  name: "Index",
  data() {
    return {
      loading: true,
    
      imgQRCode: '',
      SchoolList: [],
      List_KeChengKaiFa:[],
      List_XuNiFangZhen:[],
      List_WeiKeZhiZuo:[],
      List_JiaoXueNengLi:[],
      List_ShiXunShiJianShe:[],
      List_ZhiNengYingJian:[],
      List_PPTZhiZuo:[],
      List_ShiPinZhiZuo:[],
    };
  },
  created() {
    let urlTemp = "components/img/bg.jpg";
    this.imgUrl = require("@/" + urlTemp);
    this.imgUrl2 = require("@/components/img/bg2.jpg");
   
    this.imgQRCode = require("@/" + "assets/qrcocedemo.png");
  },
  mounted() {
     
    this.GetSchoolList();
    this.GetList_KeChengKaiFa();
    this.GetList_XuNiFangZhen();
    this.GetList_WeiKeZhiZuo();
    this.GetList_JiaoXueNengLi();
    this.GetList_ShiXunShiJianShe();
    this.GetList_PPTZhiZuo();
    this.$nextTick(() => {
      // 在dom渲染完后,再执行动画
      const wow = new WOW({
        live: false
      }).init()
     
    })
    
  },
  methods: {
    GetList_PPTZhiZuo( ) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/need?page=1&pageSize=5&StepNumber=1&Type=其他",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            this.List_PPTZhiZuo = res.data.data.rows;
            this.loading = false;
          }
          else {
            this.$message.error("错误：" + res.data.err);
          }
        })
        .catch((error) => {
          this.$message.error("出错！" + error);
          console.log(error);
          this.loading = false;
        });
    },
    GetList_ShiXunShiJianShe( ) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/need?page=1&pageSize=5&StepNumber=1&Type=实训室建设",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            this.List_ShiXunShiJianShe = res.data.data.rows;
            this.loading = false;
          }
          else {
            this.$message.error("错误：" + res.data.err);
          }
        })
        .catch((error) => {
          this.$message.error("出错！" + error);
          console.log(error);
          this.loading = false;
        });
    },
    GetList_JiaoXueNengLi( ) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/need?page=1&pageSize=5&StepNumber=1&Type=教师教学能力大赛",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            this.List_JiaoXueNengLi = res.data.data.rows;
            this.loading = false;
          }
          else {
            this.$message.error("错误：" + res.data.err);
          }
        })
        .catch((error) => {
          this.$message.error("出错！" + error);
          console.log(error);
          this.loading = false;
        });
    },
    GetList_WeiKeZhiZuo( ) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/need?page=1&pageSize=5&StepNumber=1&Type=微课制作",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            this.List_WeiKeZhiZuo = res.data.data.rows;
            this.loading = false;
          }
          else {
            this.$message.error("错误：" + res.data.err);
          }
        })
        .catch((error) => {
          this.$message.error("出错！" + error);
          console.log(error);
          this.loading = false;
        });
    },
    GetList_XuNiFangZhen( ) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/need?page=1&pageSize=5&StepNumber=1&Type=虚拟仿真",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            this.List_XuNiFangZhen = res.data.data.rows;
            this.loading = false;
          }
          else {
            this.$message.error("错误：" + res.data.err);
          }
        })
        .catch((error) => {
          this.$message.error("出错！" + error);
          console.log(error);
          this.loading = false;
        });
    },
    GetList_KeChengKaiFa( ) {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/need?page=1&pageSize=5&StepNumber=1&Type=课程开发",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            this.List_KeChengKaiFa = res.data.data.rows;
            this.loading = false;
          }
          else {
            this.$message.error("错误：" + res.data.err);
          }
        })
        .catch((error) => {
          this.$message.error("出错！" + error);
          console.log(error);
          this.loading = false;
        });
    },
    subStr(str, len) {
      if (str.length <= len) {
        return str;
      }
      else {
        return str.substring(0, len) + '...';
      }
    },
    ToLogin() {
      this.$router.push({ path: '/Web/Login' });
    },
    LinkTo(str) {
      this.$router.push({ path: '/Web/Need/NeedList', query: { type: str } })
    },
    ToInformationDetail_School(item) {
      this.$router.push({ path: '/Web/InformationPublish/InformationDetail_School', query: { id: item.id } })
    },
    ToIneedDetail(item) {
      this.$router.push({ path: '/Web/Need/NeedSubmit', query: { id: item.id } })
    },
    GetSchoolList() {
      this.loading = true;
      var qs = require("qs");
      this.$axios({
        method: "get",
        url: "/api/school?page=1&pageSize=12",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          if (res.data.err == 0) {
            this.SchoolList = res.data.data.rows;
            this.loading = false;
          }
          else {
            this.$message.error("错误：" + res.data.err);
          }
        })
        .catch((error) => {
          this.$message.error("出错！" + error);
          console.log(error);
          this.loading = false;
        });
    }
  },
  components: { VueRouter }
};
</script>
<style scoped>
.hot_services {
  background-image: url('../img/thumb-bg.png');
}
.showfindIn
{
}
.showfindIn:hover
{
  animation: fadeIn 0.5s ease-in-out forwards; /* 悬停时启动动画 */
}
.showfindIn:not(:hover) {
  animation: fadeOut 0.5s ease-in-out forwards; /* 悬停时启动动画 */
}
@keyframes fadeIn {
       from {
            
       }

       to {
           opacity: 1;
           background-color: #79bbff;
       }
   }
@keyframes fadeOut {
       from {
        opacity: 1;
        background-color: #79bbff;
       }

       to {
          
       }
   }




.el-popover ul {
  list-style: none;
  padding: 5px;
}

.el-popover ul li {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(122, 118, 118);
  padding-top: 10px;
  padding-bottom: 5px;
  cursor: pointer;
}

.div11 {
  float: left;
  font-weight: bold;
  margin-left: 10px;
}

divr {
  float: right;
  margin-right: 5px;
}

.circle {
  float: right;

  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #B3C0D1;
  color: #B3C0D1;
  text-align: center;
  line-height: 20px;
}

.circle::before {
  content: ">";

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

ul {
  margin-left: -30px;
  margin-top: 5px;

}

li {
  /*过长省略*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 35px;
  width: 300px;
}

.red-dot {
  /*红点*/
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: red;
  vertical-align: middle;
  margin-left: 10px;
}

.yellow-dot {
  /*黄点*/
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fffa02;
  vertical-align: middle;
}

.blue-dot {
  /*黄点*/
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #B3C0D1;
  vertical-align: middle;
}

h2 {
  line-height: 35px;
  font-size: 35px;
  text-align: center;

}

h3 {
  line-height: 35px;
}

h4 {
  display: inline-block;
  margin-left: 5px;
}

h5 {
  margin-left: 5px;
  height: 10px;
}

.cs .cs1 {
  width: 80%;
}

p {
  margin: 5px;
}

.remen {
  margin-top: 0px;
  border: 1px solid #99a9bf;
  border-radius: 10px;
  width: 90%;
  display: inline-block;
  /*转内联*/
}

.remen1 {
  margin-top: 10px;
  border: 1px solid #99a9bf;
  border-radius: 10px;
  width: 90%;
  height: 160px;
  display: inline-block;
  /*转内联*/
}

.remen2 {
  margin-top: 10px;
  border: 1px solid #99a9bf;
  border-radius: 10px;
  width: 90%;
  height: 280px;
  display: inline-block;
  /*转内联*/
}

.remen3 {
  margin-top: 10px;
  padding-right: 10px;
  border: 1px solid #99a9bf;
  border-radius: 10px;
  width: 90%;
  height: 300px;
  display: inline-block;
  /*转内联*/
}

.huanghang {
  border: 1px solid #99a9bf;
  width: 1200px;
  height: 40px;
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  text-align: justify;
  float: left;
}

.jz {
  color: #333;
  text-align: center;
  margin-top: 15px;
}

.jz1 {
  color: #333;
  text-align: center;
  margin-top: 10px;
}

.butt {
  color: #333;
  text-align: center;
  height: 20px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;

}

.elcol-l {
  text-align: left;
  padding: 10px 0px 0px 0px;

}

.elcol-2 {
  text-align: center;
  padding: 10px 0px 0px 0px;
}

.cs {
  background-image: url('../img/bg.jpg');
  height: 200px;
  margin-top: 8px;
  width: 100%;
  background-size: 100% 180px;
  background-repeat: no-repeat;
  padding: 120px 20px 10px 20px;
  display: inline-block;
  align-content: center;
}

.i1 {

  height: 100px;
  margin-top: 8px;
  width: 100%;
  border: 1px;
  border-radius: 5px;
  display: inline-block;
  align-content: center;
}

.logo {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 25px;

  width: 25px;
  border: 1px solid #99a9bf;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
  background-image: url('../img/logo.png');
  vertical-align: middle;
  /*内联垂直居中*/
}

.zi {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 60px;
  margin-top: 8px;
  width: 60px;
  border: 1px solid #99a9bf;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
}

.zi1 {
  background-image: url('../img/class.png');
}

.zi2 {
  background-image: url('../img/vr.png');
}

.zi3 {
  background-image: url('../img/micro.png');
}

.zi4 {
  background-image: url('../img/teach.png');
}

.zi5 {
  background-image: url('../img/laboratory.png');
}

.zi6 {
  background-image: url('../img/intelligence.png');
}

.zi7 {
  background-image: url('../img/PPT.png');
}

.zi8 {
  background-image: url('../img/vod.png');
}

.gongsi {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 150px;
  margin-top: 8px;
  width: 260px;
  border: 1px solid #99a9bf;
  border-radius: 5px;
  align-content: center;
  background-color: blueviolet;
  display: inline-block;
  /*转内联*/
}

.gongsi1 {
  background-image: url('../img/ds.png');
}

.cs11 {
  margin-top: 120px;
}

.el-header {
  background-color: #E9EEF3;
  width: 100%;
}



.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-row {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;

}
</style>