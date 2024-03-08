<template>
    <el-container>
        <el-main>
            <el-page-header @back="goBack" content="详情页面"></el-page-header>
            <el-row>
                <el-col :span="4"> <div>&nbsp;</div> </el-col>
                <el-col :span="16">
                    <div style="width: 100%; text-align: center;">
                        <h3> {{ PublishInformationModule.NeedName }}</h3>
                    </div>
                </el-col>
                <el-col :span="4"><div>&nbsp;</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"> <div>&nbsp;</div> </el-col>
                <el-col :span="16">
                    <el-carousel :interval="5000" arrow="always" height="500px" style="border-width: 1px;border-style: solid;border-color: #b3c0d1;" >
                        <el-carousel-item v-for="item in PublishInformationModule.Attachment.split('|')" :key="item">
                            <el-image    style="width: 100%; height: 100%"      :src="item.split('*')[0]"       fit="contain"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
                <el-col :span="4"><div>&nbsp;</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"> <div>&nbsp;</div> </el-col>
                <el-col :span="16">
                    <div style="width: 100%; text-align: left;">
                        <h4>任务需求： </h4>
                        <h5>项目预算金额: {{ neeed.Budget }}万元</h5>
                        <h5>项目预算金额 {{ PublishInformationModule.WinningName }}</h5>
                    </div> 
                    <div  style="width: 100%; text-align:center;">
                        <el-button type="primary" size="mini" @click="To_Edit">编辑</el-button>
                    </div>
                </el-col>
                <el-col :span="4"><div>&nbsp;</div></el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
  
<script>
export default {
    name: "InformationPublish",
    data() {
        return {
            informationID:0,
            imageList: [],
            PublishInformationModule:{},
            neeed:{}
        }
    },
    mounted() {
        this.informationID=this.$route.query.informationID;

        this.GetPublishInformationDetail(this.informationID);
    },
    methods: {
        goBack()
        {
            this.$router.push({path:'/Manager/InformationPublish/InformationPublish'})
        },
        GetPublishInformationDetail(ID ) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/informationPublish/"+ID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.PublishInformationModule = res.data.data;
                        this.GetNeedDetail(this.PublishInformationModule.NeedID)
                        this.loading = false;
                    }
                    else {
                        this.$message.error("错误：" + res.data.err);
                    }
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },

        GetNeedDetail(ID ) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/need/"+ID,
                data: qs.stringify({
                }),
            })
            .then((res) => {
                if (res.data.err == 0) {
                    this.neeed = res.data.data;
                    this.loading = false;
                }
                else {
                    this.$message.error("错误：" + res.data.err);
                }
            })
            .catch((error) => {
                this.$message.error("出错！" + error);
                console.log(error);
                this.loading = false;
            });
        },

         
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
    display: inline-table;
}

.el-icon-plus avatar-uploader-icon {
    border-style: solid;
    border-color: #a69fe2;
    border-width: 1px;
}
</style>
  