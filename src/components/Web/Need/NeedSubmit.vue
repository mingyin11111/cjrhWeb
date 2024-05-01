<template>
    <el-container>
        <el-main v-loading="loading">
            <span style="font-size: 14px;margin-top: 5px;display: inline-block;"><span @click="ToMyNeedList"
                    style="cursor: pointer;"> 我的需求</span> &gt; 需求详情&nbsp;&nbsp;|&nbsp;{{
                        NeedModel.Title }}</span>
            <el-card class="box-card" style="margin-top: 13px;">

                <el-row>
                    <el-col :span="24">
                        <div style="width: 100%; text-align: left;font-size: 18px;padding: 10px 10px;">
                            {{ NeedModel.Title }}
                        </div>
                        <div style="width:100%;display: inline-block;align-content: center;">
                            <el-steps :active="NeedModel.StepNumber">
                                <el-step title="发布需求" description="2024-01-22"></el-step>
                                <el-step title="报名投标" description=" "></el-step>
                                <el-step title="中标公示" description=" "></el-step>
                                <el-step title="项目执行" description=" "></el-step>
                                <el-step title="验收交付" description=" "></el-step>
                            </el-steps>
                            <table style="width:99%;margin:auto;margin-top: 20px; ">
                                <tr>
                                    <td style="color: rgb(129, 128, 128); width: 100px; word-break: break-all; ">需求描述
                                    </td>
                                    <td style="padding: 10px; word-break: break-all;">{{ NeedModel.Memo }}</td>
                                </tr>
                                <tr>
                                    <td style="color: rgb(129, 128, 128);  ">项目预算</td>
                                    <td style="padding: 10px;">{{ NeedModel.Budget }}</td>
                                </tr>
                                <tr>
                                    <td style="color: rgb(129, 128, 128);  ">项目周期</td>
                                    <td style="padding: 10px;">{{ NeedModel.Period }}</td>
                                </tr>
                                <tr>
                                    <td style="color: rgb(129, 128, 128);  ">附件</td>
                                    <td style="padding: 10px;">
                                        <ul style="list-style: none;margin: 0px;padding-left: 0px;">
                                            <li v-for="item in NeedModel.Attachment.split('|')"
                                                @click="DownLoadSubmitFile(item.split('*')[0])"
                                                style="cursor: pointer;color: cornflowerblue;padding-bottom: 5px;">
                                                {{ item.split('*')[1] }}
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                            </table>
                        </div>
                    </el-col>
                </el-row>

            </el-card>
            <el-card class="box-card" style="margin-top: 13px;margin-bottom: 13px;" v-if="NeedModel.StepNumber > 0">
                <el-row>
                    <el-col :span="24">
                        <div>
                            <span style="font-size: 16px;font-weight: bold;">投标方</span>
                        </div>
                        <div style="width: 100%; text-align: center; padding-top: 20px; border-bottom-width: 1px;  border-bottom-color: black;  border-bottom-style: solid;"
                            v-for="item in SubmitList">
                            <table style="width: 100%;">
                                <tr>
                                    <td valign="middle" style="width: 50px;height: 50px;">Logo</td>
                                    <td align="left">{{ item.SubmitUnitName }}
                                        <div v-if="item.id == NeedModel.WinningID"
                                            style="float: right;margin: 9px 5px; display: inline-block;width: 70px; text-align: center;padding: 3px;  color: #ff74ab;border-width: 1px;border-style: solid;border-color: #ff74ab;background-color: #ffd0e3;border-radius: 5px;">
                                            中标方
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="width: 50px; "> </td>
                                    <td align="left">项目报价：￥{{ item.Prise }}万 </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="width: 50px; "> </td>
                                    <td align="left">
                                        <div style="display: inline-block;float: inline-start;">投标附件:</div>
                                        <div style="display: inline-block;margin-left: 5px;">
                                            <div v-for="atta in item.AttachmentSubmit.split('|')"
                                                @click="DownLoadSubmitFile(atta.split('*')[0])"
                                                style="cursor: pointer;color: cornflowerblue;padding-bottom: 5px;">
                                                {{ atta.split('*')[1] }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div style="width: 100%; text-align: center; padding-top: 20px;">
                            <span style="display: inline-block; width: 100%; text-align: center;"
                                v-if="NeedModel.StepNumber == 1 && NeedModel.MemberID != $store.state.MemberID">
                                <el-button type="primary" style="width: 40%;"
                                    @click="editerdialogVisible = true">投标</el-button>
                            </span>
                            <span style="display: inline-block; width: 100%; text-align: center;"
                                v-if="NeedModel.StepNumber == 1 && NeedModel.MemberID == $store.state.MemberID">
                                <el-button type="primary" style="width: 40%;"
                                    @click="SelectWinnerdialogVisible = true">确定中标方</el-button>
                            </span>
                        </div>
                    </el-col>
                </el-row>

            </el-card>

            <el-card class="box-card" style="margin-top: 13px;margin-bottom: 13px;" v-if="NeedModel.StepNumber > 1">
                <el-row>
                    <el-col :span="24">
                        <div>
                            <span style="font-size: 16px;font-weight: bold;">其他附件</span>
                        </div>

                        <table style="width: 100%;margin-top: 15px;">
                            <tr>
                                <td valign="middle" style="width: 50px; "> </td>
                                <td align="left">
                                    <div style="display: inline-block;float: inline-start;">投标附件:</div>
                                    <div style="display: inline-block;margin-left: 5px;">
                                        <div v-for="atta in NeedModel.AttaWinningNotice.split('|')"
                                            @click="DownLoadSubmitFile(atta.split('*')[0])"
                                            style="cursor: pointer;color: cornflowerblue;padding-bottom: 5px;">
                                            {{ atta.split('*')[1] }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td valign="middle" style="width: 50px; "> </td>
                                <td align="left">
                                    <div style="display: inline-block;float: inline-start;">验收材料:</div>
                                    <div style="display: inline-block;margin-left: 5px;">
                                        <div v-for="atta in NeedModel.AttaAccept.split('|')"
                                            @click="DownLoadSubmitFile(atta.split('*')[0])"
                                            style="cursor: pointer;color: cornflowerblue;padding-bottom: 5px;">
                                            {{ atta.split('*')[1] }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div style="width: 100%; text-align: center; padding-top: 20px;">
                            <span style="display: inline-block; width: 100%; text-align: center;"
                                v-if="NeedModel.StepNumber == 2 && NeedModel.MemberID == $store.state.MemberID">
                                <el-button type="primary" style="width: 40%;"
                                    @click="AttaAcceptdialogVisible = true">上传验收资料</el-button>
                            </span>
                        </div>
                        <div v-if="NeedModel.WinningID == $store.state.MemberID && (NeedModel.AttaAccept + '') != 'undefined'"
                            style="text-align: center; width: 100%; color: red;">
                            <span v-if="NeedModel.StepNumber == 3"> 验收资料已上传成功，请等待验收。</span>
                            <span v-if="NeedModel.StepNumber == 4"> 已验收完成</span>
                        </div>

                        <div v-if="NeedModel.MemberID == $store.state.MemberID && (NeedModel.AttaAccept + '') != 'undefined' && NeedModel.StepNumber == 3"
                            style="text-align: center; width: 100%;  ">
                            <el-button type="primary" style="width: 40%;"
                                @click="ConfirmAcceptApprove">确定验收通过</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>

        </el-main>
        <el-dialog :title="SelectWinnerdialogTitle" :visible.sync="SelectWinnerdialogVisible" width="600px">
            <el-form :model="module" :rules="rules" ref="module" label-width="100px" class="demo-ruleForm">
                <el-form-item label="请选择中标方" prop="Prise">
                    <el-select v-model="Win_SubmitID" placeholder="请选择">
                        <el-option v-for="item in SubmitList" :key="item.id" :label="item.SubmitUnitName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="中标结果通知" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="true"
                        :file-list="fileList_ZhongBiaoTongZhi" :on-success="UpLoadSuccess_ZhongBiaoTongZhi"
                        :on-remove="deleteFileitem_ZhongBiaoTongZhi" :headers="{ 'token': tokenValue }">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editerdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doCheck_ZhongBiaoTongZhi('module')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="editerdialogTitle" :visible.sync="editerdialogVisible" width="600px">
            <el-form :model="module" :rules="rules" ref="module" label-width="100px" class="demo-ruleForm">
                <el-form-item label="项目报价" prop="Prise">
                    <el-input-number v-model="module.Prise" controls-position="right" :controls="false" :min="1"
                        :max="999999999"></el-input-number>
                </el-form-item>

                <el-form-item label=" " :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="true"
                        :file-list="fileList" :on-success="UpLoadSuccess" :on-remove="deleteFileitem"
                        :headers="{ 'token': tokenValue }">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editerdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doCheck('module')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="上传验收资料" :visible.sync="AttaAcceptdialogVisible" width="600px">
            <el-form :model="module" :rules="rules" ref="module" label-width="100px" class="demo-ruleForm">
                <el-form-item label=" " :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" action="/api/upload/fileupload" :show-file-list="true"
                        :file-list="fileList_AttaAccept" :on-success="UpLoadSuccess_AttaAccept"
                        :on-remove="deleteFileitem_AttaAccept" :headers="{ 'token': tokenValue }">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editerdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doCheck_AttaAccept('module')">确 定</el-button>
            </div>
        </el-dialog>


    </el-container>
</template>

<script>
export default {
    name: "NeedDetail",
    data() {
        return {
            tokenValue: '',
            Win_SubmitID: 0,
            SelectWinnerdialogTitle: '确定中标方',
            SelectWinnerdialogVisible: false,
            AttaAcceptdialogVisible: false,
            fileList: [],
            fileList_ZhongBiaoTongZhi: [],
            fileList_AttaAccept: [],
            currentFileItem: '',
            formLabelWidth: "120px",
            loading: false,
            editerdialogVisible: false,
            editerdialogTitle: '投标',
            NeedID: 0,
            AttachList: [],
            SubmitList: [],
            NeedModel: {},
            module: { Prise: '' },
            rules: {
                Reason: [
                    { required: true, message: '请输入报价', trigger: 'change' }
                ],

            }
        }
    },
    mounted() {
        this.tokenValue = localStorage.getItem('Token');
        this.NeedID = this.$route.query.id;
        this.GetAttachList(1);
        this.GetSubmitList(1);
        this.GetNeedDetail(this.NeedID);
    },
    methods: {
        ConfirmAcceptApprove() {
            var qs = require("qs");
            this.$confirm("确定通过验收吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.$axios({
                    method: "PATCH",
                    url: "/api/need/" + this.NeedID,
                    data: qs.stringify({
                        StepNumber: 4,
                        State: '验收交付',

                    }),
                })
                    .then((response) => {
                        if (response.data.err == 0) {
                            this.$message({ type: 'success ', message: '操作完成' });

                            this.GetNeedDetail(this.NeedID);
                        } else {
                            this.$message.error('错误：' + response.data.err);
                        }

                    })
                    .catch((error) => {
                        this.$message({ type: "info", message: error });
                    });


            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "操作已取消",
                    });
                });
        },

        GetSubmitList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/needSubmit?page=1&pageSize=9000&NeedID=" + this.NeedID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.SubmitList = res.data.data.rows;
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
        doCheck_ZhongBiaoTongZhi(formName) {

            var qs = require("qs");
            let AttachmentSubmit = "";
            for (var i = 0; i < this.fileList_ZhongBiaoTongZhi.length; i++) {
                AttachmentSubmit += this.fileList_ZhongBiaoTongZhi[i]
                if (i < this.fileList_ZhongBiaoTongZhi.length - 1) {
                    AttachmentSubmit += "|"
                }
            }
            if ("" == AttachmentSubmit) {
                this.$message.error('请上传中标通知书');
                return;
            }
            if (this.Win_SubmitID == 0) {
                this.$message.error('请选择一个中标单位');
                return;
            }

            var WinningOrganize = "";
            for (var i = 0; i < this.SubmitList.length; i++) {
                if (this.Win_SubmitID == this.SubmitList[i].id) {
                    WinningOrganize = this.SubmitList[i].SubmitUnitName;
                }
            }

            this.$axios({
                method: "PATCH",
                url: "/api/need/" + this.NeedID,
                data: qs.stringify({
                    WinningOrganize: WinningOrganize,
                    WinningID: this.Win_SubmitID,
                    StepNumber: 2,
                    State: '中标公示',
                    AttaWinningNotice: AttachmentSubmit
                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                        this.$message({ type: 'success ', message: '操作完成' });
                        this.SelectWinnerdialogVisible = false
                        this.GetNeedDetail(this.NeedID);
                    } else {
                        this.$message.error('错误：' + response.data.err);
                    }

                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                });

        },
        doCheck_AttaAccept(formName) {

            var qs = require("qs");
            let AttachmentSubmit = "";
            for (var i = 0; i < this.fileList_AttaAccept.length; i++) {
                AttachmentSubmit += this.fileList_AttaAccept[i]
                if (i < this.fileList_AttaAccept.length - 1) {
                    AttachmentSubmit += "|"
                }
            }
            if ("" == AttachmentSubmit) {
                this.$message.error('请上传验收资料');
                return;
            }

            this.$axios({
                method: "PATCH",
                url: "/api/need/" + this.NeedID,
                data: qs.stringify({
                    AttaAccept: AttachmentSubmit,
                    StepNumber: 3,
                    State: '项目执行',

                }),
            })
                .then((response) => {
                    if (response.data.err == 0) {
                        this.$message({ type: 'success ', message: '操作完成' });
                        this.AttaAcceptdialogVisible = false
                        this.GetNeedDetail(this.NeedID);
                    } else {
                        this.$message.error('错误：' + response.data.err);
                    }

                })
                .catch((error) => {
                    this.$message({ type: "info", message: error });
                });

        },
        doCheck(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var qs = require("qs");
                    let AttachmentSubmit = "";
                    for (var i = 0; i < this.fileList.length; i++) {
                        AttachmentSubmit += this.fileList[i]
                        if (i < this.fileList.length - 1) {
                            AttachmentSubmit += "|"
                        }
                    }
                    this.$axios({
                        method: "POST",
                        url: "/api/needSubmit",
                        data: qs.stringify({
                            NeedID: this.NeedID,
                            MemberID: this.$store.state.MemberID,
                            Prise: this.module.Prise,
                            SubmitUnitName: this.$store.state.UnitName,
                            AttachmentSubmit: AttachmentSubmit
                        }),
                    })
                        .then((response) => {
                            if (response.data.err == 0) {
                                this.$message({ type: 'success ', message: '操作完成' });
                                this.editerdialogVisible = false
                                this.GetSubmitList(1)
                            } else {
                                this.$message.error('错误：' + response.data.err);
                            }

                        })
                        .catch((error) => {
                            this.$message({ type: "info", message: error });
                        });
                } else {
                    return false;
                }
            });
        },
        deleteFileitem(item, list) {
            let currentfile = "/api/files/" + item.response.data;
            for (var i = 0; i < this.fileList.length; i++) {
                if (currentfile == this.fileList[i]) {
                    this.fileList.splice(i, 1);
                }
            }
        },
        deleteFileitem_ZhongBiaoTongZhi(item, list) {
            let currentfile = "/api/files/" + item.response.data;
            for (var i = 0; i < this.fileList_ZhongBiaoTongZhi.length; i++) {
                if (currentfile == this.fileList_ZhongBiaoTongZhi[i]) {
                    this.fileList_ZhongBiaoTongZhi.splice(i, 1);
                }
            }
        },
        deleteFileitem_AttaAccept(item, list) {
            let currentfile = "/api/files/" + item.response.data;
            for (var i = 0; i < this.fileList_AttaAccept.length; i++) {
                if (currentfile == this.fileList_AttaAccept[i]) {
                    this.fileList_AttaAccept.splice(i, 1);
                }
            }
        },
        UpLoadSuccess_AttaAccept(data) {
            if (data.err > 0) {
                this.$message.error(data.errMsg);
            }
            else {
                this.fileList_AttaAccept.push("/api/files/" + data.data);
            }
        },
        UpLoadSuccess(data) {
            if (data.err > 0) {
                this.$message.error(data.errMsg);
            }
            else {
                this.fileList.push("/api/files/" + data.data);
            }
        },
        UpLoadSuccess_ZhongBiaoTongZhi(data) {
            if (data.err > 0) {
                this.$message.error(data.errMsg);
            }
            else {
                this.fileList_ZhongBiaoTongZhi.push("/api/files/" + data.data);
            }
        },

        MouseMove(item) {
            this.currentFileItem = item;
        },
        ToEdit() {
            this.$router.push({ path: '/Web/MyCenter/EditMyNeed', query: { id: this.NeedID } })
        },
        ToMyNeedList() {
            this.$router.push({ path: '/Web/MyCenter/MyCenter' })
        },
        DownLoadFile(item) {
            var qs = require("qs");
            this.$axios({
                method: "get",
                responseType: 'blob',
                url: "/api/upload/export?filename=" + item.AttachMentPath.replace("/api/files/", ""),
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    this.downloadFile(res)
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        DownLoadSubmitFile(item) {
            var qs = require("qs");
            this.$axios({
                method: "get",
                responseType: 'blob',
                url: "/api/upload/export?filename=" + item.replace("/api/files/", ""),
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    this.downloadFile(res)
                })
                .catch((error) => {
                    this.$message.error("出错！" + error);
                    console.log(error);
                    this.loading = false;
                });
        },
        downloadFile(res) {
            if (!res) {
                return;
            }
            const fileName = res.headers["content-disposition"].split("=")[1];
            const blob = new Blob([res.data], {
                type: 'application/zip'
            });
            const url = window.URL.createObjectURL(blob);
            const aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;
            aLink.setAttribute("download", decodeURI(fileName));
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
            window.URL.revokeObjectURL(url);
        },
        GetAttachList(pageNumber) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/systemAttachment?page=1&pageSize=9000&RelationModuleName=t_need&RelationKey=" + this.NeedID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.AttachList = res.data.data.rows;
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

        ToUnApprove() {
            this.editerdialogVisible = true;

        },
        ToApprove() {
            this.$confirm("该需求确定要审核通过吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            }).then(() => {
                this.doApprove();
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "操作已取消",
                    });
                });
        },
        doApprove() {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "PATCH",
                url: "/api/need/" + this.NeedID,
                data: qs.stringify({
                    State: '审核通过'
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.$router.push({ path: '/Manager/NeedManager/NeedList' })
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
        goBack() {
            this.$router.push({ path: '/Manager/NeedManager/NeedList' })
        },
        GetNeedDetail(ID) {
            this.loading = true;
            var qs = require("qs");
            this.$axios({
                method: "get",
                url: "/api/need/" + ID,
                data: qs.stringify({
                }),
            })
                .then((res) => {
                    if (res.data.err == 0) {
                        this.NeedModel = res.data.data;
                        this.NeedModel.AttaWinningNotice += "";
                        this.NeedModel.AttaAccept += "";
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
table {
    border-collapse: collapse;
}

table,
table tr td {
    border: 1px solid #ccc;
}

table tr td {
    padding: 5px 10px;
}
</style>