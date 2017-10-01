<template>
  <div class="ibox-content">
    <div class="row">
      <div class="col-md-6">
        <Card>
          <div slot="title">
            文件上传
          </div>
          <Upload
            multiple
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="drag"
            action="/api/test/multiFileUpload">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将文件拖拽到这里上传</p>
            </div>
          </Upload>

          <div class="demo-upload-list" v-for="item in mulitUploadList">
            <template>
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
          </div>

          <Upload
            ref="upload"
            multiple
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="drag"
            action="/api/test/multiFileUpload"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="查看图片" v-model="visible">
            <i-Input v-model="imgUrl" readonly>
              <span slot="prepend">链接</span>
            </i-Input>
            <br>


            <img :src="imgUrl" v-if="visible" style="width: 100%">
          </Modal>
        </Card>
      </div>
      <div class="col-md-6">
        <Card>
          <div slot="title">
            测试
          </div>
          <Button @click="start">Start</Button>
          <Button @click="finish">Finish</Button>
          <Button @click="error">Error</Button>
          <Button type="ghost" @click="test = true">模态框</Button>
        </Card>
      </div>
    </div>
    <br>
    <div class="row">
      <Card>
        <div slot="title">
          表格测试
        </div>
        <div style="margin: 10px">
          显示边框
          <i-switch v-model="showBorder" style="margin-right: 5px"></i-switch>
          显示斑马纹
          <i-switch v-model="showStripe" style="margin-right: 5px"></i-switch>
          显示索引
          <i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>
          显示多选框
          <i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>
          显示表头
          <i-switch v-model="showHeader" style="margin-right: 5px"></i-switch>
          表格滚动
          <i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>
          <br>
          <br>
          表格尺寸
          <Radio-group v-model="tableSize" type="button">
            <Radio label="large">大</Radio>
            <Radio label="default">中</Radio>
            <Radio label="small">小</Radio>
          </Radio-group>
        </div>
        <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
      </Card>
    </div>
    <Modal
      :transfer="false"
      v-model="test"
      title="对话框标题"
      :loading="true"
      class-name="1vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
          <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="城市" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择所在地">
            <Option value="beijing">北京市</Option>
            <Option value="shanghai">上海市</Option>
            <Option value="shenzhen">深圳市</Option>
          </Select>
        </FormItem>
        <FormItem label="选择日期">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
            <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
          </FormItem>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="爱好" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
            <Checkbox label="吃饭"></Checkbox>
            <Checkbox label="睡觉"></Checkbox>
            <Checkbox label="跑步"></Checkbox>
            <Checkbox label="看电影"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="介绍" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData3: [
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居',
            date: '2016-10-03'
          },
          {
            name: '张小刚',
            age: 24,
            address: '北京市海淀区西二旗',
            date: '2016-10-01'
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道',
            date: '2016-10-02'
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道',
            date: '2016-10-04'
          },
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居',
            date: '2016-10-03'
          },
          {
            name: '张小刚',
            age: 24,
            address: '北京市海淀区西二旗',
            date: '2016-10-01'
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道',
            date: '2016-10-02'
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道',
            date: '2016-10-04',
            cellClassName: {
              address: 'min-width'
            }
          }
        ],
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: true,
        showCheckbox: false,
        fixedHeader: false,
        tableSize: 'default',
        treeDate: [],
        test: false,
        formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          mail: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          interest: [
            {required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change'},
            {type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change'}
          ],
          date: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
          ],
          time: [
            {required: true, type: 'date', message: '请选择时间', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入个人介绍', trigger: 'blur'},
            {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
          ]
        },
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        imgUrl: "",
        visible: false,
        mulitUploadList: []
      }
    },
    computed: {
      tableColumns3() {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '日期',
          key: 'date',
          width: 150,
          sortable: true
        });
        columns.push({
          title: '姓名',
          width: 150,
          key: 'name'
        });
        columns.push({
          title: '年龄',
          width: 150,
          key: 'age',
          sortable: true,
          filters: [
            {
              label: '大于25岁',
              value: 1
            },
            {
              label: '小于25岁',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.age > 25;
            } else if (value === 2) {
              return row.age < 25;
            }
          }
        });
        columns.push({
          title: '地址',
          key: 'address',
          className: 'min-width',
          align: 'center',
          filters: [
            {
              label: '北京',
              value: '北京'
            },
            {
              label: '上海',
              value: '上海'
            },
            {
              label: '深圳',
              value: '深圳'
            }
          ],
          filterMethod(value, row) {
            return row.address.indexOf(value) > -1;
          }
        });
        columns.push({
          title: '操作',
          key: 'action',
          width: 130,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        });
        return columns;
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getFileList();
      })
    },
    methods: {
      getFileList() {
        this.listLoading = true;
        this.$http.get('/api/test/filelist')
          .then(response => {
            if (response.data.code === 1) {
              this.mulitUploadList = response.data.result;
            }
          })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      start() {
        this.$Loading.start();
      },
      finish() {
        this.$Loading.finish();
      },
      error() {
        this.$Loading.error();
      },
      handleSuccess(res, file, list) {
        if ("finished" === file.status) {
          this.$Message.success('上传成功!');
          file.url = file.response.result;
        }
        this.getFileList();
      },
      handleView(item) {
        this.imgUrl = item.url;
        this.imgName = item.name;
        this.visible = true;
      },
      handleRemove(file) {
        let _this = this;
        this.$http.post('/api/test/filedelete', file)
          .then(response => {
            if (response.data.code === 1) {
              this.$Message.success('删除成功!');
              //this.mulitUploadList = response.data.result;
            }
            _this.getFileList();
          })
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      }
    }
  }
</script>
<style>
  .ivu-table .min-width {
    width: 200px;
    background-color: #fff123;
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
