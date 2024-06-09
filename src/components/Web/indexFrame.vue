<template>
    
    <el-container>
        <el-main style="padding: 0px;;">
            <el-row>
                <div style="background: #333333;  height: 36px;  line-height: 36px;color: #fff;">
                    <div class="el-col el-col-4"> &nbsp;</div>
                    <div class="el-col el-col-16" style="font-size: 12px;">
                        欢迎访问上海市工商联信息技术商会产教融合专业委员会官方网站！
                        <div style="float: right;font-size: 12px;">
                            <li class="el-icon-phone-outline"> </li>
                            新浪微博
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <li class="el-icon-phone-outline"> </li>
                            服务热线：021-54306082（总机）
                        </div>
                    </div>
                </div>
            </el-row>
            <el-row
                style="padding-top: 5px;background-color: white;opacity: 1  ;width: 100%;margin-top: -5px;border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: #36394d;">

                <el-col :span="4">
                    <div>&nbsp;</div>
                </el-col>
                <el-col :span="16">
                    <table style="width:100%; font-size: medium;padding-top: 20px;padding-bottom: 20px;">
                        <tr>
                            <td style="width: 51px;"> <img :src="LogoPic"> </td>
                            <td align="right">
                                <table>
                                    <tr>
                                        <td><img :src="LogoPic2"> </td>

                                    </tr>

                                </table>


                            </td>
                        </tr>
                    </table>
                </el-col>
                <el-col :span="4">
                    <div>&nbsp;</div>
                </el-col>

            </el-row>
            <el-row>
                <div class="bar" style="   height: 60px;   color: #fff;">
                    <div class="el-col el-col-4"> &nbsp;</div>
                    <div class="el-col el-col-16" style="font-size: 20px;">
                        <table id="mybar" style="width:100%; height: 60px;   color: white;">
                            <tr>
                                <td @click="ToIndex" :class="[selectMenuIndex==1?'tdhover':'']" align="center"> 首页 </td>
                                <td @click="ToNeeds" :class="[selectMenuIndex==2?'tdhover':'']" align="center"> 需求大厅</td>
                                <td @click="InformationShow":class="[selectMenuIndex==3?'tdhover':'']" align="center"> 信息中心</td>
                                <td @click="ToResourceList" :class="[selectMenuIndex==4?'tdhover':'']" align="center"> 资源共享</td>
                                <td @click="ToZhuangXiangJingSaiList"  :class="[selectMenuIndex==5?'tdhover':'']" align="center"> 专项竞赛</td>
                                <td style="width:200px;font-size: 14px;" align="right">
                                    <div>
                                        <div style="display: block;width: 50px;float: right;margin-right: 15px;">
                                            <el-button v-if="$store.state.MemberName == ''" type="primary" size="small"
                                                @click="ToLogin">登录</el-button>
                                        </div>
                                        <div style="display: block;width: 100%;float: right;">
                                            <el-popover placement="bottom-start" visible-arrow="false" width="100"
                                                trigger="hover" class="Myself">
                                                <ul>
                                                    <li @click="ToMyCenter">我的需求</li>
                                                    <li @click="ToMyNeedSubmit">我的投标</li>
                                                    <li>修改密码</li>
                                                    <li @click="ToLoginOut">注销登录</li>
                                                </ul>
                                                <span slot="reference" style="cursor: pointer;">{{
                                                    $store.state.MemberName }}</span>
                                            </el-popover>
                                            <div> {{ $store.state.UnitName }}</div>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-row>
<el-row   v-if="$IsWebIndex==1">
  <el-col :span="24">
    
    <el-carousel  height="520px">
        <el-carousel-item key="item1">
          <el-image :src="imgUrl3" style="width: 100%;height: 520px;margin-bottom: 10px;"></el-image>
        </el-carousel-item>
        <el-carousel-item key="item2">
          <el-image :src="imgUrl2" style="width: 100%;height: 520px;margin-bottom: 10px;"></el-image>
        </el-carousel-item>
      </el-carousel>
