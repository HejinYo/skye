<template>
  <div class="ibox">
    <div class="row">
      <div class="col-md-6 ">
        <div class="">
          <Card>
            <div slot="title">
              所有角色
            </div>
            <div slot="extra">
            </div>
            <div>
              <Button type="primary" @click="addRole">添加</Button>
              <Button type="primary" @click="editRole">修改</Button>
              <Button type="error" @click="doDeleteRole">删除</Button>
              <!--     <Button type="info" @click="addRoleResource">授权</Button>-->
            </div>
            <br/>
            <el-table :data="roleList" stripe highlight-current-row v-loading="listLoading" element-loading-text="拼命加载中"
                      @current-change="roleCurrentRow" @sort-change="roleSortChange">
              <el-table-column type="expand" label="展开">
                <template scope="props">
                  <Form :label-width="60">
                    <FormItem label="角色编码">
                      <span>{{ props.row.roleCode }}</span>
                    </FormItem>
                    <FormItem label="描述">
                      <span>{{ props.row.roleDescription }}</span>
                    </FormItem>
                    <FormItem label="创建时间">
                      <span>{{ props.row.createTime }}</span>
                    </FormItem>
                  </Form>
                </template>
              </el-table-column>
              <el-table-column label="角色名称" prop="roleName" align="center" show-overflow-tooltip min-width="90">
                <template scope="scope">
                  {{scope.row.roleName}}({{scope.row.roleCode}})
                </template>
              </el-table-column>
              <el-table-column prop="state" label="状态" sortable="custom" align="center" min-width="90">
                <template scope="scope">
                  <Tag :color="scope.row.state == 1 ? 'green': '' ">
                    {{scope.row.state == 1 ? '正常' : '禁用'}}
                  </Tag>
                </template>
              </el-table-column>
              <el-table-column label="授权" align="center" width="70">
                <template scope="scope">
                  <Button size="small" @click="addRoleResource(scope.row)"><i class="fa fa-edit"></i></Button>
                </template>
              </el-table-column>
            </el-table>
            <br/>
            <!--翻页工具条-->
            <Page show-total size="small" placement="top" v-if="rolePagePara.total > 0"
                  :total="rolePagePara.total"
                  :page-size-opts="[10, 20, 50, 100]"
                  @on-change="rolePageChange"
                  @on-page-size-change="roleSizeChange">
            </Page>
          </Card>
        </div>
      </div>

      <div class="col-md-6 ">
        <div>
          <Card>
            <div slot="title">
              权限分配
            </div>
            <el-table :data="roleResourceList" stripe border highlight-current-row v-loading="listLoading"
                      @sort-change="roleResourceSortChange" @current-change="roleResourceCurrentRow">
              <el-table-column prop="id" label="编号" align="center" width="70"></el-table-column>
              <el-table-column prop="roleCode" label="角色" align="center" width="120"></el-table-column>
              <!--<el-table-column prop="resName" label="资源名称" sortable="custom" width="150"></el-table-column>-->
              <!--<el-table-column prop="resCode" label="资源编码" sortable="custom" width="150"></el-table-column>-->
              <el-table-column prop="permName" label="资源权限" sortable="custom" min-width="150">
                <template scope="scope">
                  {{scope.row.resName}} ({{scope.row.permName}})
                </template>
              </el-table-column>
              <el-table-column prop="permCode" label="权限" sortable="custom" width="150">
                <template scope="scope">
                  {{scope.row.resCode}}:{{scope.row.permCode}}
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" align="center" width="70">
                 <template scope="scope">
                   &lt;!&ndash;<Button type="" size="small" @click="openColEdit(scope.row)"><i class="fa fa-edit"></i></Button>&ndash;&gt;
                   &lt;!&ndash;<Button type="error" size="small" @click="doColDelete(scope.row)"><i class="fa fa-trash-o"></i></Button>&ndash;&gt;
                   <Button type="error" size="small"><i class="fa fa-trash-o"></i></Button>
                 </template>
               </el-table-column>-->
            </el-table>
            <br/>
            <!--翻页工具条-->
            <Page show-elevator show-total show-sizer size="small" placement="top" v-if="roleResourcePagePara.total > 1"
                  :total="roleResourcePagePara.total"
                  :page-size-opts="[10, 20, 50, 100]"
                  @on-change="roleResourcePageChange"
                  @on-page-size-change="roleResourceSizeChange">
            </Page>
          </Card>
        </div>
      </div>
    </div>

    <Modal :transfer="false" :mask-closable="false" v-model="roleVisible" title="添加角色">
      <Form ref="roleFrom" :model="roleFrom" :rules="roleValidate" :label-width="80">
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="roleFrom.roleName" placeholder="请输入"/>
        </FormItem>
        <FormItem label="角色编码" prop="roleCode">
          <Input v-model="roleFrom.roleCode" placeholder="请输入"/>
        </FormItem>
        <FormItem label="描述" prop="roleDescription">
          <Input v-model="roleFrom.roleDescription" placeholder="请输入"/>
        </FormItem>
        <FormItem label="状态" prop="state">
          <i-switch v-model="roleFrom.state" size="large" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="roleVisible = false">取 消</Button>
        <Button type="primary" @click="resOperation">确 定</Button>
      </div>
    </Modal>

    <Modal :transfer="false" :mask-closable="false" v-model="roleResourceVisible" title="权限分配">
      <Card :padding="10">
        <div slot="title">
          系统权限
        </div>
        <a href="#" slot="extra" type="primary" @click.prevent="resetChecked">
          <Icon type="ios-plus"></Icon>
          重置
        </a>
        <el-tree :data="resourceTreeData" :props="treeProps" @node-click="resourceTreeChange" :default-expanded-keys="[0]" style="border: none;" show-checkbox
                 :default-checked-keys="rolePermisson" ref="tree"
                 node-key="resCode" highlight-current :expand-on-click-node="false" accordion></el-tree>
      </Card>

      <div slot="footer">
        <Button @click="roleResourceVisible = false">取 消</Button>
        <Button @click="authorization" type="primary">确 定</Button>
      </div>
    </Modal>


  </div>

