<template>
  <div class="tmpl">
    <el-row>
        <!--1.0 左边菜单 -->
          <el-col :span="leftcol">
            <img class="layout pic" src="../../../statics/imgs/logo.png" alt="">
            <div class="layout menu">
             <el-menu default-active="1-2" class="el-menu-vertical-demo" :collapse = "iscollapse" >
                <el-submenu index="1">
                     <template slot="title"><i class="el-icon-message"></i>购物商城</template>
                    <el-menu-item-group>
                    <router-link to="/admin/goodslist">
                      <el-menu-item index="1-1">内容管理</el-menu-item>
                    </router-link>
                   
                    <el-menu-item index="1-2">类别管理</el-menu-item>
                    <el-menu-item index="1-3">评论管理</el-menu-item>
                    </el-menu-item-group>
                   
                </el-submenu>
                  <!-- 订单管理 -->
                <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>订单管理</template>
                        <el-menu-item-group>                           
                        <el-menu-item index="2-1">订单列表</el-menu-item>                               
                        </el-menu-item-group>
                </el-submenu>
                
             </el-menu>
             </div>
          </el-col>
         
        <!-- 右边部分-->
          <el-col :span="rightcol">
            <!--   右边导航栏顶部-->
              <el-row> 
                   <el-col :span="24">
                     <div class="topbg">
                        <el-row>
                            <el-col :span="1"> 
                            <!-- 控制菜单展开和收缩的图标-->
                               <i @click = "showhide" class="el-icon-menu layout area"></i> 
                            </el-col>
                            <el-col :span="23">
                               <span>欢迎:admin</span>
                               <el-dropdown split-button type="primary" >
                                    功能
                                    <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item>修改密码</el-dropdown-item>
                                      <el-dropdown-item>注销登录</el-dropdown-item>
                                   </el-dropdown-menu>
                              </el-dropdown>
                            </el-col>
                        </el-row>
                     </div>
                   </el-col> 
              </el-row>

            <!--  右边导航栏内容区域 -->
              <el-row> 
                <el-col :span="24">
                   <router-view></router-view>
                </el-col> 
              </el-row>
          </el-col>
    </el-row>
    </div>
</template>
<script>
   export default{
    // es6的写法 data() 等同于es5的 data:function()
    data(){
        return{
          iscollapse:false, 
          // 控制左边菜单栏的宽度的
          leftcol:4,
          // 控制右边菜单栏的宽度的
          rightcol:20
        }
    },methods:{
       showhide(){
         this.iscollapse = !this.iscollapse;
         if(this.iscollapse){
            this.leftcol=1;
            this.rightcol = 23;
         }else{
            this.leftcol=4;
           this.rightcol = 20;
         }
       }
    }
}
</script>



<style>
  
</style>