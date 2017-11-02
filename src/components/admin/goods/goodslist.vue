<template>
 <div class="arttmpl">
     <!-- 使用elementUI中的面包屑导航组件完成 -->
   <el-row>
      <el-col :span="24">
      <div class="abread bt-line">
         <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        
      </el-col>
   </el-row>

    <!-- 新增，删除，全选按钮 -->
    <div class="operation">
    <el-row>
       <el-col :span="6">
         <router-link to="/admin/goodsadd">
              <el-button>新增</el-button>
         </router-link>
         
         <el-button @click="selectAll">全选</el-button>
         <el-button @click=del(ids)>删除</el-button>
       </el-col>
        <el-col :span="3" :offset = "15">
         <el-input
            placeholder="请输入搜索内容"
            icon="search"
            v-model="searchValue"
            :on-icon-click="getlist">
        </el-input>
       </el-col>
    </el-row>
    </div>

    <el-row>
       <el-col :span="24">
          <el-table :data="list" style="width: 100%"  ref="multipleTable"
           :row-class-name="tableRowClassName" @selection-change="getrows" height='400'>
              <el-table-column type="selection" label="全选" width="80">
              </el-table-column>
              <el-table-column label="标题">
                 <template scope='scope'>
                    <router-link v-bind ="{to:'/admin/goodsedit/'+scope.row.id}">
                      {{scope.row.title}}
                    </router-link>
                 </template>
</el-table-column>
<el-table-column prop="categoryname" label="所属类别" width="100">
</el-table-column>
<el-table-column label="发布时间/人" width="170">
    <template scope='scope'>
                              {{scope.row.add_time | datefmt('YY-MM-DD')}}/{{scope.row.user_name}}
                            </template>
</el-table-column>
<el-table-column label="属性" width="100">
    <template scope='scope'>
      <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_slide==1?'轮播':'不轮播')}" placement="bottom">
         <i v-bind="{class:'el-icon-picture ls'+(scope.row.is_slide==1?'imgactive':'')}"></i>
      </el-tooltip>
      
    <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_top==1?'置顶':'不置顶')}" placement="bottom">
      <i v-bind="{class:'el-icon-upload ls'+(scope.row.is_top==1?'imgactive':'')}"></i>
     </el-tooltip> 
       
     <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_hot==1?'推荐':'不推荐')}" placement="bottom">
      <i v-bind="{class:'el-icon-star-on ls'+(scope.row.is_hot==1?'imgactive':'')}"></i>
    </el-tooltip>
        
      
   </template>
</el-table-column>
<el-table-column label="操作" width="80">
    <template scope='scope'>
                              <router-link v-bind ="{to:'/admin/goodsedit/'+scope.row.id}">
                                    <el-button type="success" size="mini">修改</el-button>
                                  </router-link>
                            </template>
</el-table-column>
</el-table>
</el-col>
</el-row>
<el-row>
    <el-col :span="24">

        <el-pagination @size-change="sizeChange" @current-change="changePage" :current-page="currentPage" :page-sizes="[10,20,30,100, 200, 300, 400]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>


    </el-col>
</el-row>
</div>
</template>




<script>
    export default {
        // es6的写法 data() 等同于es5的 data:function()
        data() {
            return {
                searchValue: '',
                ids: '',
                // 页面总数
                pageSize: 10,
                // 当前页面
                currentPage: 1,
                // 总条数
                total: 0,
                // 表格中的每行数据
                list: []
            }
        },
        mounted() {
            this.getlist();
        },
        methods: {

            // 全选和反选功能
            selectAll(){
                var rows = this.list;

                if (rows) {
                    // 遍历数据数组中的每个对象（代表一行）
                    rows.forEach(row => {
                        // 将当前行的checkbox勾选
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                    } else {
                         // 将当前行的checkbox反选
                        this.$refs.multipleTable.clearSelection();
                    }
            },
            // 点击删除
            del(ids){
                if(this.ids.length<=0){
                    this.$message.error('请勾选你要删除的数据');
                    return;
                }

                this.$confirm('您确认要删除数据吗?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        
                            // 执行删除逻辑请求
                            this.$http.get('/admin/goods/del/'+this.ids)
                            .then(res=>{
                                // 判断服务器是否处理成功
                                if(res.data.status ==1){
                                    this.$message.error(res.data.message);
                                    return;
                                }

                                // 如果服务器成功则数组列表
                                this.getlist();
                            });


                    }).catch(() => {
                       // 如果用户点击取消，自动关闭对话框
                    });
            },
            //  设置每页条数时促发页面改变
            sizeChange(currentSize) {
                this.pageSize = currentSize;

                this.getlist()
            },

            // 点击分页下一页或者某个页码时跳转获取当前页面数据
            changePage(pageIndex) {
                this.currentPage = pageIndex;
                this.getlist()
            },
            // 获取用户勾选的行对象资源
            getrows(rows) {
                this.ids = '';
                var char = ',';
                for (var i = 0; i < rows.length; i++) {
                    if (i == rows.length - 1) {
                        char = '';
                    }
                    this.ids += rows[i].id + char;
                }
                console.log(this.ids)
            },
            getlist() {
                var url = '/admin/goods/getlist?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;
                this.$http.get(url).then(res => {
                    if (res.data.status == 1) {
                        console.log(res.data.message)
                    }
                    this.list = res.data.message;
                    // console.log(res.data.message)
                    this.total = res.data.totalcount;
                })
            },
            tableRowClassName(row, index) {
                if (index / 2 == 0) {
                    return 'info-row';
                } else if (index / 2 == 1) {
                    return 'positive-row';
                }
                return '';
            }
        }
    }
</script>



<style scoped>
    .el-pagination {
        margin-top: 20px;
    }
</style>