</template>
<script>
  export default {
    name: 'role',
    data() {
      return {
        resourceTreeData: [],
        rolePermisson: [],
        roleList: [],
        roleSecol: null,//当前选择行
        rolePagePara: {//分页查询参数
          total: 0,
          page: 1,
          pageSize: 10,
          sidx: 'roleId',
          sort: 'asc',
          queryCol: '',
          queryStr: ''
        },
        resOpsType: 'save',
        roleVisible: false,
        roleFrom: {
          "roleName": '',
          "roleCode": '',
          "roleDescription": "",
          "state": 1
        },
        roleValidate: {
          roleName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          roleCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ]
        },
        roleResourceList: [],
        roleResourceSecol: null,//当前选择行
        roleResourcePagePara: {//分页查询参数
          total: 0,
          page: 1,
          pageSize: 10,
          sidx: 'roleId,resId,permId',
          sort: 'asc',
          queryCol: '',
          queryStr: ''
        },
        roleResourceOpsType: 'save',
        roleResourceVisible: false,
        roleResourceFrom: {
          "resPid": 0,
          "resPname": '',
          "resType": "menu",
          "resName": '',
          "resCode": "",
          "resLevel": 1,
          "resIcon": "fa fa-folder",
          "seq": 1,
          "state": 1
        },
        roleResourceValidate: {
          resPname: [
            {required: true, message: '请选择上级资源', trigger: 'change'}
          ],
          resName: [
            {required: true, message: '资源名称不能为空', trigger: 'blur'}
          ],
          resCode: [
            {required: true, message: '资源编码不能为空', trigger: 'blur'}
          ],
          resType: [
            {required: true, message: '类型不能为空', trigger: 'blur'}
          ]
        },
        treeProps: {
          children: 'childrenRes',
          label: 'resName'
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getRoleList();
        this.getRoleResourceList();
      })
    },
    methods: {
      getRolePermission(roleId) {
        this.$http.get('/api/permission/granted/' + roleId)
          .then(response => {
            if (response.data.code === 1) {
              this.rolePermisson = response.data.result;
              this.getPermissionTree();
            }
          })
      },
      //加载权限树
      getPermissionTree() {
        this.$http.get('/api/permission/tree')
          .then(response => {
            if (response.data.code === 1) {
              this.resourceTreeData = response.data.result;
            }
          })
      },
      //加载角色列表
      getRoleList() {
        this.$http.get('/api/role/listPage' +
          '?pageNum=' + this.rolePagePara.page +
          '&pageSize=' + this.rolePagePara.pageSize +
          '&sidx=' + this.rolePagePara.sidx +
          '&sort=' + this.rolePagePara.sort +
          '&' + this.rolePagePara.queryCol + '=' + this.rolePagePara.queryStr
        )
          .then(response => {
            if (response.data.code === 1) {
              this.roleList = response.data.result.list;
              this.rolePagePara.total = response.data.result.total;
            }
          })
      },
      //加载角色权限列表
      getRoleResourceList() {
        this.$http.get('/api/role/roleResourceListPage' +
          '?pageNum=' + this.roleResourcePagePara.page +
          '&pageSize=' + this.roleResourcePagePara.pageSize +
          '&sidx=' + this.roleResourcePagePara.sidx +
          '&sort=' + this.roleResourcePagePara.sort +
          '&' + this.roleResourcePagePara.queryCol + '=' + this.roleResourcePagePara.queryStr
        )
          .then(response => {
            if (response.data.code === 1) {
              this.roleResourceList = response.data.result.list;
              this.roleResourcePagePara.total = response.data.result.total;
            }
          })
      },
      //点击页码事件，翻页操作
      rolePageChange(val) {
        this.rolePagePara.page = val;
        this.getRoleList();
      }
      ,
      //改变分页数量
      roleSizeChange(val) {
        this.rolePagePara.pageSize = val;
        this.getRoleList();
      }
      ,
      //排序
      roleSortChange(val) {
        this.rolePagePara.sidx = val.prop;
        this.rolePagePara.sort = val.order;
        this.getRoleList();
      }
      ,
      //点击表格行事件
      roleCurrentRow(val) {
        this.roleSecol = val;
        if (null !== val) {
          this.roleResourcePagePara.queryCol = 'roleCode';
          this.roleResourcePagePara.queryStr = val.roleCode;
        } else {
          this.roleResourcePagePara.queryCol = '';
        }
        this.getRoleResourceList();
      },
      //点击页码事件，翻页操作
      roleResourcePageChange(val) {
        this.roleResourcePagePara.page = val;
        this.getRoleResourceList();
      }
      ,
      //改变分页数量
      roleResourceSizeChange(val) {
        this.roleResourcePagePara.pageSize = val;
        this.getRoleResourceList();
      }
      ,
      //排序
      roleResourceSortChange(val) {
        this.roleResourcePagePara.sidx = val.prop;
        this.roleResourcePagePara.sort = val.order;
        this.getRoleResourceList();
      }
      ,
      //点击表格行事件
      roleResourceCurrentRow(val) {
        this.roleResourceSecol = val;
      }
      ,
      //重置表格
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      ,
      addRole() {
        this.resetForm('roleFrom');
        this.roleVisible = true;
        this.resOpsType = 'save';
      }
      ,
      editRole() {
        if (null !== this.roleSecol) {
          this.resetForm('roleFrom');
          this.roleFrom = JSON.parse(JSON.stringify(this.roleSecol));
          this.roleVisible = true;
          this.resOpsType = 'update';
        }
      }
      ,
      resOperation() {
        if (this.resOpsType === 'save') {
          this.doSaveRole();
        } else if (this.resOpsType === 'update') {
          this.doUpdateRole();
        }
      }
      ,
      doSaveRole() {
        let _this = this;
        this.$refs['roleFrom'].validate((valid) => {
          if (valid) {
            this.$http.post('/api/role/', this.roleFrom)
              .then(response => {
                if (response.data.code === 1) {
                  this.$Message.success("添加成功！");
                  this.resetForm('roleFrom');
                  this.roleVisible = false;
                  _this.getRoleList();
                } else {
                  this.$Message.warning(response.data.message);
                }
              })
          } else {
            this.$Message.info("表单验证失败");
          }
        });
      }
      ,
      //执行更新操作
      doUpdateRole() {
        let _this = this;
        this.$refs['roleFrom'].validate((valid) => {
          if (valid) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>此操作将修改该角色, 是否继续?</p>',
              onOk: () => {
                this.$http.put('/api/role/' + this.roleFrom.roleId, this.roleFrom)
                  .then(response => {
                    if (response.data.code === 1) {
                      this.$Message.success("修改成功！");
                      this.resetForm('roleFrom');
                      this.roleVisible = false;
                      _this.getRoleList();
                    } else {
                      this.$Message.warning(response.data.message);
                    }
                  })
              },
              onCancel: () => {
                this.$Message.info('点击了取消');
              }
            });
          } else {
            this.$Message.info("表单验证失败");
          }
        });
      }
      ,
      //执行单个删除操作
      doDeleteRole() {
        let _this = this;
        if (null !== this.roleSecol) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>此操作将删除角色 ' + this.roleSecol.roleName + ', 是否继续?</p>',
            onOk: () => {
              this.$http.delete('/api/role/' + this.roleSecol.roleId)
                .then(response => {
                  if (response.data.code === 1) {
                    this.$Message.success("删除成功！");
                    _this.getRoleList();
                  } else {
                    this.$Message.warning(response.data.message);
                  }
                })
            },
            onCancel: () => {
              this.$Message.info('已取消删除');
            }
          });
        }
      }
      ,
      addRoleResource(val) {
        this.getRolePermission(val.roleId);
        this.roleResourceVisible = true;
      },
      authorization() {
        let data = JSON.parse(JSON.stringify(this.$refs.tree.getCheckedNodes(true)));
        this.$http.post('/api/role/authorization/' + this.roleSecol.roleId, data)
          .then(response => {
            if (response.data.code === 1) {
              this.$Message.success("授权成功！");
              this.roleResourceVisible = false;
              this.getRoleResourceList();
            } else {
              this.$Message.warning(response.data.message);
            }
          })
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
