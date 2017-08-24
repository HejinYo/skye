<template>
  <div class="wrapper wrapper-content animated fadeInRight">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="users" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userId" label="#" width="80"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="phone" label="电话" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="loginIp" label="登录IP" width="180"></el-table-column>
      <el-table-column prop="loginTime" label="登录时间" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建日期"></el-table-column>
      <el-table-column label="操作" min-width="50">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger">批量删除</el-button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50, 100, 200, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" style="float:right;">
      </el-pagination>
    </el-col>


    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="addUserForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <!--<el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="addFormVisible=!addFormVisible">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        pageSize: 10,
        listLoading: false,
        sels: [],//列表选中列
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        addUserForm: {
          userName: 'user100',
          userPwd: '123456',
          email: 'user@qq.com',
          phone: '15595303900'
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getUsers();
      })
    },
    methods: {
      getUsers() {
        this.$http.get('/api/user/listPage?startIndex=' + this.page + '&pageSize=' + this.pageSize + '&sidx=userId&order=desc')
          .then(response => {
            this.users = response.data.result.list;
            this.total = response.data.result.total;
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        let _this = this
        this.$http.delete('/api/user/' + row.userId)
          .then(response => {
            if (response.data.code === 0) {
              this.$notify.success({message: "删除成功！"});
              _this.getUsers();
            } else {
              this.$notify.warning({message: response.data.message});
            }
          })
        console.log(index, row);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getUsers();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
        console.log(`当前页: ${val}`);
      },//显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        /* this.addForm = {
           name: '',
           sex: -1,
           age: 0,
           birth: '',
           addr: ''
         };*/
      },
      onSubmit() {
        let _this = this;
        this.$http.post('/api/user/', this.addUserForm)
          .then(response => {
            console.log(response.data)
            if (response.data.code === 0) {
              this.$notify.success({message: "添加成功！"});
              _this.getUsers();
            } else {
              this.$notify.warning({message: response.data.message});
            }
          })
      }
    }
  }
</script>
