<template>
    <el-container direction="vertical">
      <el-header height="230px">
        <el-row :gutter="10" class="er1" justify="space-between">
          <el-col :span="2">
            <div>

            </div>
          </el-col>
          <el-col :span="4">
            <div class="jz">
              <div class="logo"></div>
              产教融合供需平台
            </div>


          </el-col>
          <el-col :span="3">
            <div>

            </div>
          </el-col>
          <el-col :span="3">
            <div class="jz">
              需求大厅
            </div>
          </el-col>
          <el-col :span="3">
            <div class="jz">
              信息中心
            </div>
          </el-col>
          <el-col :span="3">
            <div class="jz">
              资源共享
            </div>
          </el-col>
          <el-col :span="3">
            <div class="jz">
              专项竞赛
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content  ">

            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content butt ">
              <el-button type="primary" size="small" class="jz1 ">登录</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10" class="cs" justify="space-between">
          <el-col :span="4">
            <div class="grid-content  ">

            </div>
          </el-col>
          <el-col :span="16">

            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="小程序" value="1"></el-option>
                <el-option label="H5开发" value="2"></el-option>
                <el-option label="课程开发" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <div class="grid-content  ">

            </div>
          </el-col>
        </el-row>

        <div class="cs">

          <div class="cs1">
          
          </div>



        </div>


      </el-header>

      <el-main>

        <div class="remen">

          <h2>热门服务</h2>




          <el-row :gutter="10" justify="space-between">

            <el-col :span="3">
              <div class="zi zi1">
              </div>
              <h3>课程开发</h3>

            </el-col>
            <el-col :span="3">
              <div class="zi zi2">


              </div><h3> 虚拟仿真</h3>
            </el-col>
            <el-col :span="3">
              <div class="zi  zi3">


              </div> <h3> 微课制作</h3>
            </el-col>
            <el-col :span="3">
              <div class="zi  zi4">


              </div><h3>教学能力</h3>
            </el-col>
            <el-col :span="3">
              <div class="zi zi5">


              </div><h3>实训室建设</h3>
            </el-col>
            <el-col :span="3">
              <div class="zi zi6">


              </div><h3>智能硬件</h3>
            </el-col>
            <el-col :span="3">
              <div class="zi zi7">


              </div><h3>ppt制作</h3>
            </el-col>
            <el-col :span="3">
              <div class="zi zi8">


              </div><h3>视频制作</h3>
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

                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>


              </ul>
            </el-col>
          </el-row>


        </div>
        <h2>优质服务商</h2>
        <div class="remen2">
          <el-row :gutter="10" justify="space-between">
            <el-col :span="6" class="elcol-l2">
              <p>
                <span class="logo"></span>
                乌兰浩特市职业教育中心
              </p>
              <div class="gongsi gongsi1"></div>
              <p>LOGO 商标设计</p>
              <p>
                <i class="el-icon-user-solid"></i>潘永超
              </p>
              <p><i class="el-icon-phone"></i>15048282600</p>



            </el-col>
            <el-col :span="6" class="elcol-l2">
              <p> <span class="logo"></span>乌兰浩特市职业教育中心</p>
              <div class="gongsi gongsi1"></div>
              <p>LOGO 商标设计</p>
              <p>
                <i class="el-icon-user-solid"></i>潘永超
              </p>
              <i class="el-icon-phone"></i>15048282600

            </el-col>
            <el-col :span="6" class="elcol-l2">


              <p>
                <span class="logo"></span>
                乌兰浩特市职业教育中心
              </p>
              <div class="gongsi gongsi1"></div>
              <p>LOGO 商标设计</p>
              <p>
                <i class="el-icon-user-solid"></i>潘永超
              </p>
              <i class="el-icon-phone"></i>15048282600

            </el-col>
            <el-col :span="6" class="elcol-l2">


              <p>
                <span class="logo"></span>
                乌兰浩特市职业教育中心
              </p>
              <div class="gongsi gongsi1"></div>
              <p>LOGO 商标设计</p>
              <p>
                <i class="el-icon-user-solid"></i>潘永超
              </p>
              <i class="el-icon-phone"></i>15048282600

            </el-col>
          </el-row>
        </div>

        <h2>热门任务推荐</h2>
        <div class="remen3">

          <el-row :gutter="10" justify="space-between">

            <el-col :span="8" class="elcol-l">
              <div class="div11">课程开发</div> <div class="circle circle::before divr"></div>
              <ul>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              </ul>

            </el-col>
            <el-col :span="8" class="elcol-l">
              <div class="div11">虚拟仿真</div> <div class="circle circle::before divr"></div>

              <ul>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              </ul>
            </el-col>
            <el-col :span="8" class="elcol-l">
              <div class="div11">微课制作</div> <div class="circle circle::before divr"></div>

              <ul>

                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>


              </ul>
            </el-col>
          </el-row>
          <el-row :gutter="10" justify="space-between">

            <el-col :span="8" class="elcol-l">
              <div class="div11">课程开发</div> <div class="circle circle::before divr"></div>
              <ul>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              </ul>

            </el-col>
            <el-col :span="8" class="elcol-l">
              <div class="div11">虚拟仿真</div> <div class="circle circle::before divr"></div>

              <ul>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后</li>
              </ul>
            </el-col>
            <el-col :span="8" class="elcol-l">
              <div class="div11">微课制作</div> <div class="circle circle::before divr"></div>

              <ul>

                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>
                <li>是支付宝面向支付宝用户端提供的产品。商家可在用户下单并授权后  </li>


              </ul>
            </el-col>
          </el-row>






        </div>


      </el-main>
    <el-footer>Footer</el-footer>
  </el-container>

