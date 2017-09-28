<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ count }} times
    <button class="btn btn-primary" @click="increment">+</button>
    <button class="btn btn-info">
      Clicked: {{ count }} times
    </button>
    <button class="btn btn-danger" @click="decrement">-</button>


   <!-- <el-upload
      class="upload-demo"
      drag
      action="http://upload.qiniu.com"
      multiple
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :data="form">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>-->

    <!--el-upload
      action="http://upload.qiniu.com"
      type="drag"
      :thumbnail-mode="true"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :data="form">
      <i class="el-icon-upload"></i>
    </el-upload>-->
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <modal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">custom header</h3>
      <h1 slot="body">
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>

      </h1>
    </modal>
    <button @click="showModal1 = true">Show Modal</button>
    <!--<bootModal v-if="showModal1" @close="showModal1 = false">
      <h4 slot="modal-title">测试模态框</h4>
      <h3 slot="modal-body">
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p>
        <p>啊舍得离开房间撒老地方</p></h3>
    </bootModal>-->

    <button @click="showModal2 = true">Show Modal</button>
    <Modal
      title="对话框标题"
      v-model="showModal2"
      class-name="vertical-center-modal">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>

    <button @click="addFormVisible = true">Show Modal</button>
   <!-- <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
      <input class="input"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>-->


    <Button type="primary" @click="info">显示普通提醒</Button>
    <Page :total="100" show-sizer></Page>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import modal from '../components/modal'
  import bootModal from '../components/bootModal'

  export default {
    computed: {
      // 使用对象展开运算符...将 getters 混入 computed 对象中
      ...mapGetters([
        'count'
      ])
    },
    data() {
      return {
        showModal: false,
        showModal1: false,
        showModal2: false,
        addFormVisible: false,
        form: {
          'key': 123,
          'token': "GqZQG6TvEZGPkCXzm5O7QN1jipLdeI4CXXsR6N3G:8y2xLxeyTKDFZ0mtQpES4v5SFR8=:eyJzY29wZSI6InNreWUtdXNlci1hdmF0YXIiLCJkZWFkbGluZSI6MTUwNTAzODQyOX0="
        },
      };
    },
    components: {
      'modal': modal,
      'bootModal': bootModal
    },
    methods: {
      ...mapActions([
        'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
        'decrement'
      ]),
      beforeUpload(file) {
        let _this = this;
        new Promise(function (resolve, rejeact) {
          _this.$http.get('/api//fileUploadToken')
            .then(response => {
              let {code, message, result} = response.data;
              if (code === 1) {
                let curr = Date.parse(new Date());
                let suffix = file.name;
                let key = encodeURI(`${curr}_${suffix}`);
                _this.form = {
                  'key': key,
                  'token': result
                }
              } else {
                _this.$message.info({
                  message: message
                });
              }
            })
          resolve();
        });
      },
      handleSuccess(response, file, fileList) {
        this.$alert('http://ow1prafcd.bkt.clouddn.com/' + response.key, '上传成功！', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        console.log(response);
      },
      info() {
        this.$Message.info('这是一条普通的提醒');
      }
    }
  }

</script>
<style lang="scss">
  .el-upload__input {
    display: none !important;
    width: 100px;
  }

</style>
