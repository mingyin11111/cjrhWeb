<template>
  <el-container>
    <el-main>
       
      <el-image :src="imgUrl" style="width: 100%;height: 200px;margin-bottom: 10px;" ></el-image>
      <div class="remen">
        <h2>热门服务</h2>
        <el-row :gutter="10" justify="space-between">
          <el-col :span="3">
            <div class="zi zi1" style="cursor: pointer;" @click="LinkTo('课程开发')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('课程开发')">课程开发</h3>
          </el-col>
          <el-col :span="3">
            <div class="zi zi2" style="cursor: pointer;" @click="LinkTo('虚拟仿真')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('虚拟仿真')"> 虚拟仿真</h3>
          </el-col>
          <el-col :span="3">
            <div class="zi  zi3" style="cursor: pointer;" @click="LinkTo('微课制作')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('微课制作')"> 微课制作</h3>
          </el-col>
          <el-col :span="3">
            <div class="zi  zi4" style="cursor: pointer;" @click="LinkTo('教师教学能力大赛')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('教师教学能力大赛')">教学能力</h3>
          </el-col>
          <el-col :span="3">
            <div class="zi zi5" style="cursor: pointer;" @click="LinkTo('实训室建设')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('实训室建设')">实训室建设</h3>
          </el-col>
          <el-col :span="3">
            <div class="zi zi6" style="cursor: pointer;" @click="LinkTo('智能硬件')"> </div> 
            <h3 style="cursor: pointer;" @click="LinkTo('智能硬件')">智能硬件</h3>
          </el-col>
          <el-col :span="3">
            <div class="zi zi7" style="cursor: pointer;" @click="LinkTo('其它')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('其它')">ppt制作</h3>
          </el-col>
          <el-col :span="3">
            <div class="zi zi8" style="cursor: pointer;" @click="LinkTo('其它')"> </div>
            <h3 style="cursor: pointer;" @click="LinkTo('其它')">视频制作</h3>
          </el-col>
        </el-row>
      </div>
      <div class="remen1">
        <el-row :gutter="10" justify="space-between">

          <el-col :span="8" class="elcol-l">
            <span class="red-dot"></span>订单中心
            <ul>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
            </ul>

          </el-col>
          <el-col :span="8" class="elcol-l">
            <span class="yellow-dot"></span>优质案例
            <ul>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
            </ul>
          </el-col>
          <el-col :span="8" class="elcol-l">
            <span class="blue-dot"></span>平台公告
            <ul>

              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>


            </ul>
          </el-col>
        </el-row>


      </div>
      <h2>优质服务商</h2>
      <div class="remen2">
        <el-row :gutter="10" justify="space-between">
          <el-col :span="6" class="elcol-l2" v-for="item in SchoolList" key="item">
            <p style="text-align: left;">
              <img :src="item.Logo" style=" height: 25px;width: 25px;border: 1px solid #99a9bf;border-radius: 50%;display: inline-block;align-content: center;  vertical-align: middle;">
              {{item.Name}}
            </p>
            <img :src="item.Logo" style=" height: 150px;  margin-top: 8px;  width: 260px;  border: 1px solid #99a9bf;  border-radius: 5px;  align-content: center;  background-color: blueviolet;  display: inline-block;">
            <p>{{subStr(item.Memo,12)}}</p>
            <p>
              <i class="el-icon-user-solid"></i>{{item.LinkMan}}
            </p>
            <p><i class="el-icon-phone"></i>{{item.Phote}}</p>
          </el-col>
           
        </el-row>
      </div>

      <h2>热门任务推荐</h2>
      <div class="remen3">

        <el-row :gutter="10" justify="space-between">

          <el-col :span="8" class="elcol-l">
            <div class="div11">课程开发</div>
            <div class="circle circle::before divr"></div>
            <ul>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
            </ul>

          </el-col>
          <el-col :span="8" class="elcol-l">
            <div class="div11">虚拟仿真</div>
            <div class="circle circle::before divr"></div>

            <ul>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
            </ul>
          </el-col>
          <el-col :span="8" class="elcol-l">
            <div class="div11">微课制作</div>
            <div class="circle circle::before divr"></div>

            <ul>

              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>


            </ul>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="space-between">

          <el-col :span="8" class="elcol-l">
            <div class="div11">课程开发</div>
            <div class="circle circle::before divr"></div>
            <ul>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
            </ul>

          </el-col>
          <el-col :span="8" class="elcol-l">
            <div class="div11">虚拟仿真</div>
            <div class="circle circle::before divr"></div>

            <ul>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
            </ul>
          </el-col>
          <el-col :span="8" class="elcol-l">
            <div class="div11">微课制作</div>
            <div class="circle circle::before divr"></div>

            <ul>

              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>
              <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后 </li>


            </ul>
          </el-col>
        </el-row>






      </div>
    </el-main>
  </el-container>
</template>

<script>
import VueRouter from 'vue-router';

export default {
  name: "Index",
  data() {
    return {
      loading: true,
      imgUrl: '',
      imgQRCode: '',
      SchoolList:[],
    };
  },
  created() {
    let urlTemp = "components/img/bg.jpg";
    this.imgUrl = require("@/" + urlTemp);
    this.imgQRCode = require("@/" + "assets/qrcocedemo.png");
  },
  mounted() {
    this.GetSchoolList();
  },
  methods: {
    subStr(str,len)
    {
        if(str.length<=len)
        {
          return str;
        }
        else{
           return  str.substring(0,len)+'...';
        }
    },
    ToLogin() {
      this.$router.push({ path: '/Web/Login' });
    },
    LinkTo(str) {
      this.$router.push({ path: '/Web/Need/NeedList', query: { type: str } })
    }
    ,
    GetSchoolList()
    {
           this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/school?page=1&pageSize=4",
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

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
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