<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login  from './components/Login'
import Index  from './components/Index'
  
export default {
  name: 'App',
  components:{
    Login,
    Index,
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:start;
  color: #2c3e50; 
  margin-top: 0px;
  margin-bottom: 5px;
  width:100%;
  height: 99%;
} 
#html{
  margin:0px;
}
#body{
 margin-top: 0px;
margin-bottom: 0px;
}
.el-main{
  padding: 5px;
}

/**用于  Organize  中  tree  */
.DEP{ 
  list-style: none;
   background-image: url('assets/Tree-dep.png');
   background-size:contain;
   background-repeat: no-repeat;
  padding-left: 20px;
  font-style: normal;
  font-size: 14px;
}
/**用于  Organize  中  tree  */
.JOB{
   list-style: none;
   background-image: url('assets/Tree-job.png');
   background-size:contain;
   background-repeat: no-repeat;
  padding-left: 20px;
  font-style: normal;
  font-size: 14px;
}

.COM{
 list-style: none;
   background-image: url('assets/Tree-com.png');
   background-size:contain;
   background-repeat: no-repeat;
  padding-left: 20px;
  font-style: normal;
  font-size: 14px;
}

</style>
