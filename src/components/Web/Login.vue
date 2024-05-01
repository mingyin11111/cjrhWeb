<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <div style="height: 40px;"></div>
                    <el-card class="box-card loginbg" style="margin-top: 15px;height: 400px;  ;">
                        <div style="display: inline-block;  width: 33%;">
                            &nbsp;
                        </div>
                        <div style="display:inline-block;  width: 33%;">
                            &nbsp;
                        </div>
                        <div style="display: inline-block;  width: 33%;">
                            <el-card shadow="never" v-loading="Login_loading">
                                <el-tabs v-model="LoginMode" @tab-click="handleClick">
                                    <el-tab-pane label="密码登录" name="Password">
                                        <el-input v-model="PwdLogin.Name" placeholder="请输入用户名"
                                            style="width: 90%;margin: 15px;"></el-input>
                                        <el-input v-model="PwdLogin.Pwd" show-password placeholder="请输入密码"
                                            style="width: 90%;margin:0px 15px 15px 15px"></el-input>
                                        <el-button type="danger" @click="ToPwdLogin"
                                            style="width: 90%;margin:0px 15px 15px 15px">登录</el-button>
                                        <div style="width: 90%;margin:0px 15px 15px 15px">
                                            <el-button type="text" style="float: left;" @click="ToChooseRegisterMode">去注册</el-button>
                                            <el-button type="text" style="float: right;">忘记密码</el-button>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="验证码登录" name="validateCode">
                                        <el-input v-model="PwdLogin.Name" placeholder="请输入手机号码"
                                            style="width: 90%;margin: 15px;"></el-input>
                                        <el-input v-model="PwdLogin.Pwd" show-password placeholder="请输入验证码"
                                            style="width: 90%;margin:0px 15px 15px 15px">
                                            <el-button slot="append">获取验证码</el-button>
                                        </el-input>
                                        <el-button type="danger" style="width: 90%;margin:0px 15px 15px 15px">登录</el-button>
                                        <div style="width: 90%;margin:0px 15px 15px 15px">
                                            <el-button type="text" style="float: right;">忘记密码</el-button>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-card>
                        </div>
                    </el-card>
                    <div style="height: 40px;"></div>
                </el-col>

            </el-row>


        </el-main>
    </el-container>
</template>
  
<script>
import { mapMutations } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            Login_loading:false,
            LoginMode: 'Password',
            PwdLogin: { Name: '', Pwd: '' },

        };

    },
    created() {


    },
    mounted() {
       // this.GetList(1);
    },
    methods: {
        ...mapMutations(["changeToken"]),
        ...mapMutations(["changeMemberName"]),
        ...mapMutations(["changeUnitName"]),
        ...mapMutations(["changeUserType"]),
        ...mapMutations(["changeMemberID"]),
        ToPwdLogin() {
            let _this = this;
            if (this.PwdLogin.Name === "" || this.PwdLogin.Pwd === "") {
                this.$message('账号或密码不能为空');
            } else {
                this.Login_loading = true;
                var qs = require("qs");
                this.$axios({
                    method: "post",
                    url: "/api/systemMember/Login",
                    data: qs.stringify({
                        LoginName:this.PwdLogin.Name,
                        LoginPwd:this.PwdLogin.Pwd
                    })
                }).then(res => {

                    if (res.data.err == 0) {
                        if (res.data.data) {
                            _this.userToken =   res.data.data.Token;
                            //将用户token保存到vuex中
                            _this.changeToken(_this.userToken);
                            _this.changeMemberName( res.data.data.Name);
                            _this.changeUnitName( res.data.data.UnitName);
                            _this.changeUserType( res.data.data.UserType);
                            _this.changeMemberID( res.data.data.id);
                            this.$message({ message: "登录成功!", type: "success" });
                            _this.$router.push("/Web/index");
                        }
                        else {
                            this.$message.error("用户名或密码不正确！"  );
                        }
                    }
                    else {
                        this.$message.error("登录过程中出错：" + res.data.err+res.data.errMsg);
                    }

                    this.Login_loading = false;
                })
                    .catch(error => {
                        this.$message.error("登录中出错！");
                        console.log(error);
                        this.Login_loading = false;
                    });
            }
        }
        ,
        ToChooseRegisterMode()
        {
             this.$router.push({ path: '/Web/Register/Register_Choose'  })
        }
    },

};
</script>
<style scoped>

.loginbg {
  background-image: url('../img/LoginBG.png');
  background-size: 100% ;
  background-repeat: no-repeat;
}
</style>
  