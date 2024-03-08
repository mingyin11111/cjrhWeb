<template>
  <div  >
    <h1>{{ msg }}</h1>
    <el-button type="success" v-on:click="say2('hi')">成功按钮{{counter}}</el-button>
     
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Student',
  data () {
    return {
      msg: 'Studentssssssssssssssssssssssssssssssssssss',
      counter:0
    }
  },
   methods: {



    say: function () {
      
      this.counter += 1;
      axios.get('/api/WebInterface/GetNames.ashx')
      .then(response => {
        if(response.data=='ReLogin')
        {
            
        }
        else{

        }
        this.msg = response.data
        })
      .catch(function (error) { // 请求失败处理
        console.log(error);
        this.msg = error
      });
    },
    say2: function () {
 var qs = require("qs");

 axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
 axios({
        method: "post",
        url: "/api2/tcb/databaseadd?access_token=49_qu5hZbjTBOpi-iJFLqz9UtHWqTfBQvyqODGLN1KGK4WbZaIcG5e99sEsY-DNt5rZ6EhA0gVm79XWcO8Y7gE2Efp3VmchE6mUHTzDHvm7KswQj82vsufukWb62fsJU_AwukT3nHIC_HqC6WUqYNEgAIAGVM",
        data: {
          env: "gz8628-3g5ut0f61a205e40",
          "query": "db.collection(\"geo\").add({data: [{path:'000'}]})"
        }
      })
        .then(res => {
          this.loading=false;
          if (res.data == "Login ERR") {
            this.$message.error("登录失败，请重试！");
          } else {
            //this.ModuleListData =  res.data  ;
            this.ModuleListData = eval(res.data);
          }
        })
        .catch(error => {
          this.$message.error(error);
          console.log(error);
        });
 
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
