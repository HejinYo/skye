<template>
  <div class="ibox">
    <div class="row">
      <div class="col-lg-3 col-md-5 col-sm-5 col-xs-12">
        <div class="">
          <Card :padding="10">
            <div slot="title">
              资源管理
            </div>
            <a href="#" slot="extra" type="primary" @click.prevent="addResource">
              <Icon type="ios-plus"></Icon>
              添加
            </a>
            <el-tree :data="resourceTreeData" :props="treeProps" @node-click="resourceTreeChange" :default-expanded-keys="[0]"
                     node-key="resId" highlight-current :expand-on-click-node="false" accordion></el-tree>
          </Card>
        </div>
      </div>

      <div class="col-lg-9 col-md-7 col-sm-7 col-xs-12">
        <div>
          <Card>
            <Tabs v-model="currTabs" @on-click="tabsChange">
              <TabPane label="资源管理" name="resource" icon="folder">
                <div>
                  <Button type="primary" @click="editResource">修改</Button>
                  <Button type="error" @click="doDeleteResource">删除</Button>
                </div>
                <br/>
                <el-table :data="resourceList" stripe border highlight-current-row v-loading="listLoading"
                          @sort-change="resourceSortChange" @current-change="resourceCurrentRow">
                  <el-table-column prop="resId" label="编号" align="center" width="70"></el-table-column>
                  <el-table-column prop="resType" label="类型" sortable="custom" align="center" width="90">
                    <template scope="scope">
                      <Tag :color="scope.row.resType == 'menu' ? 'green': 'yellow' ">
                        {{scope.row.resType == 'menu' ? '菜单' : '文件'}}
                      </Tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="resName" label="资源名称" sortable="custom" min-width="180"></el-table-column>
                  <el-table-column prop="resCode" label="资源编码" sortable="custom" width="150"></el-table-column>
                  <el-table-column prop="resPname" label="上级资源" sortable="custom" align="center" width="115"></el-table-column>
                  <el-table-column prop="resLevel" label="级别" sortable="custom" align="center" width="90">
                    <template scope="scope">
                      <Tag :color="scope.row.resLevel != 1 ? scope.row.resLevel == 2 ? 'yellow': scope.row.resLevel == 3 ? 'green': '' : 'red' ">
                        {{scope.row.resLevel}} 级
                      </Tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="resIcon" label="图标" show-overflow-tooltip align="center" width="70">
                    <template scope="scope">
                      <Button type="text" size="small"><i :class="scope.row.resIcon" class="fa-lg" :title="scope.row.resIcon"></i></Button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="seq" label="序号" align="center" width="70"></el-table-column>
                  <el-table-column prop="state" label="状态" align="center" width="90">
                    <template scope="scope">
                      <Tag :color="scope.row.state == 1 ? 'green': '' ">
                        {{scope.row.state == 1 ? '正常' : '禁用'}}
                      </Tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="创建日期" align="center" width="170"></el-table-column>
                </el-table>
                <br/>
                <!--翻页工具条-->
                <Page show-elevator show-total show-sizer size="small" placement="top" v-if="resourcePagePara.total > 1"
                      :total="resourcePagePara.total"
                      :page-size-opts="[10, 20, 50, 100]"
                      @on-change="resourcePageChange"
                      @on-page-size-change="resourceSizeChange">
                </Page>
              </TabPane>

              <TabPane label="权限管理" name="permission" icon="key">
                <div>
                  <Button type="primary" @click="addPermission">添加</Button>
                  <Button type="primary" @click="editPermission">修改</Button>
                  <Button type="error" @click="doDeletePermission">删除</Button>
                </div>
                <br/>
                <el-table :data="permissionList" stripe border highlight-current-row v-loading="listLoading"
                          @sort-change="permissionSortChange" @current-change="permissionCurrentRow">
                  <el-table-column prop="permId" label="编号" align="center" width="70"></el-table-column>
                  <el-table-column prop="permName" label="权限名称" sortable="custom" width="150"></el-table-column>
                  <el-table-column prop="resCode" label="资源编码" sortable="custom" width="150"></el-table-column>
                  <el-table-column prop="permUrl" label="资源URL" sortable="custom" show-overflow-tooltip min-width="180"></el-table-column>
                  <el-table-column prop="permCode" label="权限编码" sortable="custom" align="center" width="150"></el-table-column>
                  <el-table-column prop="state" label="状态" sortable="custom" align="center" width="90">
                    <template scope="scope">
                      <Tag :color="scope.row.state == 1 ? 'green': '' ">
                        {{scope.row.state == 1 ? '正常' : '禁用'}}
                      </Tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="创建日期" align="center" width="180"></el-table-column>
                </el-table>
                <br/>
                <!--翻页工具条-->
                <Page show-elevator show-total show-sizer size="small" placement="top" v-if="permissionPagePara.total > 1"
                      :total="permissionPagePara.total"
                      :page-size-opts="[10, 20, 50, 100]"
                      @on-change="permissionPageChange"
                      @on-page-size-change="permissionSizeChange">
                </Page>
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>

    <Modal :transfer="false" :mask-closable="false" v-model="resourceVisible" title="添加资源">
      <Form ref="resourceFrom" :model="resourceFrom" :rules="resourceValidate" :label-width="80">
        <FormItem label="上级资源" prop="resPname">
          <i-Input v-model="resourceFrom.resPname" placeholder="请选择" readonly>
            <Poptip placement="bottom-end" slot="append">
              <Button type="ghost">选择上级</Button>
              <div slot="content">
                <Card :padding="0" :bordered="false">
                  <el-tree :data="resourceTreeData" style="border:none;text-align: left;" :props="treeProps" :default-expanded-keys="[0]"
                           @node-click="pidChange" node-key="resId" highlight-current accordion></el-tree>
                </Card>
              </div>
            </Poptip>
          </i-Input>
        </FormItem>
        <FormItem label="资源类型" prop="resType">
          <RadioGroup v-model="resourceFrom.resType">
            <Radio label="menu">菜单</Radio>
            <Radio label="file">文件</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="资源名称" prop="resName">
          <Input v-model="resourceFrom.resName" placeholder="请输入"/>
        </FormItem>
        <FormItem label="资源编码" prop="resCode">
          <Input v-model="resourceFrom.resCode" placeholder="请输入"/>
        </FormItem>
        <FormItem label="资源图标" prop="resIcon">
          <i-Input v-model="resourceFrom.resIcon" placeholder="请输入">
            <Poptip placement="right" slot="prepend">
              <Button type="ghost"><i :class="resourceFrom.resIcon"></i></Button>
              <div slot="content">
                <iframe src="http://fontawesome.dashgame.com/" width="350px" height="400px"></iframe>
              </div>
            </Poptip>
          </i-Input>
        </FormItem>
        <FormItem label="资源级别" prop="resLevel">
          <Rate disabled v-model="resourceFrom.resLevel" :count="3"></Rate>
          {{resourceFrom.resLevel}}级
        </FormItem>
        <FormItem label="排序号" prop="seq">
          <InputNumber :max="100" :min="1" v-model="resourceFrom.seq"></InputNumber>
        </FormItem>
        <FormItem label="状态" prop="state">
          <i-switch v-model="resourceFrom.state" size="large" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="resourceVisible = false">取 消</Button>
        <Button type="primary" @click="resOperation">确 定</Button>
      </div>
    </Modal>

    <Modal :transfer="false" :mask-closable="false" v-model="permissionVisible" title="添加资源">
      <Form ref="permissionFrom" :model="permissionFrom" :rules="permissionValidate" :label-width="80">
        <FormItem label="资源编码" prop="resCode">
          <i-Input v-model="permissionFrom.resCode" placeholder="请选择" readonly>
            <Poptip placement="bottom-end" slot="append">
              <Button type="ghost">选择</Button>
              <div slot="content">
                <Card :padding="0" :bordered="false">
                  <el-tree :data="resourceTreeData" style="border:none;text-align: left;" :props="treeProps" :default-expanded-keys="[0]"
                           @node-click="resCodeChange" node-key="resId" highlight-current accordion></el-tree>
                </Card>
              </div>
            </Poptip>
          </i-Input>
        </FormItem>
        <FormItem label="权限名称" prop="permName">
          <Input v-model="permissionFrom.permName" placeholder="请输入"/>
        </FormItem>
        <FormItem label="权限编码" prop="permCode">
          <AutoComplete
            @on-select="permCodeSelect"
            v-model="permissionFrom.permCode"
            icon="ios-search"
            placeholder="请输入">
            <Option v-for="option in permission" :value="option.value" :key="option.value">
              <span>{{ option.text }}</span>
              <span>{{ option.value }}</span>
            </Option>
          </AutoComplete>
        </FormItem>
        <FormItem label="URL" prop="permUrl">
          <Input v-model="permissionFrom.permUrl" placeholder="请输入"/>
        </FormItem>
        <FormItem label="状态" prop="state">
          <i-switch v-model="permissionFrom.state" size="large" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="permissionVisible = false">取 消</Button>
        <Button type="primary" @click="permOperation">确 定</Button>
      </div>
    </Modal>

  </div>

