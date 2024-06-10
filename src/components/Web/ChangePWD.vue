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
                                <el-tabs v-model="LoginMode" >
                                    <el-tab-pane label="修改密码" name="Password">
                                        原密码：<el-input show-password v-model="PwdChange.oldPwd" placeholder="请输入原密码"  style="width: 70%;margin:0px 15px 15px 15px"></el-input>
                                        新密码：<el-input show-password v-model="PwdChange.newPwd" placeholder="请输入新密码"  style="width: 70%;margin:0px 15px 15px 15px"></el-input>
                                        新密码：<el-input  show-password v-model="PwdChange.newPwd2"  placeholder="请再次输入新密码"  style="width: 70%;margin:0px 15px 15px 15px"></el-input>
                                        <el-button type="danger" @click="ToChangePwd" style="width: 90%;margin:0px 15px 15px 15px">确定修改</el-button>
                                        <div style="width: 90%;margin:0px 15px 15px 15px">
                                            
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
            PwdChange: { oldPwd: '', newPwd: '' ,newPwd2: '' },

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
        ToChangePwd() {
            let _this = this;
            if (this.PwdChange.newPwd === "" || this.PwdChange.oldPwd === ""|| this.PwdChange.newPwd2 === "" ) {
                this.$message('请填写密码，新旧密码不能为空');
            }
            else if(this.PwdChange.newPwd  !=this.PwdChange.newPwd2 )
            {
                this.$message('两次输入的新密不同，请重新输入');
            }
             else {
                this.Login_loading = true;
                var qs = require("qs");
                this.$axios({
                    method: "post",
                    url: "/api/systemMember/ChangePWD?loginName="+ this.$store.state.LoginName+"&oldPwd="+this.PwdChange.oldPwd+"&newPwd="+this.PwdChange.newPwd+"&newPwd2="+this.PwdChange.newPwd2,
                    data: qs.stringify({
                        
                    })
                }).then(res => {

                    if (res.data.err == 0) {
                        this.$message({ message: "修改成功!", type: "success" });
                        this.PwdChange.oldPwd="";
                        this.PwdChange.newPwd="";
                        this.PwdChange.newPwd2='';
                    }
                    else {
                        this.$message.error("出错：" + res.data.err+res.data.errMsg);
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
  