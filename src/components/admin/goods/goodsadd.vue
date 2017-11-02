<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
          <!-- 使用elementUI中的面包屑导航组件完成 -->
   <el-row>
      <el-col :span="24">
      <div class="abread bt-line">
         <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin/goodslist' }">返回上一页</el-breadcrumb-item>
            <el-breadcrumb-item>知识</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/admin'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        
      </el-col>
   </el-row>
   <el-row>
     <el-col :span="24">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
           <el-col :span="20">
           
              <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
             </el-form-item> 
         </el-col>
        </el-row>
        <el-row>
           <el-col :span="20">
             <el-form-item label="副标题"  prop="sub_title">
                    <el-input type="textarea" v-model="form.sub_title"></el-input>
              </el-form-item>
           </el-col>
        </el-row>

        <!-- 所属类别-->
        <el-row>
          <el-col :span="8">
             <el-form-item label="所属类别" prop="title">
                 <el-select v-model="form.category_id" clearable placeholder="请选择">
                      <el-option
                        v-for="(cate,index) in categorylist"
                        :key="index"
                        :label="cate.title"
                        :value="cate.category_id">
                        <span v-for="count in cate.class_layer-1">&nbsp;</span>
                        <span v-if="cate.class_layer>1">|-</span>
                        <span v-text=cate.title></span>
                      </el-option>
                 </el-select>
             </el-form-item>
          </el-col>
          <el-col :span="5">
             <el-form-item label="是否发布" prop="title">
                  <el-switch
                    v-model="form.status"
                    on-text="是"
                    off-text="否">
                  </el-switch>
             </el-form-item>
          </el-col>
          
        
            <el-col :span="10">
               <el-form-item label="推荐类型">
                        <el-switch v-model="form.is_slide" on-text="进入轮播" off-text="不进轮播" :width="90">
                        </el-switch>
                        <el-switch v-model="form.is_top" on-text="置顶" off-text="未置顶" :width="80">
                        </el-switch>
                        <el-switch v-model="form.is_hot" on-text="热门" off-text="非热门" :width="80">
                        </el-switch>
                    </el-form-item>
            </el-col>
        
        </el-row>

        <el-row>
           <el-col :span="5">
             <el-form-item label="商品货号" prop="goods_no">
              <el-input v-model="form.goods_no"></el-input>
             </el-form-item> 
            </el-col>
           <el-col :span="5">
              <el-form-item label="商品库存" prop="stock_quantity">
              <el-input v-model="form.stock_quantity"></el-input>
             </el-form-item> 
            </el-col>
            <el-col :span="5">
              <el-form-item label="市场价格" prop="market_price">
              <el-input v-model="form.market_price"></el-input>
             </el-form-item> 
            </el-col>
            <el-col :span="5">
              <el-form-item label="销售价格" prop="sell_price">
              <el-input v-model="form.sell_price"></el-input>
             </el-form-item>
           </el-col> 
        </el-row>
       
        <el-row>
          <el-col :span="8">
             <el-form-item label="上传图片">
               <el-upload
                    class="upload-demo"
                    action="http://157.122.54.189:9095/admin/article/uploadimg"
                    :file-list="form.imgList"
                    :on-success="imgUploaded"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                </el-upload>
                </el-form-item>
          </el-col>

          <el-col :span="10">
             <el-form-item label="上传相册">
               <el-upload
                  class="upload-demo"
                  action="http://157.122.54.189:9095/admin/article/uploadfile"                               
                  :file-list="form.fileList"
                  :on-success="fileUploaded"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                </el-upload>
                </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
             <el-form-item label="详细描述" >
             
                  <quill-editor v-model="form.content"></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span=12>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button class="des-bt" @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
          </el-col>
        </el-row>  
      </el-form>
     </el-col>
   </el-row>
   

    </div>
</template>

<script>
// 导入富文本编辑器组件对象
import { quillEditor } from 'vue-quill-editor'
export default{

  // 注册私有组件
        components:{
            quillEditor
        },
    // es6的写法 data() 等同于es5的 data:function()
    data(){
       var checkNumber = (rule, value, callback) => {
                // 非空验证
                if (!value) {
                 return callback(new Error('不能为空'));
                }

                if(isNaN(value)){
                    return callback(new Error('输入的值必须是一个数字'));
                }else{
                 callback();
                }
            };

        return{
          // 所属分类中的数据
            categorylist:[
             
            ],
          // 代表表单中所有元素的对象
            form:{
              title:'',
              sub_title:'',
              category_id: '',
              status: true,
              is_slide: true,
              is_top: true,
              is_hot: true,
              goods_no:'',
              stock_quantity:0,
              market_price:0,
              sell_price:0,
              content:'',
              imgList:[],  // 商品封面图片数据对象
              fileList:[] //商品相册图片数组
            },
            rules: {
                title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
                sub_title: [{ required: true, message: '请填写副标题', trigger: 'blur' }],
                goods_no: [
                        { required: true, message: '请输入商品编号', trigger: 'blur' }
                    ],
                stock_quantity: [
                      { validator: checkNumber, trigger: 'blur' }
                ],
                market_price: [
                    { validator: checkNumber, trigger: 'blur' }
                ],
                sell_price: [
                      { validator: checkNumber, trigger: 'blur' }
                ]
            }
        }
    },
     mounted(){
        this.getCatelist();
      },
    methods:{
      
       // 商品有多个相册图片
            fileUploaded(response, file, fileList){
                this.form.fileList.push(response);
            },
            // 当封面图片上传完毕以后的回调函数
            imgUploaded(response, file, fileList){
                // fileList 的值就是当前上传的所有图片
                // file  的值就是当前上传图片的返回对象
                // response 档次响应对象
                // console.log(response);
                // console.log(file);
                // console.log(fileList);
                // 将服务器响应回来的数据对象增加到 form.imgList数组中即可
                this.form.imgList = [response];  // 单张封面图片

            },
     

      // 获取表单中分类属性的数据
        getCatelist(){
          this.$http.get('/admin/category/getlist/goods').then(res=>{
              this.categorylist = res.data.message;
              // console.log(res)
          })
        },
      
      // 提交表单元素到服务器的api接口
      submitForm(formerf){
       this.$refs[formerf].validate((valid) => {
          if (valid) {
            // 如果表单合法，则通过ajax提交数据
            this.$http.post('/admin/goods/add/goods', this.form).then(res=>{
              if(res.data.status==1){
                this.$message.error(res.data.message);
                 return;
              }
  
                // 数据新增成功以后跳转到商品列表页面
                // 利用vue-router的编程式导航实现页面的跳转
                this.$router.push({name:'goodslist'});
            })

          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },

      // 取消提交
      resetForm(formerf){
        this.$refs[formerf].resetFields();
      }

    }
}

</script>

<style>
     .demo-ruleForm{
       margin-top:20px;
     }
    .demo-ruleForm .des-bt{
       background-color: red;
       color:#fff;
     }
</style>