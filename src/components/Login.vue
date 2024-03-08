<template>
  
  <div class="login-box">
    <h3 class="login-title">欢迎登录</h3>
    <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
    <br/>
    <br/>
    <el-input   v-model="loginForm.password" placeholder="密码"  show-password />
    <br/>
    <br/>
     <el-button type="success" @click="login" style="width:100%"> <i v-if="loadingimg" class="el-icon-loading"></i>  登录</el-button>
     <br/>
    <br/>
  </div>
 
</template>
 
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loadingimg:false,
    };
  },

  methods: {
    ...mapMutations(["changeToken"]),
    login() {
      let _this = this;
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$message('账号或密码不能为空');
      } else {
        this.loadingimg=true;
        var qs = require("qs");
        this.$axios({
          method: "get",
          url: "/api/systemMember?LoginName="+this.loginForm.username+"&LoginPwd="+this.loginForm.password,
          data: qs.stringify({
           
          })
        }) .then(res => {
          
          if(res.data.err==0)
          {
              if(res.data.data.count>0)
              {
                _this.userToken = "UserIDToken:"+res.data.data.rows[0].id;
                //将用户token保存到vuex中
                _this.changeToken(_this.userToken);
                this.$message({ message: "登录成功!", type: "success" });
                _this.$router.push("/home");
              }
              else{
                this.$message.error("登录错误1："+res.data.err);
              }
          }
          else{
            this.$message.error("登录错误2："+res.data.err);
          }
           
           
            

           // if (res.data == "Login ERR") {
           //   this.$message.error("登录失败，请重试！");
           // } else {
           //   _this.userToken = res.data.token;
              // 将用户token保存到vuex中
           //   _this.changeToken(res.data.token);
              
           //   _this.$router.push("/home");
           //   this.$message({ message: "登录成功!", type: "success" });
           // }
            this.loadingimg=false;
          })
          .catch(error => {
            this.$message.error("登录中出错！");
            console.log(error);
            this.loadingimg=false;
          });
      }
    }
  }
};
</script>
<style lang="css" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>