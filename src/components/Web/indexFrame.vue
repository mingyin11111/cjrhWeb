<template>
    <el-container>
        <el-main style="padding: 0px;;">
            <el-row style="padding-top: 5px;background-color: white;opacity: 1; position: fixed; z-index: 999999999;width: 100%;margin-top: -5px;border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: #36394d;">
                <el-col :span="2">
                    <div>&nbsp;</div>
                </el-col>
                <el-col :span="20">
                    <table style="width:100%; font-size: medium;">
                        <tr>
                            <td style="width: 51px;"> <img :src="LogoPic" style="width:200px;  "> </td>
                            <td style="width: 30px;">&nbsp;</td>
                            <td><el-button type="text" style="font-size: 18px;" @click="ToIndex" >首页</el-button></td>
                            <td><el-button type="text" style="font-size: 18px;" @click="ToNeeds">需求大厅</el-button></td>
                            <td><el-button type="text"  style="font-size: 18px;" @click="InformationShow"  >信息中心</el-button></td>
                            <td><el-button type="text" style="font-size: 18px;" @click="ToResourceList" >资源共享</el-button></td>
                            <td><el-button type="text" style="font-size: 18px;" >专项竞赛</el-button> </td>
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
                <el-col :span="2">
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

            <el-row style="background-color: #fbfbfb;">
                <el-col :span="2">
                    <div>&nbsp; </div>
                </el-col>
                <el-col :span="20">
                    <table style="color:#5e6464;width: 100%;">
                        <tr>
                            <td style="width: 100%;" valign="top" align="left " colspan="32">
                                <img :src="LogoPic" style="width:150px; margin-bottom: 10px; ">
                            </td>
                        </tr>
                        <tr>
                            <td  class=""valign="top" align="left "  style="width: 50%;">
                                与我合作
                            </td>
                            <td   valign="top" align="right " style="width: 50%;">
                                关注我们
                            </td>
                        </tr>
                        <tr>
                            <td  class=""valign="top" align="left "  >
                                 <table style="width: 100%;line-height: 30px;">
                                    <tr>
                                        <td >
                                            上海公司<br/>

                                            联系人：王女士<br/>

                                            电话：17269338375<br/>
                                            
                                            邮箱：wangmengyuan@diamondyu.com<br/>

                                            地址：上海市闵行区虹梅南路6001号东海学院传媒学院4楼<br/>

                                            公司域名：https://diamondyu.com<br/>

                                        </td>
                                        <td>
                                            无锡公司<br/>

                                            史先生<br/>

                                            15504444684<br/>

                                            shishengyu@diamondyu.com<br/>

                                            江苏省无锡市滨湖区无锡商会大厦12楼Z28<br/>

                                            备案号：沪ICP备2020031101号-2<br/>

                                        </td>
                                    </tr>
                                 </table>
                            </td>
                            <td   valign="top" align="left ">
                                <img :src="imgQRCode" style="  ">
                            </td>
                        </tr>
                    </table>

                </el-col>
                <el-col :span="2">
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
            MemberName: '',
            LogoPic:'',
        };
    },
    created() {
        let urlTemp = "assets/mainpic.png";
        this.imgUrl = require("@/" + urlTemp);
        this.imgQRCode = require("@/" + "assets/qrcocepic.png");
        this.LogoPic=require("@/" + "assets/logo_jcjy.png");
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
  