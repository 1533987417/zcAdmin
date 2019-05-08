<template>
  <div>
    <v-tab></v-tab>
    <v-search searchName="查询课程">
      <template>
       <el-form label-width="100px" label-position="right" :inline="true" :model="serachForm">
        <el-form-item label="老师名称：">
          <el-input v-model="serachForm.TeacherName" placeholder="请输入名字" 
          class="input-small"></el-input>
        </el-form-item>
        <el-form-item label="课程名称：">
          <el-input v-model="serachForm.CollageName" placeholder="请输入名字课程名称"
          class="input-small"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="serachForm.status" placeholder="请选择" class="input-small">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型：">
       <el-select v-model="serachForm.CategoryId" placeholder="请选择" class="input-small">
        <el-option 
        v-for="item in CategoryOptions"
        :key="item.Id"
        :label="item.CategoryName"
        :value="item.Id">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="">
    <el-button type="primary" @click="search">查询</el-button>
  </el-form-item>
</el-form>
</template>
</v-search>

<!-- table组件 -->
<v-table title="课程列表" :totalRecords="totalCount" ref="table" @pageChange="pageChange">
  <template slot="btn">
   <el-button type="primary" size="small" @click="addDialog">新增</el-button>
 </template>
 <el-table :data="tableData" border  style="width: 100%">
  <el-table-column align="center" type="index" label="序号" width="60"> </el-table-column>
  <el-table-column align="center" prop="Title" label="课程标题" width="220"></el-table-column>
  <el-table-column align="center" prop="CollagePrice" label="课程价格/元" width="100">
    <template slot-scope="props">{{props.row.CollagePrice/100}}</template>
  </el-table-column>
  <el-table-column align="center" prop="Description" label="课程描述" width="330">
  </el-table-column>
  <el-table-column align="center" prop="Description" label="课程图片" width="180">
    <template slot-scope="props">
      <div class="contain-imgs">
        <img :src="props.row.SmallImageUrl" alt="">
      </div>
    </template>
  </el-table-column>
  <el-table-column align="center" prop="Status" label="状态" width="50">
    <template slot-scope="props">{{props.row.Status==1?"启用":"无效"}}</template>
  </el-table-column>
  <el-table-column align="center" prop="Description" label="创建时间" width="180">
    <template slot-scope="props">
     {{new Date(props.row.CreateTime).ljyFormat("yyyy-MM-dd HH:mm")}}
   </template>
 </el-table-column>
              <!-- <el-table-column align="center" prop="address" label="地址">
              </el-table-column> -->
              <el-table-column align="center" label="操作">
                <template slot-scope="props">
                  <el-button type="text" size="small" @click="upDateDialog(props.row)">修改</el-button>
                  <el-button type="text" size="small" @click="removeItem(props.row)">移除</el-button>
                  <el-button type="text" size="small" @click="detailInfo(props.row)">查看课节</el-button>
                </template>
              </el-table-column>
            </el-table>
          </v-table>

          <el-dialog :title="isAdd ? '新增课程':'修改课程'" :visible.sync="isDialogVisible" 
          :close-on-click-modal="false"
          @close="dialogCloseCall"
          @open="dialogOpenCall">
          <el-form label-width="100px" label-position="right" 
          :inline="true"
          :model="form"
          ref="form"
          :rules="rules">
          <el-form-item label="课程标题：" prop="Title">
            <el-input v-model="form.Title" placeholder="请输入课程标题" 
            class="input-small">
          </el-input>
        </el-form-item>
        <el-form-item label="选择老师：" prop="TeacherId"> 
         <!-- filterable  -->
         <el-select v-model="form.TeacherId" filterable placeholder="请选择老师" 
         class="input-small">
         <el-option 
         v-for="item in teacherOptions"
         :key="item.Id"
         :label="item.Name"
         :value="item.Id">
       </el-option>
     </el-select>
   </el-form-item>
   <br/>
   <el-form-item label="课程描述：" prop="Description"> 
     <el-input style="width:220%"
     type="textarea"
     size="medium" 
     :rows="4"
     placeholder="请输入课程描述"
     v-model="form.Description">
   </el-input>   
 </el-form-item>
 <br/>
 <el-form-item label="课程价/元：" prop="CollagePrice"> 
   <el-input v-model="form.CollagePrice" placeholder="请输入课程价格" 
   class="input-small">
 </el-input>
