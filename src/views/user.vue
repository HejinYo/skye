<template>
  <div>
    <!--操作工具条-->
    <div class="ibox float-e-margins">
      <div class="ibox-title">
        <div class="row">
          <div class="col-lg-8 col-md-6 col-sm-7">
            <div class="btn-group">
              <button class="btn btn-primary" type="button" @click="openSave">添加</button>
            </div>
            <div class="btn-group">
              <button class="btn btn-info" type="button" @click="openEdit">修改</button>
            </div>
            <div class="btn-group">
              <button class="btn btn-warning" type="button" @click="doDelete">删除</button>
            </div>
            <div class="btn-group">
              <button :class="[{ 'disabled': sels.length===0},'btn btn-danger']" type="button" @click="delBatch">批量删除</button>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-5">
            <div class="input-group">
              <div class="input-group-btn">
                <span class="input-group-btn">
                <button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{pagePara.queryStr}}
                  <span class="caret"></span>
                </button>
                  <ul class="dropdown-menu">
                    <li><a @click="searchUser('userName','用户名')">用户名</a></li>
                    <li class="divider"></li>
                    <li><a @click="searchUser('phone','电话')">电话</a></li>
                    <li><a @click="searchUser('email','邮箱')">邮箱</a></li>
                   </ul>
               </span>
              </div>
              <input class="form-control" v-model="pagePara.search" placeholder="查询...">
              <div class="input-group-btn">
                <button type="button" class="btn btn-primary" @click="searchUser(pagePara.queryCol,pagePara.queryStr)"><span><i class="fa fa-search"></i></span></button>
              </div>
              <span class="input-group-btn">
                  <!--<button type="button" class="btn btn-primary" @click="searchUser">查询</button>-->
                  <button type="button" class="btn" @click="searchRset">重置</button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="ibox-content">
        <div class="row">
          <div class="col-lg-12">
            <el-table :data="userList" stripe border highlight-current-row v-loading="listLoading"
                      @current-change="currentRow" @selection-change="selectionRow" @sort-change="sortChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" width="60"></el-table-column>
              <el-table-column prop="userName" label="姓名" sortable="custom" width="200"></el-table-column>
              <el-table-column prop="phone" label="电话" sortable="custom" width="150"></el-table-column>
              <el-table-column prop="email" label="邮箱" sortable="custom" min-width="180"></el-table-column>
              <el-table-column prop="loginIp" label="登录IP" sortable="custom" show-overflow-tooltip width="180"></el-table-column>
              <el-table-column prop="loginTime" label="登录时间" sortable="custom" width="180"></el-table-column>
              <el-table-column prop="createTime" label="创建日期" sortable="custom" width="180"></el-table-column>
              <el-table-column prop="state" label="状态" sortable="custom" width="90">
                <template scope="scope">
                  <el-tag :type="scope.row.state == 1 ? 'primary' : 'danger'" close-transition>
                    {{scope.row.state == 1 ? '正常' : '禁用'}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template scope="scope">
                  <el-button size="small" @click="openColEdit(scope.row)">编辑 </el-button>
                  <el-button size="small" type="danger" @click="doColDelete(scope.row)">删除 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-lg-12">
            <br/>
            <!--翻页工具条-->
            <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="pagePara.page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pagePara.pageSize"
              layout="total, sizes, prev, pager, next"
              :total="pagePara.total">
            </el-pagination>
          </div>

        </div>
      </div>

    </div>

    <el-dialog title="添加用户" :visible.sync="addFormVisible" :close-on-click-modal='false' :close-on-press-escape='false'>
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addUserForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input v-model="addUserForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button @click="resetForm('addUserForm')">重置</el-button>
        <el-button type="primary" @click="doSave">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="编辑用户" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editUserForm" :rules="addUserRules" ref="editUserForm" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editUserForm.userName"></el-input>
        </el-form-item>
        <!--<el-form-item label="密码" prop="userPwd">
          <el-input v-model="editUserForm.userPwd"></el-input>
        </el-form-item>-->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-switch
            v-model="editUserForm.state"
            on-color="#13ce66"
            off-color="#ff4949"
            on-value="1"
            off-text="禁用"
            on-text="启用"
            off-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item label="创建日期" prop="createTime">
          <el-date-picker
            v-model="editUserForm.createTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        listLoading: false,
        userList: [],//表格数据
        pagePara: {//分页查询参数
          total: 0,
          page: 1,
          pageSize: 10,
          sidx: 'userId',
          sort: 'asc',
          queryCol: 'userName',
          queryStr: '用户名',
          search: ''
        },
        secol: null,//当前选择行
        sels: [],//列表选中列
        addFormVisible: false,//新增界面是否显示
        addUserForm: {
          userName: 'user100',
          userPwd: '123456',
          email: 'user@qq.com',
          phone: '15595303900'
        },
        addUserRules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 5, message: '至少 5 个字符', trigger: 'blur'}
          ],
          userPwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '至少 6 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
          ]
        },
        editFormVisible: false,
        editUserForm: {}
      }
    }
    ,
    computed: {
      currCol: function () {
        return this.secol !== null ? this.secol : false;
      }
    }
    ,
    mounted: function () {
      this.$nextTick(function () {
        this.getUserList();
      })
    },
    methods: {
      //加载用户列表
      getUserList() {
        this.listLoading = true;
        this.$http.get('/api/user/listPage' +
          '?pageNum=' + this.pagePara.page +
          '&pageSize=' + this.pagePara.pageSize +
          '&sidx=' + this.pagePara.sidx +
          '&sort=' + this.pagePara.sort +
          '&' + this.pagePara.queryCol + '=' + this.pagePara.search
        )
          .then(response => {
            if (response.data.code === 1) {
              this.listLoading = false;
              this.userList = response.data.result.list;
              this.pagePara.total = response.data.result.total;
            }
          })
      },
      //点击页码事件，翻页操作
      currentChange(val) {
        console.log(val);
        this.pagePara.page = val;
        this.getUserList();
      },
      //改变分页数量
      sizeChange(val) {
        this.pagePara.pageSize = val;
        this.getUserList();
      }
      ,
      //显示新增界面
      openSave: function () {
        this.addFormVisible = true;
      },
      //执行增加操作
      doSave() {
        let _this = this;
        this.$refs['addUserForm'].validate((valid) => {
          if (valid) {
            this.$http.post('/api/user/', this.addUserForm)
              .then(response => {
                if (response.data.code === 1) {
                  this.$message({message: "添加成功！"});
                  this.resetForm('addUserForm');
                  this.addFormVisible = false;
                  _this.getUserList();
                } else {
                  this.$message.warning(response.data.message);
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //打开编辑用户面板
      openEdit() {
        if (null !== this.secol) {
          this.editFormVisible = true;
          this.editUserForm = JSON.parse(JSON.stringify(this.secol));
        }
      },
      //表格内打开编辑用户
      openColEdit(row) {
        this.secol = row;
        this.openEdit();
      },
      //执行更新操作
      doUpdate() {
        let _this = this;
        this.$refs['editUserForm'].validate((valid) => {
          if (valid) {
            this.$confirm('此操作将修改该用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.put('/api/user/' + this.editUserForm.userId, this.editUserForm)
                .then(response => {
                  if (response.data.code === 1) {
                    this.$message({message: "修改成功！"});
                    this.resetForm('editUserForm');
                    this.editFormVisible = false;
                    _this.getUserList();
                  } else {
                    this.$message.warning({message: response.data.message});
                  }
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改'
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //执行表格内删除用户
      doColDelete(row) {
        this.secol = row;
        this.doDelete();
      },
      //执行单个删除操作
      doDelete() {
        let _this = this;
        if (null !== this.secol) {
          this.$confirm('此操作将删除用户 ' + this.secol.userName + ', 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('/api/user/' + this.secol.userId)
              .then(response => {
                if (response.data.code === 1) {
                  this.$message({message: "删除成功！"});
                  _this.getUserList();
                } else {
                  this.$message.warning({message: response.data.message});
                }
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
      ,
      delBatch() {
        if (this.sels.length > 0) {
          this.$confirm('此操作将删除多个用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({message: "目前delete请求无法传递参数！"});
            /*this.$http.delete('/api/user/', this.sels)
              .then(response => {
                if (response.data.code === 1) {
                  this.$message({message: "删除成功！"});
                  _this.getUserList();
                } else {
                  this.$message.warning({message: response.data.message});
                }
              })*/
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
      ,
      //点击表格行事件
      currentRow(val) {
        this.secol = val;
      }
      ,
      //多选事件
      selectionRow(val) {
        this.sels = val;
      }
      ,
      //排序
      sortChange(val) {
        this.pagePara.sidx = val.prop;
        this.pagePara.sort = val.order;
        this.getUserList();
      }
      ,
      //查询
      searchUser(query, str) {
        this.pagePara.queryStr = str;
        this.pagePara.queryCol = query;
        if (this.pagePara.search !== '') {
          this.getUserList();
        }
      }
      ,
      //查询重置
      searchRset() {
        this.pagePara.search = '';
        this.getUserList();
      }
      ,
      //重置表格
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
