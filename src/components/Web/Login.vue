<template>
    <el-container>
        <el-main>



            <el-row>

                <el-col :span="24">

                    <el-card class="box-card" style="margin-top: 15px;height: 400px;">
                        <div style="display: inline-block;  width: 33%;">
                            1
                        </div>
                        <div style="display:inline-block;  width: 33%;">
                            2
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
                    method: "get",
                    url: "/api/systemMember?LoginName=" + this.PwdLogin.Name + "&LoginPwd=" + this.PwdLogin.Pwd,
                    data: qs.stringify({

                    })
                }).then(res => {

                    if (res.data.err == 0) {
                        if (res.data.data.count > 0) {
                            _this.userToken = "UserIDToken:" + res.data.data.rows[0].id;
                            //将用户token保存到vuex中
                            _this.changeToken(_this.userToken);
                            _this.changeMemberName( res.data.data.rows[0].Name);
                            _this.changeUnitName( res.data.data.rows[0].UnitName);
                            _this.changeUserType( res.data.data.rows[0].UserType);
                            _this.changeMemberID( res.data.data.rows[0].id);
                            this.$message({ message: "登录成功!", type: "success" });
                            _this.$router.push("/Web/index");
                        }
                        else {
                            this.$message.error("用户名或密码不正确！"  );
                        }
                    }
                    else {
                        this.$message.error("登录过程中出错：" + res.data.err);
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
    },

};
</script>
<style scoped></style>
  