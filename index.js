// 入口js文件
import Vue from "Vue"
import "./component/ref"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./css/common.css"
import router from "./route"
import helper from "./src/lib/helper"
Vue.use(ElementUI);

helper.init(router); // 初始化router对象
helper.routerJump('index');

let lastPath = helper.localStorageGet('lastPath');

router.beforeEach((to, from, next) => {
  helper.localStorageSet('lastPath', to.path);
  next();
})

if (lastPath) {
  setTimeout(helper.routerJump(lastPath), 500);
} else helper.routerJump('index');

// 初始化一个Vue
let App = new Vue({
  el:"#app",
  router,
  data(){
    return{
      mes:"welcome to index11.vue",
      name:""
    }
  },
  methods:{
    logOff(){
      helper.removeCookie("Token");
      helper.removeCookie("name");
      window.location.replace("./login.html")
    }
  },
  created(){
    this.name=helper.getCookie("name");
  }
})  