</template>
<script>
  export default {
    name: 'resource',
    data() {
      return {
        permission: [
          {
            value: 'view',
            text: '查看',
          },
          {
            value: 'create',
            text: '添加',
          },
          {
            value: 'update',
            text: '修改',
          },
          {
            value: 'delete',
            text: '删除',
          },
        ],
        currTabs: 'resource',
        resourceList: [],
        resourceSecol: null,//当前选择行
        resourcePagePara: {//分页查询参数
          total: 0,
          page: 1,
          pageSize: 10,
          sidx: 'resLevel,resPid,seq',
          sort: 'asc',
          queryCol: '',
          queryStr: ''
        },
        resourceTreeData: [],
        resOpsType: 'save',
        resourceVisible: false,
        resourceFrom: {
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
        resourceValidate: {
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
        permissionList: [],//表格数据
        permissionSecol: null,//当前选择行
        permissionPagePara: {//分页查询参数
          total: 0,
          page: 1,
          pageSize: 10,
          sidx: 'permId',
          sort: 'asc',
          queryCol: 'permName',
          queryStr: ''
        },
        permOpsType: 'save',
        permissionVisible: false,
        permissionFrom: {
          "permId": 0,
          "resCode": '',
          "permCode": '',
          "permName": '',
          "permUrl": '#',
          "state": 1
        },
        permissionValidate: {
          permName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          permCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          resCode: [
            {required: true, message: '请选择资源', trigger: 'change'}
          ],
          permUrl: [
            {required: true, message: '不能为空', trigger: 'blur'}
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
        this.getResourceTree();
        this.getResourceList();
        //this.getPermissionList();
      })
    },
    methods: {
      //加载资源树
      getResourceTree() {
        this.$http.get('/api/resource/tree')
          .then(response => {
            if (response.data.code === 1) {
              this.resourceTreeData = response.data.result;
            }
          })
      },
      //加载资源列表
      getResourceList() {
        this.$http.get('/api/resource/listPage' +
          '?pageNum=' + this.resourcePagePara.page +
          '&pageSize=' + this.resourcePagePara.pageSize +
          '&sidx=' + this.resourcePagePara.sidx +
          '&sort=' + this.resourcePagePara.sort +
          '&' + this.resourcePagePara.queryCol + '=' + this.resourcePagePara.queryStr
        )
          .then(response => {
            if (response.data.code === 1) {
              this.resourceList = response.data.result.list;
              this.resourcePagePara.total = response.data.result.total;
            }
          })
      },
      //加载权限列表
      getPermissionList() {
        this.$http.get('/api/permission/listPage' +
          '?pageNum=' + this.permissionPagePara.page +
          '&pageSize=' + this.permissionPagePara.pageSize +
          '&sidx=' + this.permissionPagePara.sidx +
          '&sort=' + this.permissionPagePara.sort +
          '&' + this.permissionPagePara.queryCol + '=' + this.permissionPagePara.queryStr
        )
          .then(response => {
            if (response.data.code === 1) {
              this.permissionList = response.data.result.list;
              this.permissionPagePara.total = response.data.result.total;
            }
          })
      },
      tabsChange(name) {
        if (name === "resource") {
          this.getResourceList();
        } else {
          this.getPermissionList();
        }
      },
      //资源树点击事件
      resourceTreeChange(data, node) {
        if (node.level === 1) {
          this.resourcePagePara.queryCol = '';
          this.resourcePagePara.queryStr = '';
          this.resourcePagePara.page = 1;
          this.permissionPagePara.queryCol = '';
          this.permissionPagePara.queryStr = '';
          this.permissionPagePara.page = 1;
        }
        else {
          this.resourcePagePara.queryCol = 'resId';
          this.resourcePagePara.queryStr = data.resId;
          this.permissionPagePara.queryCol = 'resCode';
          this.permissionPagePara.queryStr = data.resCode;
        }
        if (this.currTabs === 'resource') {
          this.getResourceList();
        } else {
          this.getPermissionList();
        }
      }
      ,
      //起泡树点击事件
      pidChange(data, node) {
        if (node.level > 3) {
          this.$Message.info('最高只支持3级');
          return false;
        }
        this.resourceFrom.resPname = data.resName;
        this.resourceFrom.resLevel = node.level;
        this.resourceFrom.resPid = data.resId;
        let childrenRes = data.childrenRes;
        if (childrenRes.length > 0) {
          this.resourceFrom.seq = childrenRes[childrenRes.length - 1].seq * 1 + 1;
        } else {
          this.resourceFrom.seq = 1;
        }
      }
      ,
      //起泡树点击事件
      resCodeChange(data, node) {
        if (node.level > 1) {
          this.permissionFrom.resCode = data.resCode;
          this.permissionFrom.permName = data.resName;
        }
      }
      ,
      permCodeSelect(value) {
        this.permissionFrom.permName = this.permissionFrom.permName + '-' + value;
      }
      ,
      //点击页码事件，翻页操作
      resourcePageChange(val) {
        this.resourcePagePara.page = val;
        this.getResourceList();
      }
      ,
      //改变分页数量
      resourceSizeChange(val) {
        this.resourcePagePara.pageSize = val;
        this.getResourceList();
      }
      ,
      //排序
      resourceSortChange(val) {
        this.resourcePagePara.sidx = val.prop;
        this.resourcePagePara.sort = val.order;
        this.getResourceList();
      }
      ,
      //点击表格行事件
      resourceCurrentRow(val) {
        this.resourceSecol = val;
      }
      ,
      //点击页码事件，翻页操作
      permissionPageChange(val) {
        this.permissionPagePara.page = val;
        this.getPermissionList();
      }
      ,
      //改变分页数量
      permissionSizeChange(val) {
        this.permissionPagePara.pageSize = val;
        this.getPermissionList();
      }
      ,
      //排序
      permissionSortChange(val) {
        this.permissionPagePara.sidx = val.prop;
        this.permissionPagePara.sort = val.order;
        this.getPermissionList();
      }
      ,
      //点击表格行事件
      permissionCurrentRow(val) {
        this.permissionSecol = val;
      }
      ,
      //重置表格
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      ,
      addResource() {
        this.resetForm('resourceFrom');
        this.resourceVisible = true;
        this.resOpsType = 'save';
      }
      ,
      editResource() {
        if (null !== this.resourceSecol) {
          this.resetForm('resourceFrom');
          this.resourceFrom = JSON.parse(JSON.stringify(this.resourceSecol));
          this.resourceVisible = true;
          this.resOpsType = 'update';
        }
      }
      ,
      resOperation() {
        if (this.resOpsType === 'save') {
          this.doSaveResource();
        } else if (this.resOpsType === 'update') {
          this.doUpdateResource();
        }
      }
      ,
      doSaveResource() {
        let _this = this;
        this.$refs['resourceFrom'].validate((valid) => {
          if (valid) {
            this.$http.post('/api/resource/', this.resourceFrom)
              .then(response => {
                if (response.data.code === 1) {
                  this.$Message.success("添加成功！");
                  this.resetForm('resourceFrom');
                  this.resourceVisible = false;
                  _this.getResourceTree();
                  _this.getResourceList();
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
      doUpdateResource() {
        let _this = this;
        this.$refs['resourceFrom'].validate((valid) => {
          if (valid) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>此操作将修改该资源, 是否继续?</p>',
              onOk: () => {
                this.$http.put('/api/resource/' + this.resourceFrom.resId, this.resourceFrom)
                  .then(response => {
                    if (response.data.code === 1) {
                      this.$Message.success("修改成功！");
                      this.resetForm('resourceFrom');
                      this.resourceVisible = false;
                      _this.getResourceTree();
                      _this.getResourceList();
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
      doDeleteResource() {
        let _this = this;
        if (null !== this.resourceSecol) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>此操作将删除资源 ' + this.resourceSecol.resName + ', 是否继续?</p>',
            onOk: () => {
              this.$http.delete('/api/resource/' + this.resourceSecol.resId)
                .then(response => {
                  if (response.data.code === 1) {
                    this.$Message.success("删除成功！");
                    _this.getResourceTree();
                    _this.getResourceList();
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
      addPermission() {
        this.resetForm('permissionFrom');
        this.permissionVisible = true;
        this.permOpsType = 'save';
      }
      ,
      editPermission() {
        if (null !== this.permissionSecol) {
          this.resetForm('permissionFrom');
          this.permissionFrom = JSON.parse(JSON.stringify(this.permissionSecol));
          this.permissionVisible = true;
          this.permOpsType = 'update';
        }
      }
      ,
      permOperation() {
        if (this.permOpsType === 'save') {
          this.doSavePermission();
        } else if (this.permOpsType === 'update') {
          this.doUpdatePermission();
        }
      }
      ,
      doSavePermission() {
        let _this = this;
        this.$refs['permissionFrom'].validate((valid) => {
          if (valid) {
            this.$http.post('/api/permission/', this.permissionFrom)
              .then(response => {
                if (response.data.code === 1) {
                  this.$Message.success("添加成功！");
                  this.resetForm('permissionFrom');
                  this.permissionVisible = false;
                  _this.getPermissionList();
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
      doUpdatePermission() {
        let _this = this;
        this.$refs['permissionFrom'].validate((valid) => {
          if (valid) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>此操作将修改该权限, 是否继续?</p>',
              onOk: () => {
                this.$http.put('/api/permission/' + this.permissionFrom.permId, this.permissionFrom)
                  .then(response => {
                    if (response.data.code === 1) {
                      this.$Message.success("修改成功！");
                      this.resetForm('permissionFrom');
                      this.permissionVisible = false;
                      _this.getPermissionList();
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
      doDeletePermission() {
        let _this = this;
        if (null !== this.permissionSecol) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>此操作将删除权限 ' + this.permissionSecol.permName + ', 是否继续?</p>',
            onOk: () => {
              this.$http.delete('/api/permission/' + this.permissionSecol.permId)
                .then(response => {
                  if (response.data.code === 1) {
                    this.$Message.success("删除成功！");
                    _this.getPermissionList();
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
    }
  }
</script>
<style lang="scss" scoped>
  .ivu-poptip-body {
    padding: 0px !important;
  }
</style>
