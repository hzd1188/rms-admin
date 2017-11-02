<template>
 <div class="acounttmpl">
   <el-row>
       <el-col :span="8" :offset="8">
         <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="uname">
              <el-input v-model="form.uname"></el-input>
            </el-form-item> 
            <el-form-item label="密码" prop="upwd">
              <el-input v-model="form.upwd"></el-input>
            </el-form-item> 
             
          
              <el-form-item>
                <el-button type="primary" @click="login('ruleForm')">提交</el-button>
              </el-form-item>
          
         
         </el-form>
       </el-col>
   </el-row>
 </div>
</template>




<script>
  export default{
    // es6的写法 data() 等同于es5的 data:function()
    data(){
        return{
           form:{
              uname:'',
              upwd:''
              },
            rules: {
                uname:[{ required: true, message: '请输入账号', trigger: 'blur' }],
                upwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
          
        }
    },methods:{

      // 登录验证
        login(rulesForm){
          this.$refs[rulesForm].validate((valid) => {
          if (valid) {
            // 如果表单合法，则通过ajax提交数据
              this.$http.post('/admin/account/login',this.form).then(res=>{
                   if(res.data.status==1){
                      this.$message.error(res.data.message);
                      return false;
                   }
                  //  调转到首页
                  this.$router.push({name:'layout'});
              })

          } else {
            return false;
          }
        });
        }

    }
}
</script>



<style>
  
</style>