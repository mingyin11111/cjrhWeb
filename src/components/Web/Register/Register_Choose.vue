<template>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24"> 
            <div style="height: 80px;"></div>
            <div style="font-size: 16px;padding-bottom: 20px;"  >
              请选择注册主体类型：
            </div>
            <el-card shadow="hover" style="padding: 5px;width: 48%;display: inline-block;">
                学校：<br/>
                <el-button type="text" @click="ToRegister_School">去注册</el-button>
            </el-card>
            <el-card shadow="hover" style="padding: 5px;width: 48%;display: inline-block;">
                企业：<br/>
                <el-button type="text"  @click="ToRegister_Company">去注册</el-button>
            </el-card>
            <div style="height: 80px;"></div>
            </el-col>
           
        </el-row>
        </el-main>
    </el-container>
  </template>
  
  <script>
  import Vue from 'vue'
    
  export default {
    name: " ",
    data() {
      return {
        
      };
    },
    mounted() {
     // this.GetList(1);
    },
    methods: {
      ToRegister_School()
      {
         this.$router.push({ path: '/Web/Register/Register_School'  })
      },
      ToRegister_Company()
      {
         this.$router.push({ path: '/Web/Register/Register_Company'  })
      }
    },
  
  };
  </script>
   

  <style scoped>
  .bg-purple-dark {
    background: #99a9bf;
  }
  
  .bg-purple-light {
    background: #e5e9f2;
  }
  
  .grid-content {
    min-height: 30px;
    padding-top: 10px;
    text-align: left;
    padding-left: 10px;
  }
  
  .avatar-uploader .el-upload {
    border: 1px dashed #a69fe2;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  .el-icon-plus avatar-uploader-icon {
    border-style: solid;
    border-color: #a69fe2;
    border-width: 1px;
  }
  </style>
  