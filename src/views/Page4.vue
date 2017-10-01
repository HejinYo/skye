<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ count }} times
    <button class="btn btn-primary" @click="increment">+</button>
    <button class="btn btn-info">
      Clicked: {{ count }} times
    </button>
    <button class="btn btn-danger" @click="decrement">-</button>


    <el-upload
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
    </el-upload>

    <!--el-upload
      action="http://upload.qiniu.com"
      type="drag"
      :thumbnail-mode="true"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :data="form">
      <i class="el-icon-upload"></i>
    </el-upload>-->

    <Button type="primary" @click="info">显示普通提醒</Button>
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
          'key': '',
          'token': ""
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
          _this.$http.get('/api/fileUploadToken')
            .then(response => {
              let {code, message, result} = response.data;
              if (code === 1) {
                let curr = Date.parse(new Date());
                let suffix = Math.random() + file.name;
                let key = encodeURI(`${curr}_${suffix}`);
                _this.form = {
                  'key': encodeURI(message),
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
