<template>
    <el-container>
        <el-main>
           
            <el-row>
                <el-col :span="24">
                     <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 30px; padding-top: 10px;">
                        <el-breadcrumb-item :to="{ path: '/Web/Need/NeedList' }">需求大厅</el-breadcrumb-item>
                        <el-breadcrumb-item>发布需求</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
                <el-card class="box-card" style="margin-top: 30px;margin-bottom: 10px;" v-loading="loading">
                    <el-form :model="module" :rules="rules" ref="module" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="需求类型" prop="Type">
                                    <el-select v-model="module.Type" placeholder="请选择" style="width: 100%;">
                                        <el-option key="课程开发" label="课程开发" value="课程开发"></el-option>
                                        <el-option key="虚拟仿真" label="虚拟仿真" value="虚拟仿真"></el-option>
                                        <el-option key="微课制作" label="微课制作" value="微课制作"></el-option>
                                        <el-option key="教师教学能力大赛" label="教师教学能力大赛" value="教师教学能力大赛"></el-option>
                                        <el-option key="实训室建设" label="实训室建设" value="实训室建设"></el-option>
                                        <el-option key="智能硬件" label="智能硬件" value="智能硬件"></el-option>
                                        <el-option key="其他" label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="需求标题" prop="Title">
                                    <el-input v-model="module.Title"></el-input>
                                </el-form-item>
                                <el-form-item label="需求描述" prop="Memo">
                                    <el-input
                                        type="textarea"
                                        :rows="12"
                                        placeholder="请输入内容"
                                        v-model="module.Memo">
                                        </el-input>
                                </el-form-item>
                                <el-form-item label="项目预算" prop="Budget">
                                    <el-input   v-model="module.Budget" type=""></el-input>
                                </el-form-item>
                                <el-form-item label="项目周期" prop="Period">
                                    <el-input   v-model="module.Period" type=""></el-input>
                                </el-form-item>
                                <el-row :gutter="10" >
                                        <el-col :span="5" v-for="(item,index) in fileList" :key="index">
                                            <div style="width: 100%; overflow: hidden" v-on:mousemove="MouseMove(item)">
                                                <table  style="width: 100%; margin-top: 5px;  border-style:solid; border-width: thin; height: 110px;  z-index: 90; position: relative;">
                                                    <tr>
                                                        <td align="center" style="line-height: normal;">
                                                            <el-image style="width: 70px; height: 70px" :src="item.split('*')[0]" fit="scale-down"></el-image>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr >
                                                        <td style="height:35px;overflow: hidden;">
                                                            <div v-show="currentFileItem==item" style="height:35px;overflow: hidden;">
                                                                <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                                                                    <el-button type="danger" icon="el-icon-delete" size="mini" alt="删除" @click="deletePic(item)" circle></el-button>
                                                                </el-tooltip>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </el-col>
                                    </el-row>
                                <el-form-item label=" 招标附件"  >
                                    <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="true"
                                        :file-list="fileList_AttaAccept" :on-success="UpLoadSuccess_AttaAccept"
                                        :on-remove="deleteFileitem_AttaAccept">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-form>
                            <span style="display: inline-block; width: 100%; text-align: center;"><el-button type="danger" @click="checkPublish('module')" style="width: 40%;">发布</el-button></span>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>
  
<script>
import VueRouter from 'vue-router';

export default {
    name: "Publish",
    data() {
        return {
            module: { id: 0, Title: "", Type: "", Memo: "", Budget:0, Period: "", MemberID: "", State: "", WinningID: "", CreatTime: "", ApproveTime: ''  },
            fileList:[],
            fileList_AttaAccept: [],
            currentFileItem:'',
            loading:false,
             
            rules: {
                Title: [
                    { required: true, message: '请输入活需求标题', trigger: 'blur' },
                    { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
                ],
                Type: [
                    { required: true, message: '请选择需求类型', trigger: 'change' }
                ],
                Memo: [
                    { required: true, message: '请输需求描述信息', trigger: 'blur' },
                ],
                 
            }

        };
    },
    created() {
          
    },
    mounted() {
      //  this.GetList(1);
    },
    methods: {
        deleteFileitem_AttaAccept(item, list) {
            let currentfile = "/api/files/" + item.response.data;
            for (var i = 0; i < this.fileList_AttaAccept.length; i++) {
                if (currentfile == this.fileList_AttaAccept[i]) {
                    this.fileList_AttaAccept.splice(i, 1);
                }
            }
        },
        UpLoadSuccess_AttaAccept(data) {
            this.fileList_AttaAccept.push("/api/files/" + data.data);
        },
        checkPublish(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this. doAdd();
                } else {
                    return false;
                }
            });
        },
// module: { id: 0, Title: "", Type: "", Memo: "", Budget: 0, Period: "", MemberID: "", State: "", WinningID: "", CreatTime: "", ApproveTime: ''  },
        doAdd() {
            this.loading = true;
            var qs = require("qs");
            var da= Date.now();

            let AttachmentSubmit = "";
            for (var i = 0; i < this.fileList_AttaAccept.length; i++) {
                AttachmentSubmit += this.fileList_AttaAccept[i]
                if (i < this.fileList_AttaAccept.length - 1) {
                    AttachmentSubmit += "|"
                }
            }

            this.$axios({
                method: "post",
                url: "/api/need",
                data: qs.stringify({
                    Title: this.module.Title,
                    Type: this.module.Type,
                    Memo: this.module.Memo,
                    Budget: this.module.Budget,
                    Period: this.module.Period,
                    Attachment:AttachmentSubmit,
                    MemberID:this.$store.state.MemberID,
                    MemberOrganize:this.$store.state.UnitName,
                    State:'待审核',
                    StepNumber:0
                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                        this.$router.push({ path: '/Web/MyCenter/MyCenter' })
                    } else {
                        this.loading = false;
                        this.$message({
                            type: "info",
                            message: "添加失败，请重试" + response.data.err,
                        });
                    }
                    this.editerdialogVisible = false;
                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                });
                this.loading = false;

        },
        UpLoadSuccess(data) {
           this.fileList.push("/api/files/" + data.data);
        },
        MouseMove(item)
        {
            this.currentFileItem=item;
        },
        deletePic(item)
        {
            for(var i=0;i<this.fileList.length;i++)
            {
                if(item==this.fileList[i])
                {
                    this.fileList.splice(i,1);
                }
            }
        },
    },
    components: { VueRouter }
};
</script>
<style scoped> 
 ul li {
    float: left;
    list-style: none;
 }
 
</style>
  