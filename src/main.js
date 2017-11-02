// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';




// 1.导入vue-router路由  及路由的写法
import vueRouter from 'vue-router';

//   1.1将vueRouter绑定vue
Vue.use(vueRouter);

// 1.2定义路由规则
//   导入login.vue组件对象
import login from './components/admin/account/login.vue';
import layout from './components/admin/layout.vue';
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue';
import goodsedit from './components/admin/goods/goodsedit.vue';
var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/admin' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd },
                { name: 'goodsedit', path: 'goodsedit/:id', component: goodsedit },
            ]
        }
    ]
})



// 2.导入axios
//   2.0，导入包
import axios from 'axios';
// 2.1设定axios的基本uel请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';

//    2.2将axios轨道vue的原型属性上
Vue.prototype.$http = axios;

// 设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

// 2.0.4 绑定到vue上
//Vue.use(axios);



// 路由全局卫士（路由钩子函数）
//  to:当前要进入的路由
//    from：代表来源路由
//   next，执行next（）方法才能正常渲染出组件页面

router.beforeEach((to, from, next) => {
    // console.log(to)
    // to:Object {name: "login", meta: Object, path: "/login", hash: "", query: Object…}

    if (to.name == 'login') {
        next();
    } else {
        // 发出 /admin/account/isloing 这个url的请求，如果它返回的是logined表示登录过，所以要执行next（）进程进入到想要
        // 进入的组件页面，否则跳转到登录页面
        // 1.0 发出ajax请求到/admin/account/isloing
        axios.get('/admin/account/islogin').then(res => {
            // 如果res.data.code =="logined" 表示登录过
            if (res.data.code == "logined") {
                next();
            } else {
                // 跳转到登录页面
                router.push({ name: 'login' });
            }
        });
    }
})


// 3.使用element-ui
//    3.1导入文件
import elementUi from 'element-ui';

// 3.2导入element-ui的css控制样式
import '../statics/theme_rms/index.css';
import '../statics/stati.css';

// 3.3 绑定
Vue.use(elementUi);


// 时间过滤器
Vue.filter('datefmt', (input, fmtstring) => {
    var date = new Date(input)

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    if (fmtstring == 'YY-MM-DD') {
        return y + '-' + m + '-' + d;
    } else if (fmtstring == 'YY-MM-DD HH:mm:ss') {
        return y + '-' + m + '-' + d + h + ':' + mi + ':' + s;
    }

})


new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}

    router,

    // es6的写法
    render: create => create(App)
});