</el-form-item>
<el-form-item label="销售价/元：" prop="SalePrice"> 
 <el-input v-model="form.SalePrice" placeholder="请输入销售价格" 
 class="input-small">
</el-input>
</el-form-item>
<el-form-item label="上传图片：" prop="SmallImageUrl">
  <el-input v-model="form.SmallImageUrl" placeholder="请输入或选择图片"
  class="input-small">
</el-input>
<el-button type="primary" class="e-btn" size="small" 
@click="upLoadImg">选择图片</el-button>
</el-form-item>

<el-form-item label="排序：" prop="Sort">
  <el-input v-model="form.Sort" placeholder="请输入序号"
  class="input-small">
</el-input>
</el-form-item>
<br/>
<el-form-item label="是否有效：">
  <el-radio v-model="form.Status" label="1">是</el-radio>
  <el-radio v-model="form.Status" label="0">否</el-radio>
</el-form-item>
<el-form-item label="是否VIP：">
  <el-radio v-model="form.IsFreeForVip" label="1">是</el-radio>
  <el-radio v-model="form.IsFreeForVip" label="0">否</el-radio>
</el-form-item>
<br/>
<el-form-item label="课程等级：" prop="Level">
  <el-select v-model="form.Level" placeholder="请选择" class="input-small">
    <el-option 
    v-for="item in videOptions"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item> 
<el-form-item label="总课节数：" prop="ClassCount"> 
  <el-input v-model="form.ClassCount" placeholder="请输入总课节数" 
  class="input-small">
</el-input>
</el-form-item>
<el-form-item label="课程类别：" prop="CategoryId"> 
 <!-- CategoryId -->
 <el-select v-model="form.CategoryId" placeholder="请选择" class="input-small">
  <el-option 
  v-for="item in CategoryOptions"
  :key="item.Id"
  :label="item.CategoryName"
  :value="item.Id">
</el-option>
</el-select>
</el-form-item>
<el-form-item label="人气值：" prop="ViewCount"> 
 <el-input v-model="form.ViewCount" placeholder="请输入人气值" 
 class="input-small">
</el-input>
</el-form-item>
<!-- videOptions -->
<el-form-item label="课程类型：" prop="CollageType"> 
  <el-select v-model="form.CollageType" placeholder="请选择" class="input-small">
    <el-option 
    v-for="item in mediaTypes"
    :key="item.value"
    :label="item.label"
    :value="item.value">
  </el-option>
</el-select>
</el-form-item>
<el-form-item label="推荐精品：">
  <el-radio v-model="form.IsExcellentCollage" label="1">是</el-radio>
  <el-radio v-model="form.IsExcellentCollage" label="0">否</el-radio>
</el-form-item>
<br/>
<!-- prop="CollageContent" -->
<el-form-item label="课程详情：" > 
  <div id="toolbar"></div>
  <div id="mainarea"></div>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer dialog-footer-1">
  <el-button @click="isDialogVisible = false" class="e-btn">取消</el-button>
  <el-button type="primary" class="e-btn" @click="save">确定</el-button>
</div>
</el-dialog>  
</div>
</template>

<script>
import helper from "@helper"
import http from "@http"
import api from "@api"
import config from "@config"

var E = require('wangeditor')
let editor

let generateEditor = (cb)=>{
  let timer = setTimeout(function(){
    editor = new E('#toolbar',"#mainarea")
        // 配置服务器端地址
        editor.customConfig.uploadImgServer = config.apiurl+config.api.upload
        editor.customConfig.customUploadImg = function (files, insert) {  
          helper.fileToBase64(files[0],(data)=>{
            http.httpPost(config.api.upload,{
              fileContent:data
            }).then(res=>{
              if(res.Code == 200){
                helper.message("上传成功","success")
                insert(res.fileUrl)
              } else{
                helper.message("请重新上传图片","warning")
              }
            }) 
          })
        }
        editor.customConfig.customAlert = function (info) {
          // info 是需要提示的内容
          helper.message(info,"error")
        }
        editor.create()
        clearTimeout(timer)
      },0)
}

