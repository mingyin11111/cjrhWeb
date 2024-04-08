<template>
    <el-container>
        
        <el-main>
            <el-row style="background-color: lightblue;">
                <el-col :span="4">
                    <div>&nbsp;</div>
                </el-col>
                <el-col :span="16">
                    <table style="width:100%; font-size: medium;">
                        <tr>
                            <td style="width: 51px;">
                                <img src="/api/files/1707719535452.png"
                                    style="width:50px;height: 50px; border-radius: 25px;">
                            </td>
                            <td align="left "> 网站名称</td>
                            <td><el-button type="text" @click="ToIndex">首页</el-button></td>
                            <td><el-button type="text" @click="ToNeeds">需求大厅</el-button></td>
                            <td><el-button type="text" @click="InformationShow"  >信息中心</el-button></td>
                            <td><el-button type="text" @click="ToResourceList" >资源共享</el-button></td>
                            <td><el-button type="text">专项竞赛</el-button> </td>
                            <td align="right">
                                <table>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </table>

                                <div>
                                    <div style="display: block;width: 100px;float: right;margin-right: 15px;">
                                        <el-button  v-if="$store.state.MemberName==''"  type="primary"  size="small" @click="ToLogin">登录</el-button>
                                    </div>
                                    <div style="display: block;width: 400px;float: right;">
                                        <el-popover placement="bottom-start" width="100" trigger="hover" class="Myself">
                                            <ul>
                                                <li @click="ToMyCenter">我的需求</li>
                                                <li @click="ToMyCenter">我的投标</li>
                                                <li>修改密码</li>
                                                <li  @click="ToLoginOut" >注销登录</li>
                                            </ul>
                                            <span slot="reference" style="cursor: pointer;">{{ $store.state.MemberName }}</span>
                                        </el-popover>
                                        <div> {{ $store.state.UnitName }}</div>
                                    </div>

                                </div>

                            </td>
                        </tr>
                    </table>
                </el-col>
                <el-col :span="4">
                    <div>&nbsp;</div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="4">
                    <div>&nbsp; </div>
                </el-col>
                <el-col :span="16">
                    <router-view />
                </el-col>
                <el-col :span="4">
                    <div>&nbsp; </div>
                </el-col>
            </el-row>

            <el-row style="background-color: #36394d;">
                <el-col :span="4">
                    <div>&nbsp; </div>
                </el-col>
                <el-col :span="16">
                    <table style="color: white;height: 200px;width: 100%;">
                        <tr>
                            <td style="width: 20%;" valign="top">
                                <ul style="list-style: none;">
                                    <li style="font-size: 20px;">关于我们</li>
                                    <li style="font-size: 14px;margin: 10px;">平台简介</li>
                                    <li style="font-size: 14px;margin: 10px;">平台公告</li>
                                    <li style="font-size: 14px;margin: 10px;">联系方式</li>
                                </ul>
                            </td>
                            <td style="width: 20%;" valign="top">
                                <ul style="list-style: none;">
                                    <li style="font-size: 20px;">交易保障</li>
                                    <li style="font-size: 14px;margin: 10px;">担保交易</li>
                                    <li style="font-size: 14px;margin: 10px;">公司资质</li>
                                    <li style="font-size: 14px;margin: 10px;">支付方式</li>
                                </ul>
                            </td>
                            <td valign="top">
                                <div style="font-size: 20px;margin-top: 15px;">
                                    关注我们
                                </div>
                                <div style="font-size: 14px;margin: 10px;">
                                    <img :src="imgQRCode"
                                        style="width: 80px;height: 80px;border-width: 1px;border-style: solid;border-color: white;" />
                                </div>
                            </td>
                            <td valign="top">
                                <div style="font-size: 20px;margin-top: 15px;">
                                    &nbsp;
                                </div>
                                <div style="font-size: 14px;margin: 10px;">

                                    <img :src="imgQRCode"
                                        style="width: 80px;height: 80px;border-width: 1px;border-style: solid;border-color: white;" />
                                </div>
                            </td>
                            <td valign="top">
                                <div style="font-size: 20px;margin-top: 15px;">
                                    &nbsp;
                                </div>
                                <div style="font-size: 14px;margin: 10px;">
                                    <img :src="imgQRCode"
                                        style="width: 80px;height: 80px;border-width: 1px;border-style: solid;border-color: white;" />
                                </div>
                            </td>
                        </tr>
                    </table>

                </el-col>
                <el-col :span="4">
                    <div>&nbsp;</div>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>
  
<script>
import VueRouter from 'vue-router';
import { mapMutations } from "vuex";
export default {
    name: "Index",
    data() {
        return {
            loading: true,
            imgUrl: '',
            imgQRCode: '',
            MemberName: ''
        };
    },
    created() {
        let urlTemp = "assets/mainpic.png";
        this.imgUrl = require("@/" + urlTemp);
        this.imgQRCode = require("@/" + "assets/qrcocedemo.png");
    },
    mounted() {
        let url = document.location.href;
        if (url.endsWith('/#/')) {
            this.$router.push({ path: '/Web/Index' });
        }


    },
    methods: {
        ...mapMutations(["changeToken"]),
        ...mapMutations(["changeMemberName"]),
        ...mapMutations(["changeUnitName"]),
        ...mapMutations(["changeUserType"]),
        ...mapMutations(["changeMemberID"]),
        ToLoginOut()
        {
            
            this.$confirm("你确定要注销登录吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
            }).then(() => {
                //将用户token保存到vuex中
                this.changeToken("");
                this.changeMemberName("");
                this.changeUnitName( "");
                this.changeUserType(  "");
                this.changeMemberID(  "");
            })
            .catch(() => {
            
            });
           
        },
        ToMyCenter()
        {
            this.$router.push({ path: '/Web/MyCenter/MyCenter' });
        },
        ToNeeds() {
            this.$router.push({ path: '/Web/Need/NeedList' });
        },
        ToLogin() {
            this.$router.push({ path: '/Web/Login' });
        },
        ToIndex() {
            this.$router.push({ path: '/Web/index' });
        },
        InformationShow() {
            this.$router.push({ path: '/Web/InformationPublish/InformationShow' });
        },
        ToResourceList() {
            this.$router.push({ path: '/Web/Resource/ResourceList' });
        },
        
    },
    components: { VueRouter }
};
</script>
<style scoped>
.el-popover   ul{
    list-style: none;
    padding: 5px;
}
.el-popover   ul li{
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgb(122, 118, 118);
   padding-top: 10px;
   padding-bottom: 5px;
   cursor: pointer;
}

</style>
  