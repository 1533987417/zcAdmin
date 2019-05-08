import Vue from "Vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./css/login.css"
import helper from "@helper"
import http from "@http"
import api from "@api"
import config from "@config"

Vue.use(ElementUI);

let App = new Vue({
    el:"#login",
    data(){
        return{
            mes:"welcomt to my home",
            loginForm:{
                password:"",
                userName:""
            },
            rules:{
                password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                userName: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                ], 
            }
        }
    },
    methods:{
        loginAction(){
            this.$refs['loginForm'].validate((valid) => {
                if(valid){
                    http.httpPost("/api/v1/manager/admin/login",this.loginForm)
                    .then(res=>{
                        console.log(res)
                        if(!res.IsSuccess){
                            helper.message(res.Message || "用户不存在","warning")
                        }else{
                            helper.message("登录成功","success")
                            helper.setCookie("Token",res.Token,1)
                            helper.setCookie("name",res.Data.RealName)
                            let timer = setTimeout(function(){
                                window.location.replace("./index.html")
                                clearTimeout(timer)
                            },2000)
                        }
                        // if(res.Code == 200){
                        //     helper.message("上传成功","success")
                        //     insert(res.fileUrl)
                        //   } else{
                        //     helper.message("请重新上传图片","warning")
                        //   }
                    })
                }
            })
        }
    }
})
console.log(321)