</template>


<style>
  .div11{
float :left ;
font-weight:bold;
margin-left :10px;
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
  ul{
    margin-left:-30px;
    margin-top:5px;

  }
  li { /*过长省略*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height:35px;
   width:400px;
  }
  .red-dot {/*红点*/
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: red;
    vertical-align: middle;
    margin-left:10px;
  }
  .yellow-dot { /*黄点*/
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fffa02;
    vertical-align: middle;
  }
  .blue-dot { /*黄点*/
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color:#B3C0D1;
    vertical-align: middle;
  }
  h2 {
line-height:35px;
font-size:35px;
text-align:center;

  }
  h3 {
    line-height:35px;
  }
  h4 {
    display:inline-block ;
    margin-left:5px;
  }
  h5{
    margin-left: 5px;
    height:10px;
  }
  .cs .cs1 {
    width:80%;
  }
  p {
   margin:5px;
  }
  .remen {
    margin-top: 0px;
    border: 1px solid #99a9bf;
    border-radius: 10px;
    width: 90%;
    display: inline-block; /*转内联*/
  }
  .remen1 {
    margin-top: 10px;
    border: 1px solid #99a9bf;
    border-radius: 10px;
    width: 90%;
    height:160px;
    display: inline-block; /*转内联*/
  }
  .remen2 {
    margin-top: 10px;
    border: 1px solid #99a9bf;
    border-radius: 10px;
    width: 90%;
    height: 280px;
    display: inline-block; /*转内联*/
  }
  .remen3 {
    margin-top: 10px;
    padding-right :10px;
    border: 1px solid #99a9bf;
    border-radius: 10px;
    width: 90%;
    height: 300px;
    display: inline-block; /*转内联*/
  }
  .huanghang {
    border:1px solid #99a9bf;
    width:1200px;
    height:40px;
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
  .elcol-l
  {
    text-align:left;
    padding:10px 0px 0px 0px;

  }
  .elcol-2 {
    text-align: center;
    padding: 10px 0px 0px 0px;
  }
  .cs {
    background-image: url('img/bg.jpg');
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
    background-image: url('img/logo.png');
    vertical-align: middle; /*内联垂直居中*/
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
    background-image: url('img/class.png');
  }
  .zi2 {
    background-image: url('img/vr.png');
  }
  .zi3 {
    background-image: url('img/micro.png');
  }
  .zi4 {
    background-image: url('img/teach.png');
  }
  .zi5 {
    background-image: url('img/laboratory.png');
  }
  .zi6 {
    background-image: url('img/intelligence.png');
  }
  .zi7 {
    background-image: url('img/PPT.png');
  }
  .zi8 {
    background-image: url('img/vod.png');
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
    display: inline-block; /*转内联*/
  }
  .gongsi1 {
    background-image: url('img/ds.png');
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
    height: 1260px;
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
<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        select: ''
      }
    }
  }
</script>