const SAVE_URL = "/api/v1/manager/collage/AddCollage"
const UPDATE_URL = "/api/v1/manager/collage/UpdateCollage"
export default {
  data() {
    function selectValidator(rule, value, callback) {
      if(!value) callback(rule.message);
      else callback();
    }
    function notVaild(rule, value, callback){
      let reg = /^[0-9]*$/ 
      let val = value.toString() 
      if(val.trim() === "") callback("选项不能为空")
        else if(!reg.test(value)) callback("请输入数字")
          else callback()
        }
      return {
        time:0,                        // 打开模态框的次数    
        isAdd:true,                    // 是否新增
        isDialogVisible:false,         // 是否显示模态框
        serachForm: {                  // 查询的表单  
          CategoryId: "",
          TeacherName: "",
          CollageName:"",
          PageSiz:"",
          PageIndex:""
        },
        form:{                         // 课程的表单
          Title:"",                    // 课程标题
          Description:"",              // 课程描述
          ClassCount:0,                // 总课节数
          ViewCount:50,                // 人气值
          TeacherId:"",                // 老师ID
          Level:"",                    // 课程等级（1：初级；2：中级；3：高级） 
          Status:"0",                  // 状态（1：有效；0：无效）
          CreateTime:"",               // 创建时间
          IsFreeForVip:"0",            // 是否VIP会员
          IsExcellentCollage:"0",      // 是否推荐到精品专利（0：否：1：是）
          SalePrice:"",                // 销售价格
          CollagePrice:"",             // 课程价格  
          CollageType:"",              // 课程类型（1：视频；2：音频）
          Id:0,                        // 新增传0  
          CategoryId:"",               // 课程类别ID
          CollageContent:"",           // 课程详情
          SmallImageUrl:""             // 课程图片
        },
        options:[{value:-1,label:"全部"},{value:1,label:"有效"},{value:0,label:"无效"}],
        videOptions:[{
          value: '1',
          label: '初级'
        },{
          value:'2',
          label:'中级'
        },{
          value:'3',
          label:'高级'
        }],
        CategoryOptions:[],
        tableData: [],
        totalCount: 29,
        teacherOptions:[],
        mediaTypes:[{
          value: '1',
          label: '视频'
        },{
          value:"2",
          label:"音频"
        }],

         // 规则
         rules:{
           Title: [
           { required: true, message: '请输入课程名称', trigger: 'blur' },
           ],
           // selectValidator
           TeacherId:[
           { validator:selectValidator ,message: '请至少选择一位老师', trigger: 'change' },
           ],
           Description:[
           { required: true, message: '请输入课程描述', trigger: 'blur' }
           ],
           CollagePrice:[
           { validator:notVaild,trigger: 'blur'}
           ],
           SalePrice:[
           { validator:notVaild,trigger: 'blur'}
           ],
           Level:[
           { validator:selectValidator ,message: '请至少选择一位课程等级', trigger: 'change' },
           ],
           ClassCount:[
           { validator:notVaild,trigger: 'blur'}
           ],
           CategoryId:[
           { validator:selectValidator ,message: '请至少选择一个课程类别', trigger: 'change' },
           ],
           ViewCount:[
           { validator:notVaild,trigger: 'blur'}
           ],
           CollageType:[
           { validator:selectValidator ,message: '请至少选择一位课程类别', trigger: 'change' },
           ],
           CollageContent:[
           { required: true, message: '请输入课程详情', trigger: 'blur' }
           ],
           SmallImageUrl:[
           { required: true, message: '请输入课程详情', trigger: 'blur' }
           ]
         }
       }
     },
     methods: {
      onSubmit() {
        console.log('submit!');
      },
      pageChange(param){        // 分页变化触发的函数
          // param 示例 {PageSize: 10, PageIndex: 2}
          // 请求操作可以放在这里 分页请求操作放在这里
          this.search()
        },
      addDialog(){              // 增加新的课程
        this.isAdd = true
        this.isDialogVisible = true
      },
      removeItem(e){
      	let para=Object.assign({},e) ;
      	if(e.Status=="1"){
      		para.Status=0;
      	}else{
      		para.Status=1
      	}

      	http.httpPost(UPDATE_URL,para).then(data=>{
      		console.log(data)
      		if(data) helper.message("操作成功","success")
      			this.search()
        })

      },
      upDateDialog(row){           // 修改新的课程
        this.isAdd = false
        this.isDialogVisible = true

        row.Status=row.Status.toString()
        row.IsFreeForVip=row.IsFreeForVip.toString()
        row.Level=row.Level.toString()
        row.CategoryId=row.CategoryId.toString()
        row.CollageType=row.CollageType.toString()
        row.IsExcellentCollage=row.IsExcellentCollage.toString()
        row.CollagePrice=row.CollagePrice/100;
        row.SalePrice=row.SalePrice/100;
        this.form = Object.assign({},row)
        
        let findEditor = (time = 1000,count = 3)=>{
          if(count <= 0) return
            if(!editor){
              let timer = setTimeout(function(){
               findEditor(time,--count)
               clearTimeout(timer)
             },time)
            }else{
            // 找到editor
            editor.txt.html(row.CollageContent || "'")
          }
        }
        findEditor()
      },

      add(){

      },

      save(){
        this.$refs['form'].validate((valid) => {
          if(editor.txt.html() == "") {
            helper.message("课程详情不能为空","warning")
            return
          }
          if(valid){
           this.form.CollageContent = editor.txt.html();
           this.form.SalePrice=this.form.SalePrice*100;
           this.form.CollagePrice=this.form.CollagePrice*100;
           
           if(this.isAdd) this.form.Id = 0
             http.httpPost(this.isAdd ? SAVE_URL : UPDATE_URL,this.form).then(data=>{
              if(this.isAdd){
                if(data !== 0) helper.message("添加成功","success")
                  else helper.message("添加失败","error")
                }else{
                  if(data) helper.message("编辑成功","success")
                    else helper.message("编辑失败","error")
                  }  
                this.isDialogVisible = false
                this.search()
              })
         }
       })
      },
      search(){  // 查询函数
       let page = this.$refs["table"].getPagingInfo()
       this.serachForm = Object.assign({},this.serachForm,{
        "PageSiz": page.PageSize,
        "PageIndex": page.PageIndex,
      })
       http.httpPost("/api/v1/manager/collage/GetCollageList",this.serachForm)
       .then(data=>{
        let result = data.Data,
        totalCount = data.TotalCount   
        this.tableData = result
        this.totalCount = totalCount
      })
     },
      upLoadImg(){ // 获取图片
        helper.upLoadImage((data)=>{
          if(data.Code == 200){
            helper.message("上传成功","success")
            this.form.SmallImageUrl = data.fileUrl
          }else{
            helper.message("请重新上传图片","warning")
          }
        })
      },
      detailInfo(data){
        let id = data.Id
        if(id || id == 0){
          console.log(data.Id)
          helper.routerJump("minclass",{
           id:id
         })
        }
      },
      // 关闭前的回调
      dialogCloseCall(){
        this.$refs['form'].resetFields();
      },
      // 打开前的回调
      dialogOpenCall(){
       if(this.time > 0) return
         else ++this.time
           console.log("123321fad")
         this.$nextTick(generateEditor)
       }
     },
     created(){
       api.getTeacherInfo().then(data=>{
         let res = data.Data
         this.teacherOptions = res
       })

       http.httpPost("/api/v1/manager/collageCategory/GetCollageCategoryList",{status:1}).then(data=>{
        let result = data.Data,
        totalCount = data.TotalCount
          // this.  
          this.CategoryOptions = result 
        })
     },
     mounted(){
      this.search()
    }
  }

  </script>
  <style scoped>
  .contain-imgs{
    width: 100%;
    height: 100%;
  }
  .contain-imgs img{
    width: 80px;
    height: 60px;
    vertical-align:middle
  }
  #toolbar{
    border: 1px solid #ccc
  }
  #mainarea{
    width: 100%;
    height: 120px;
    border: 1px solid #ccc
  }
  </style>