</el-col>
</el-row>

            <el-row>
                <el-col :span="4">
                    <div>&nbsp;  </div>
                </el-col>
                <el-col :span="16">
                    <router-view />
                </el-col>
                <el-col :span="4">
                    <div>&nbsp; </div>
                </el-col>
            </el-row>

            <el-row style="background-color: #0168ad;border-top-style: solid;  border-top-color: #0168ad;">
                <el-col :span="2">
                    <div>&nbsp; </div>
                </el-col>
                <el-col :span="20">
                    <table style="color:#0168ad;width: 100%;">
                        <tr>
                            <td style="width: 100%;" valign="top" align="center" colspan="32">
                                <img :src="footerPic" style="  margin-bottom: 10px; ">
                            </td>
                        </tr>
                    </table>
                </el-col>
                <el-col :span="2">
                    <div>&nbsp;</div>
                </el-col>
            </el-row>
            <el-row
                style="background-color: #0168ad;border-top-style: solid;border-top-width: 1px;  border-top-color:white;">
                <el-col :span="24">
                    <table style="color:#0168ad;width: 100%;margin-top: 20px;margin-bottom: 50px;">
                        <tr>
                            <td style="width: 100%;" valign="top" align="center" colspan="32">

                                <ul id="ftmeau" style="display: inherit;">

                                    <li class="menu-item1"
                                        style="border-right-width: thin;  border-right-style: dashed;  border-right-color: white;">
                                        <img src="../img/fico1.png" />
                                        <br />
                                        <a style="font-size: 18px;" href="https://www.chanjiao.org.cn/?cat=56">信息公开</a>
                                        <ul class="sub-menu">
                                            <li id="menu-item-6945"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-6945">
                                                <a href="https://www.chanjiao.org.cn/?cat=57">通知公告</a>
                                            </li>
                                            <li id="menu-item-6944"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-6944">
                                                <a href="https://www.chanjiao.org.cn/?cat=58">资讯快报</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item1"
                                        style="border-right-width: thin;  border-right-style: dashed;  border-right-color: white;">
                                        <img src="../img/fico2.png" />
                                        <br />
                                        <a style="font-size: 18px;" href="https://www.chanjiao.org.cn/?cat=62">行业资讯</a>
                                        <ul class="sub-menu">
                                            <li id="menu-item-6949"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-6949">
                                                <a href="https://www.chanjiao.org.cn/?cat=64">行业动态</a>
                                            </li>
                                            <li id="menu-item-6946"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category current-menu-item menu-item-6946">
                                                <a href="https://www.chanjiao.org.cn/?cat=63"
                                                    aria-current="page">政策法规</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item1"
                                        style="border-right-width: thin;  border-right-style: dashed;  border-right-color: white;">
                                        <img src="../img/fico3.png" />
                                        <br />
                                        <a style="font-size: 18px;" href="https://www.chanjiao.org.cn/?cat=59">发起单位</a>
                                        <ul class="sub-menu">
                                            <li id="menu-item-6948"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-6948">
                                                <a href="https://www.chanjiao.org.cn/?cat=61">主任单位</a>
                                            </li>
                                            <li id="menu-item-6947"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-6947">
                                                <a href="https://www.chanjiao.org.cn/?cat=60">副主任单位</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item1"
                                        style="border-right-width: thin;  border-right-style: dashed;  border-right-color: white;">
                                        <img src="../img/fico4.png" />
                                        <br />
                                        <a style="font-size: 18px;"
                                            href="https://www.chanjiao.org.cn/?page_id=6890">会员服务</a>
                                        <ul class="sub-menu">
                                            <li id="menu-item-6954"
                                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6954">
                                                <a href="https://www.chanjiao.org.cn/?page_id=6926">工作规则</a>
                                            </li>
                                            <li id="menu-item-6952"
                                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6952">
                                                <a href="https://www.chanjiao.org.cn/?page_id=6894">入会申请</a>
                                            </li>
                                            <li id="menu-item-6951"
                                                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-6951">
                                                <a href="https://www.chanjiao.org.cn/?page_id=6895">入会流程</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="menu-item1">
                                        <img src="../img/fico5.png" />
                                        <br />
                                        <a style="font-size: 18px;" href="https://www.chanjiao.org.cn/?cat=65">专家智库</a>
                                        <ul class="sub-menu">
                                            <li id="menu-item-6943"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-6943">
                                                <a href="https://www.chanjiao.org.cn/?cat=67">智库成员</a>
                                            </li>
                                            <li id="menu-item-6942"
                                                class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-6942">
                                                <a href="https://www.chanjiao.org.cn/?cat=66">专家观点</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                            </td>
                        </tr>
                    </table>


                </el-col>
            </el-row>
            <el-row
                style="background-color: #363636;border-top-style: solid; border-top-width: 2px; border-top-color: white;">
                <el-col :span="2">
                    <div>&nbsp; </div>
                </el-col>
                <el-col :span="20">
                    <table style="color:#0168ad;width: 100%;">
                        <tr>
                            <td style="width: 100%; color: white; font-size: 14px;padding: 20px; line-height: 30px;"
                                valign="top" align="center" colspan="32">

                                地址：电话：021-54306082（总机）<br>

                                Copyright @ 2024 上海市工商联信息技术商会产教融合专业委员会 版权所有 ICP备案编号：沪ICP备2020031101号-5

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
            imgUrl3: '',
            imgUrl2:'',
            loading: true,
            imgUrl: '',
            imgQRCode: '',
            MemberName: '',
            LogoPic: '',
            LogoPic2: '',
            footerPic: '',
            selectMenuIndex: 1,
        };
    },
    created() {

         
    this.imgUrl3 = require("@/components/img/bg.jpg" );
    this.imgUrl2 = require("@/components/img/bg2.jpg");

        let urlTemp = "assets/mainpic.png";
        this.imgUrl = require("@/" + urlTemp);
        this.imgQRCode = require("@/" + "assets/qrcocepic.png");
        this.LogoPic = require("@/" + "assets/logo_1.jpg");
        this.LogoPic2 = require("@/" + "assets/logo_2.png");
        this.footerPic = require("@/" + "assets/footer.png");



    },
    mounted() {
        let url = document.location.href;
        if (url.endsWith('/#/')) {
            this.$router.push({ path: '/Web/Index' });
        }
    },
    computed: {
         
    },
    methods: {
        ...mapMutations(["changeToken"]),
        ...mapMutations(["changeMemberName"]),
        ...mapMutations(["changeUnitName"]),
        ...mapMutations(["changeUserType"]),
        ...mapMutations(["changeMemberID"]),
        ToLoginOut() {

            this.$confirm("你确定要注销登录吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                //将用户token保存到vuex中
                this.changeToken("");
                this.changeMemberName("");
                this.changeUnitName("");
                this.changeUserType("");
                this.changeMemberID("");
            })
                .catch(() => {

                });

        },

        ToIndex() {
            this.selectMenuIndex=1;
            this.$router.push({ path: '/Web/index' });
        },
        ToNeeds() {
            this.selectMenuIndex=2;
            this.$router.push({ path: '/Web/Need/NeedList' });
        },
        InformationShow() {
            this.selectMenuIndex=3;
            this.$router.push({ path: '/Web/InformationPublish/InformationShow' });
        },
        ToResourceList() {
            this.selectMenuIndex=4;
            this.$router.push({ path: '/Web/Resource/ResourceList' });
        },
        
        ToZhuangXiangJingSaiList()
        {
            this.selectMenuIndex=5;
            this.$router.push({ path: '/Web/Competition/CompetitionList' });
        },
        ToMyCenter() {
            this.$router.push({ path: '/Web/MyCenter/MyCenter' });
        },
        ToMyNeedSubmit()
        {
            this.$router.push({ path: '/Web/MyCenter/MySubmit' });
        },
        ToLogin() {
            this.$router.push({ path: '/Web/Login' });
        },
       
       
       

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

.bar {
    background-image: url('../img/bg_menu.png');
}

#mybar td:hover {
    background: rgba(0, 54, 93, .3);
    color: white;
}

.tdhover {
    background: rgba(0, 54, 93, .3);
    color: white;
}

#mybar td {
    cursor: pointer
}

.menu-item1 {
    float: left;
    width: 220px;
    line-height: 35px;
}

.menu-item1 a {
    text-decoration: none;
    color: #b1daf8;

}

.menu-item1 a:hover {
    text-decoration: none;
    color: white;
}

.menu-item1 a:visited {
    text-decoration: none;
    color: b1daf8;
}

.menu-item1>ul {
    line-height: 25px;
    padding: 0px;
    font-size: 14px;
}
</style>