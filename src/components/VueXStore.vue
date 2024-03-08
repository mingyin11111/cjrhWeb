<template>
  <div>
    在store中存入这个值 <input type="text" v-model="loginForm.username" placeholder="Bind-store" />
<button @click="saveToStore">保存</button>
<br>
    绑定Vuex-<input type="text" v-model="loginForm.password" placeholder="密码" />
    <button @click="login">login</button>
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
      }
    };
  },
mounted:{

},
  methods: {
    ...mapMutations(["changeVuexStore"]),
    ...mapMutations(["changeToken"]),
     
    saveToStore(){
        this.changeVuexStore(this.loginForm.username)
    },
    login() {
      let _this = this;
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        var qs = require("qs");
        this.$axios({
          method: "post",
          url: "/api/WebInterface/System/Login.ashx",
          data: qs.stringify({
            name: this.loginForm.username,
            pwd: this.loginForm.password
          })
        })
          .then(res => {
            if (res.data == "Login ERR") {
              this.$message.error("登录失败，请重试！");
            } else {
              _this.userToken = res.data.token;
              // 将用户token保存到vuex中
              alert(res.data.token);
              _this.changeToken("yui");
              _this.$router.push("/home");
              this.$message({ message: "登录成功!", type: "success" });

            }
          })
          .catch(error => {
            this.$message.error("登录中出错！");
            console.log(error);
          });
      }
    }
  }
};
</script>